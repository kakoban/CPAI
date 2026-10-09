import express from 'express';
import dotenv from 'dotenv';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const { Pool } = pg;
const app = express();
const PORT = process.env.PORT || 3000;

// Setup PostgreSQL connection pool for Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(express.json({ limit: '10mb' }));

// Health Check Endpoint
app.get('/api/health', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT version(), NOW() as current_time;');
    client.release();
    res.json({
      status: 'ok',
      database: 'Neon PostgreSQL Connected',
      version: result.rows[0].version,
      timestamp: result.rows[0].current_time
    });
  } catch (err: any) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Get or list workbooks
app.get('/api/workbooks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM workbooks ORDER BY updated_at DESC LIMIT 20;');
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single workbook with all its page responses
app.get('/api/workbooks/:id', async (req, res) => {
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

// Save or update workbook and pages (Sync from React frontend)
app.post('/api/workbooks/sync', async (req, res) => {
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
      // Create new workbook
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
      // Update workbook metadata
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

    // Upsert pages
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

// Serve frontend in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, 'dist');

app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`CPMAI Backend Server running on port ${PORT}`);
  console.log(`Neon Database: Connected via SSL pooler`);
});
