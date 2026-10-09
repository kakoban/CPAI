import express from 'express';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;
const app = express();

// Setup PostgreSQL connection pool for Neon (configured with Neon's serverless pooler)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 15000,
});

app.use(express.json({ limit: '10mb' }));

// Health Check Endpoint (supports both /api/health and /health)
app.get(['/api/health', '/health'], async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT version(), NOW() as current_time;');
    client.release();

    const hasAiGatewayKey = !!process.env.AI_GATEWAY_API_KEY;

    res.json({
      status: 'ok',
      service: 'CPMAI Workbook Serverless API',
      database: 'Neon PostgreSQL Connected',
      dbVersion: result.rows[0].version,
      timestamp: result.rows[0].current_time,
      aiGatewayConfigured: hasAiGatewayKey
    });
  } catch (err: any) {
    res.status(500).json({
      status: 'error',
      message: err.message,
      database: 'Connection failed'
    });
  }
});

// List recent workbooks
app.get(['/api/workbooks', '/workbooks'], async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM workbooks ORDER BY updated_at DESC LIMIT 20;');
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single workbook with all its pages
app.get(['/api/workbooks/:id', '/workbooks/:id'], async (req, res) => {
  try {
    const { id } = req.params;
    const wb = await pool.query('SELECT * FROM workbooks WHERE id = $1;', [id]);
    if (wb.rows.length === 0) {
      return res.status(404).json({ error: 'Workbook not found' });
    }
    const pages = await pool.query(
      'SELECT * FROM workbook_pages WHERE workbook_id = $1 ORDER BY page_number ASC;',
      [id]
    );
    res.json({
      workbook: wb.rows[0],
      pages: pages.rows
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Save or update workbook and pages (Sync endpoint)
app.post(['/api/workbooks/sync', '/workbooks/sync'], async (req, res) => {
  const client = await pool.connect();
  try {
    const {
      workbookId,
      projectTitle,
      organization,
      studentName,
      language,
      theme,
      pages
    } = req.body;

    await client.query('BEGIN');

    let activeWbId = workbookId;

    if (!activeWbId) {
      const wbRes = await client.query(
        `INSERT INTO workbooks (project_title, organization, student_name, language, theme)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id;`,
        [
          projectTitle || 'XYZ Company Customer Support Chatbot',
          organization || 'OWJ Business Council',
          studentName || 'Anonymous',
          language || 'fa',
          theme || 'light'
        ]
      );
      activeWbId = wbRes.rows[0].id;
    } else {
      await client.query(
        `UPDATE workbooks 
         SET project_title = COALESCE($1, project_title),
             organization = COALESCE($2, organization),
             language = COALESCE($3, language),
             theme = COALESCE($4, theme),
             updated_at = NOW()
         WHERE id = $5;`,
        [projectTitle, organization, language, theme, activeWbId]
      );
    }

    if (pages && Array.isArray(pages)) {
      for (const p of pages) {
        await client.query(
          `INSERT INTO workbook_pages (workbook_id, page_number, phase_id, content_text, content_json, is_completed, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, NOW())
           ON CONFLICT (workbook_id, page_number) 
           DO UPDATE SET 
             content_text = EXCLUDED.content_text,
             content_json = EXCLUDED.content_json,
             is_completed = EXCLUDED.is_completed,
             updated_at = NOW();`,
          [
            activeWbId,
            p.pageNumber,
            p.phaseId || 1,
            p.contentText || '',
            JSON.stringify(p.contentJson || {}),
            p.isCompleted || false
          ]
        );
      }
    }

    await client.query('COMMIT');
    res.json({ success: true, workbookId: activeWbId });
  } catch (err: any) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

// AI Evaluation endpoint using Vercel AI Gateway
app.post(['/api/ai/evaluate', '/ai/evaluate'], async (req, res) => {
  const { workbookId, pageNumber, pageTitle, promptContent } = req.body;
  const apiKey = process.env.AI_GATEWAY_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'AI_GATEWAY_API_KEY is not configured on this server.'
    });
  }

  try {
    const aiResponse = await fetch('https://ai-gateway.vercel.sh/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a certified CPMAI (Cognitive Project Management for AI) mentor and auditor. Review student workbook inputs constructively, provide structured feedback with strengths, gaps, and recommendations, and assign an estimated readiness score (0-100).'
          },
          {
            role: 'user',
            content: `Page: ${pageTitle || pageNumber}\nStudent responses:\n${promptContent}`
          }
        ],
        temperature: 0.3
      })
    });

    const aiData: any = await aiResponse.json();

    if (aiData.error) {
      return res.status(400).json({ error: aiData.error.message || 'AI Gateway error', details: aiData });
    }

    const aiFeedback = aiData.choices?.[0]?.message?.content || 'No feedback generated.';

    // Save evaluation to Neon DB if workbookId is provided
    if (workbookId) {
      await pool.query(
        `INSERT INTO ai_evaluations (workbook_id, page_number, prompt, ai_feedback, score, model_name)
         VALUES ($1, $2, $3, $4, $5, $6);`,
        [workbookId, pageNumber || 1, promptContent || '', aiFeedback, 85, 'vercel-ai-gateway']
      );
    }

    res.json({
      feedback: aiFeedback,
      model: aiData.model || 'openai/gpt-4o-mini',
      usage: aiData.usage
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default app;
