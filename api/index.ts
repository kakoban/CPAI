import express from 'express';
import dotenv from 'dotenv';
import pg from 'pg';
import jwt from 'jsonwebtoken';

dotenv.config();

const { Pool } = pg;
const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'cpmai_default_secure_secret_key_2026_xyz';

const DEFAULT_DATABASE_URL = "postgresql://neondb_owner:npg_WqTK6t1NPlyk@ep-rapid-wave-b5t3nsxc-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require";

// Setup PostgreSQL connection pool for Neon (configured with Neon's serverless pooler)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || DEFAULT_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

app.use(express.json({ limit: '10mb' }));

// Setup Neon PostgreSQL users, classes, session_locks, and assessment_results tables
let isTableReady = false;
async function ensureUsersTable() {
  if (isTableReady) return;
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS classes (
        id VARCHAR(64) PRIMARY KEY,
        code VARCHAR(100) UNIQUE NOT NULL,
        title VARCHAR(255) DEFAULT 'کلاس آموزشی CPMAI',
        is_leaderboard_visible BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(64) PRIMARY KEY,
        google_id VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(100),
        display_name VARCHAR(255),
        avatar_url TEXT,
        bio TEXT,
        role VARCHAR(50) DEFAULT 'user',
        phone VARCHAR(50),
        specialty VARCHAR(150),
        ai_level VARCHAR(50) DEFAULT 'beginner',
        initial_ai_level VARCHAR(50) DEFAULT 'BEGINNER',
        class_id VARCHAR(64),
        is_onboarded BOOLEAN DEFAULT false,
        is_verified BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
      ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user';
      ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(50);
      ALTER TABLE users ADD COLUMN IF NOT EXISTS specialty VARCHAR(150);
      ALTER TABLE users ADD COLUMN IF NOT EXISTS ai_level VARCHAR(50) DEFAULT 'beginner';
      ALTER TABLE users ADD COLUMN IF NOT EXISTS initial_ai_level VARCHAR(50) DEFAULT 'BEGINNER';
      ALTER TABLE users ADD COLUMN IF NOT EXISTS class_id VARCHAR(64);
      ALTER TABLE users ADD COLUMN IF NOT EXISTS is_onboarded BOOLEAN DEFAULT false;
      CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);
      CREATE INDEX IF NOT EXISTS idx_users_class_id ON users(class_id);

      CREATE TABLE IF NOT EXISTS session_locks (
        id VARCHAR(64) PRIMARY KEY,
        class_id VARCHAR(64) REFERENCES classes(id) ON DELETE CASCADE,
        session_num INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        is_unlocked BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        CONSTRAINT unq_class_session UNIQUE(class_id, session_num)
      );

      CREATE TABLE IF NOT EXISTS assessment_results (
        id VARCHAR(64) PRIMARY KEY,
        user_id VARCHAR(64) UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        class_id VARCHAR(64) REFERENCES classes(id) ON DELETE SET NULL,
        tested_tier VARCHAR(50) NOT NULL,
        raw_score NUMERIC(5,2) NOT NULL,
        max_score NUMERIC(5,2) NOT NULL,
        percentage NUMERIC(5,2) NOT NULL,
        alignment_index VARCHAR(50) NOT NULL,
        completed_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_assessment_class_id ON assessment_results(class_id);
    `);
    isTableReady = true;
  } catch (err) {
    console.warn('Could not initialize database tables:', err);
  }
}
ensureUsersTable();

// -------------------------------------------------------------
// LMS & Cohort Helpers
// -------------------------------------------------------------
const SESSION_TITLES: Record<number, string> = {
  0: 'مبانی کاربردی مدل‌های زبانی و تولکیت پرامپت‌نویسی (Sandbox)',
  1: 'شناخت کسب‌وکار و شرح پروژه (Business Understanding)',
  2: 'تعریف مسئله در این تکرار (Problem Iteration)',
  3: 'معیارهای عینی موفقیت (Objective Measures of Success)',
  4: 'تحلیل هزینه-فایده و بودجه (Cost-Benefit Analysis)',
  5: 'محاسبه بازگشت سرمایه مورد انتظار (Expected ROI)',
  6: 'نیازمندی‌های شناختی پروژه (Cognitive Requirements)',
  7: 'ضرورت راهکار شناختی (Why AI Solution is Needed)',
  8: 'جایگزین‌های غیرشناختی (Noncognitive Alternatives)',
  9: 'اهداف اختصاصی شناختی (Cognitive Objectives)',
  10: 'خروجی‌های مورد انتظار شناختی (Cognitive Outcomes)',
  11: 'معیارهای موفقیت پروژه هوش مصنوعی (AI Success Criteria)',
  12: 'الگوهای ۷ گانه شناختی در متدولوژی CPMAI (AI Patterns)',
  13: 'انتخاب و توجیه الگوهای مورد استفاده (Patterns Selection)',
  14: 'ارزیابی وضعیت و زیرساخت (Assess Situation)',
  15: 'مهارت‌ها و فناوری‌های مورد نیاز (Technology & Skills)',
  16: 'زمان‌بندی، مراحل و مایل‌استون‌ها (Schedule Requirements)',
  17: 'محدودیت‌ها و مرزهای عملکرد مدل (Constraints & Boundaries)',
  18: 'سنجه‌ها و متریک‌های ارزیابی مدل (Model Performance Metrics)',
  19: 'نیازمندی‌های عملکردی در برابر خط پایه (Performance vs Baselines)',
  20: 'مقادیر قابل قبول شاخص‌های کلیدی (Acceptable KPI Values)',
  21: 'شاخص‌های کلیدی زیرساخت و فناوری (Required Technology KPIs)'
};

function getAutoSlotCode(): string {
  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(now.getUTCDate()).padStart(2, '0');
  const slot = Math.floor(now.getUTCHours() / 2);
  return `${yyyy}${mm}${dd}_SLOT${slot}`;
}

async function getOrCreateClass(client: any, rawCode?: string, title?: string) {
  const code = (rawCode && rawCode.trim()) ? rawCode.trim().toUpperCase() : getAutoSlotCode();
  const existing = await client.query('SELECT * FROM classes WHERE UPPER(code) = $1 LIMIT 1;', [code]);
  if (existing.rows.length > 0) {
    return existing.rows[0];
  }
  const classId = `cls_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const displayTitle = title || `کلاس دوره CPMAI (${code})`;
  const insertRes = await client.query(
    `INSERT INTO classes (id, code, title, is_leaderboard_visible, created_at, updated_at)
     VALUES ($1, $2, $3, false, NOW(), NOW())
     RETURNING *;`,
    [classId, code, displayTitle]
  );
  const newClass = insertRes.rows[0];

  for (let s = 0; s <= 21; s++) {
    const isUnlocked = s <= 1; // Session 0 and 1 unlocked by default
    const lockId = `lock_${classId}_s${s}`;
    await client.query(
      `INSERT INTO session_locks (id, class_id, session_num, title, is_unlocked, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       ON CONFLICT (class_id, session_num) DO NOTHING;`,
      [lockId, classId, s, SESSION_TITLES[s] || `جلسه ${s}`, isUnlocked]
    );
  }
  return newClass;
}

function calculateAlignmentIndex(
  claimedTier: string,
  testedTier: string,
  percentage: number
): 'Matches' | 'Below Tier' | 'Above Tier' {
  const claimed = (claimedTier || 'beginner').toUpperCase();
  const tested = (testedTier || claimed).toUpperCase();

  const tierOrder: Record<string, number> = {
    BEGINNER: 1,
    INTERMEDIATE: 2,
    ADVANCED: 3
  };

  const cRank = tierOrder[claimed] || 1;
  const tRank = tierOrder[tested] || 1;

  if (cRank === tRank) {
    return percentage >= 60 ? 'Matches' : 'Below Tier';
  } else if (tRank > cRank) {
    if (percentage >= 70) return 'Above Tier';
    if (percentage >= 50) return 'Matches';
    return 'Below Tier';
  } else {
    if (percentage >= 85) return 'Matches';
    return 'Below Tier';
  }
}

function getPerformanceBand(percentage: number): 'Low' | 'Proficient' | 'Mastery' {
  if (percentage < 50) return 'Low';
  if (percentage < 80) return 'Proficient';
  return 'Mastery';
}

function verifyAdmin(req: express.Request): boolean {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  try {
    const token = authHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);
    return (decoded.role || '').toUpperCase() === 'ADMIN';
  } catch {
    return false;
  }
}

// -------------------------------------------------------------
// Google OAuth & Authentication Endpoints
// -------------------------------------------------------------

// Google GIS Login & Registration (UPSERT into Neon PostgreSQL)
app.post(['/api/auth/google', '/auth/google'], async (req, res) => {
  await ensureUsersTable();
  const { googleId, email, displayName, avatarUrl } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required for authentication' });
  }

  const userId = googleId ? `usr_g_${googleId}` : `usr_${Date.now()}`;
  const username = email.split('@')[0];
  const name = displayName || username;

  try {
    const upsertQuery = `
      INSERT INTO users (id, google_id, email, username, display_name, avatar_url, is_verified, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, true, NOW(), NOW())
      ON CONFLICT (email) DO UPDATE 
      SET google_id = COALESCE(EXCLUDED.google_id, users.google_id),
          display_name = COALESCE(users.display_name, EXCLUDED.display_name),
          avatar_url = EXCLUDED.avatar_url,
          is_verified = true,
          updated_at = NOW()
      RETURNING id, google_id, email, username, display_name, avatar_url, bio, role, phone, specialty, ai_level, is_onboarded, created_at;
    `;

    const result = await pool.query(upsertQuery, [
      userId,
      googleId || null,
      email.toLowerCase().trim(),
      username,
      name,
      avatarUrl || null
    ]);

    const user = result.rows[0];

    const token = jwt.sign(
      {
        id: user.id,
        googleId: user.google_id,
        email: user.email,
        displayName: user.display_name,
        role: user.role,
        isOnboarded: !!user.is_onboarded,
        aiLevel: user.ai_level || 'beginner'
      },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        googleId: user.google_id,
        email: user.email,
        username: user.username,
        displayName: user.display_name,
        avatarUrl: user.avatar_url,
        bio: user.bio,
        role: user.role || 'user',
        phone: user.phone || null,
        specialty: user.specialty || null,
        aiLevel: user.ai_level || 'beginner',
        isOnboarded: !!user.is_onboarded,
        createdAt: user.created_at
      }
    });
  } catch (err: any) {
    console.error('Error in /api/auth/google:', err);
    // Graceful fallback session when database is offline or local
    const fallbackToken = jwt.sign(
      {
        id: userId,
        email,
        displayName: name,
        isOnboarded: false,
        aiLevel: 'beginner'
      },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      token: fallbackToken,
      user: {
        id: userId,
        googleId,
        email,
        username,
        displayName: name,
        avatarUrl,
        role: 'user',
        phone: null,
        specialty: null,
        aiLevel: 'beginner',
        isOnboarded: false,
        createdAt: new Date().toISOString()
      },
      warning: 'Session created with fallback'
    });
  }
});

// Email & Admin Authentication Endpoint
app.post(['/api/auth/login', '/auth/login'], async (req, res) => {
  await ensureUsersTable().catch(() => {});
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'لطفاً ایمیل و گذرواژه را وارد فرمایید.' });
  }

  const cleanEmail = String(email).toLowerCase().trim();
  const cleanPass = String(password).trim();

  if (cleanPass.length < 3) {
    return res.status(400).json({ error: 'گذرواژه باید حداقل ۴ نویسه باشد.' });
  }

  const adminEmail = (process.env.ADMIN_EMAIL || 'nafa.1395@gmail.com').toLowerCase().trim();
  const adminPass = (process.env.ADMIN_PASSWORD || 'Kbka@222223224225227').trim();
  const isAdmin = cleanEmail === adminEmail && cleanPass === adminPass;

  // 1. Admin Login
  if (isAdmin) {
    const userId = 'usr_admin_nafa';
    const displayName = 'مهندس نفیسی (مدیر ارشد سامانه - Admin)';
    const avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256';

    try {
      if (process.env.DATABASE_URL) {
        const upsertQuery = `
          INSERT INTO users (id, email, username, display_name, avatar_url, role, is_verified, is_onboarded, created_at, updated_at)
          VALUES ($1, $2, $3, $4, $5, 'admin', true, true, NOW(), NOW())
          ON CONFLICT (email) DO UPDATE 
          SET display_name = EXCLUDED.display_name,
              role = 'admin',
              is_onboarded = true,
              is_verified = true,
              updated_at = NOW()
          RETURNING id, google_id, email, username, display_name, avatar_url, bio, role, phone, specialty, ai_level, is_onboarded, created_at;
        `;
        const result = await pool.query(upsertQuery, [
          userId,
          cleanEmail,
          'nafa_admin',
          displayName,
          avatarUrl
        ]);
        const user = result.rows[0];

        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            displayName: user.display_name,
            role: 'admin',
            isOnboarded: true,
            aiLevel: 'advanced'
          },
          JWT_SECRET,
          { expiresIn: '30d' }
        );

        return res.json({
          success: true,
          token,
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            displayName: user.display_name,
            avatarUrl: user.avatar_url,
            role: 'admin',
            phone: user.phone || '09120000000',
            specialty: user.specialty || 'مدیریت ارشد پروژه و هوش مصنوعی',
            aiLevel: user.ai_level || 'advanced',
            isOnboarded: true,
            createdAt: user.created_at
          }
        });
      }
    } catch (err: any) {
      console.warn('Database error in /api/auth/login for admin, using fallback:', err);
    }

    const token = jwt.sign(
      { id: userId, email: cleanEmail, displayName, role: 'admin', isOnboarded: true, aiLevel: 'advanced' },
      JWT_SECRET,
      { expiresIn: '30d' }
    );
    return res.json({
      success: true,
      token,
      user: {
        id: userId,
        email: cleanEmail,
        displayName,
        avatarUrl,
        role: 'admin',
        phone: '09120000000',
        specialty: 'مدیریت ارشد پروژه و هوش مصنوعی',
        aiLevel: 'advanced',
        isOnboarded: true,
        createdAt: new Date().toISOString()
      }
    });
  }

  // 2. Student Self-Registration / Sign-In via Email
  const studentUsername = cleanEmail.split('@')[0];
  const studentDisplayName = studentUsername;
  const studentUserId = `usr_std_${Date.now()}`;

  try {
    if (process.env.DATABASE_URL) {
      const studentUpsertQuery = `
        INSERT INTO users (id, email, username, display_name, role, is_verified, created_at, updated_at)
        VALUES ($1, $2, $3, $4, 'user', true, NOW(), NOW())
        ON CONFLICT (email) DO UPDATE 
        SET updated_at = NOW()
        RETURNING id, google_id, email, username, display_name, avatar_url, bio, role, phone, specialty, ai_level, initial_ai_level, class_id, is_onboarded, created_at;
      `;
      const result = await pool.query(studentUpsertQuery, [
        studentUserId,
        cleanEmail,
        studentUsername,
        studentDisplayName
      ]);
      const user = result.rows[0];

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          displayName: user.display_name,
          role: user.role || 'user',
          isOnboarded: !!user.is_onboarded,
          aiLevel: user.ai_level || 'beginner'
        },
        JWT_SECRET,
        { expiresIn: '30d' }
      );

      return res.json({
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          displayName: user.display_name,
          avatarUrl: user.avatar_url,
          role: 'user',
          phone: user.phone,
          specialty: user.specialty,
          aiLevel: user.ai_level || 'beginner',
          initialAiLevel: user.initial_ai_level || 'BEGINNER',
          classId: user.class_id,
          isOnboarded: !!user.is_onboarded,
          createdAt: user.created_at
        }
      });
    }
  } catch (err: any) {
    console.warn('Database error in student login, using local session fallback:', err);
  }

  const fallbackStudentUser = {
    id: studentUserId,
    email: cleanEmail,
    displayName: studentDisplayName,
    role: 'user' as const,
    isOnboarded: false,
    aiLevel: 'beginner' as const,
    createdAt: new Date().toISOString()
  };

  const studentToken = jwt.sign(
    fallbackStudentUser,
    JWT_SECRET,
    { expiresIn: '30d' }
  );

  return res.json({
    success: true,
    token: studentToken,
    user: fallbackStudentUser
  });
});

// Current Authenticated User Endpoint
app.get(['/api/auth/me', '/auth/me'], async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: missing token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const result = await pool.query(
      `SELECT u.id, u.google_id, u.email, u.username, u.display_name, u.avatar_url, u.bio, 
              u.role, u.phone, u.specialty, u.ai_level, u.initial_ai_level, u.class_id, 
              u.is_onboarded, u.created_at, c.code as class_code, c.title as class_title
       FROM users u
       LEFT JOIN classes c ON u.class_id = c.id
       WHERE u.id = $1 OR u.email = $2;`,
      [decoded.id, decoded.email]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      return res.json({
        user: {
          id: user.id,
          googleId: user.google_id,
          email: user.email,
          username: user.username,
          displayName: user.display_name,
          avatarUrl: user.avatar_url,
          bio: user.bio,
          role: user.role,
          phone: user.phone || null,
          specialty: user.specialty || null,
          aiLevel: user.ai_level || 'beginner',
          initialAiLevel: user.initial_ai_level || 'BEGINNER',
          classId: user.class_id || null,
          classCode: user.class_code || null,
          isOnboarded: !!user.is_onboarded,
          createdAt: user.created_at
        }
      });
    }

    res.json({
      user: {
        id: decoded.id,
        email: decoded.email,
        displayName: decoded.displayName,
        role: decoded.role || 'user',
        isOnboarded: !!decoded.isOnboarded,
        aiLevel: decoded.aiLevel || 'beginner',
        initialAiLevel: (decoded.aiLevel || 'beginner').toUpperCase()
      }
    });
  } catch (err: any) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

// User Mandatory Onboarding Endpoint
app.post(['/api/auth/onboarding', '/auth/onboarding'], async (req, res) => {
  await ensureUsersTable().catch(() => {});
  const authHeader = req.headers.authorization;
  let userId: string | null = null;
  let userEmail: string | null = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded: any = jwt.verify(token, JWT_SECRET);
      userId = decoded.id;
      userEmail = decoded.email;
    } catch {
      // ignore
    }
  }

  const { fullName, phone, specialty, aiLevel, classCode, email } = req.body;
  const targetEmail = (userEmail || email || '').toLowerCase().trim();
  const normalizedLevel = (aiLevel || 'beginner').toLowerCase();
  const resolvedClassCode = (classCode || '').trim() || getCohortTimeWindowSlot();

  let client: any = null;
  try {
    if (process.env.DATABASE_URL) {
      client = await pool.connect();
      await client.query('BEGIN');

      const targetClass = await getOrCreateClass(client, classCode);

      const updateQuery = `
        UPDATE users 
        SET display_name = COALESCE($1, display_name),
            phone = $2,
            specialty = $3,
            ai_level = $4,
            initial_ai_level = $5,
            class_id = $6,
            is_onboarded = true,
            updated_at = NOW()
        WHERE (id = $7 OR email = $8)
        RETURNING id, google_id, email, username, display_name, avatar_url, bio, role, phone, specialty, ai_level, initial_ai_level, class_id, is_onboarded, created_at;
      `;

      const result = await client.query(updateQuery, [
        fullName ? fullName.trim() : null,
        phone ? phone.trim() : null,
        specialty ? specialty.trim() : null,
        normalizedLevel,
        normalizedLevel.toUpperCase(),
        targetClass.id,
        userId || 'dummy_id',
        targetEmail || 'dummy_email'
      ]);

      await client.query('COMMIT');

      if (result.rows.length > 0) {
        const user = result.rows[0];
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            displayName: user.display_name,
            role: user.role,
            classId: user.class_id,
            classCode: targetClass.code,
            isOnboarded: true,
            aiLevel: user.ai_level,
            initialAiLevel: user.initial_ai_level
          },
          JWT_SECRET,
          { expiresIn: '30d' }
        );

        return res.json({
          success: true,
          token,
          user: {
            id: user.id,
            googleId: user.google_id,
            email: user.email,
            username: user.username,
            displayName: user.display_name,
            avatarUrl: user.avatar_url,
            bio: user.bio,
            role: user.role,
            phone: user.phone,
            specialty: user.specialty,
            aiLevel: user.ai_level,
            initialAiLevel: user.initial_ai_level,
            classId: user.class_id,
            classCode: targetClass.code,
            isOnboarded: true,
            createdAt: user.created_at
          }
        });
      }
    }
  } catch (err: any) {
    if (client) {
      try { await client.query('ROLLBACK'); } catch {}
    }
    console.warn('Database error in /api/auth/onboarding, using graceful fallback:', err?.message);
  } finally {
    if (client) {
      try { client.release(); } catch {}
    }
  }

  // Graceful guaranteed fallback so user is NEVER blocked
  const fallbackUser = {
    id: userId || `usr_${Date.now()}`,
    email: targetEmail || 'user@owjbc.com',
    displayName: fullName ? fullName.trim() : 'کاربر گرامی',
    phone: phone || '',
    specialty: specialty || '',
    aiLevel: normalizedLevel,
    initialAiLevel: normalizedLevel.toUpperCase(),
    classId: `cls_${resolvedClassCode}`,
    classCode: resolvedClassCode,
    isOnboarded: true
  };

  const fallbackToken = jwt.sign(
    { ...fallbackUser, role: 'user' },
    JWT_SECRET,
    { expiresIn: '30d' }
  );

  return res.json({
    success: true,
    token: fallbackToken,
    user: fallbackUser
  });
});

// Profile Update Endpoint (Admin & All Users)
app.all(['/api/auth/profile', '/api/user/profile', '/auth/profile', '/user/profile'], async (req, res) => {
  if (req.method !== 'PUT' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  await ensureUsersTable();
  const authHeader = req.headers.authorization;
  let decodedUser: any = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      decodedUser = jwt.verify(token, JWT_SECRET);
    } catch {
      // ignore
    }
  }

  const { fullName, displayName, phone, specialty, aiLevel, initialAiLevel, bio, avatarUrl, classCode, email, userId } = req.body;
  const targetId = decodedUser?.id || userId;
  const targetEmail = decodedUser?.email || email;

  if (!targetId && !targetEmail) {
    return res.status(401).json({ error: 'کاربر احراز هویت نشده است.' });
  }

  const nameToSave = (fullName || displayName || '').trim() || null;
  const levelToSave = (initialAiLevel || aiLevel || '').trim().toUpperCase() || null;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Fetch target user
    let userRes = await client.query(
      'SELECT * FROM users WHERE id = $1 OR email = $2 LIMIT 1;',
      [targetId || 'dummy_id', targetEmail || 'dummy_email']
    );

    if (userRes.rows.length === 0) {
      // If user record doesn't exist yet, insert it
      const insertRes = await client.query(
        `INSERT INTO users (id, email, display_name, phone, specialty, initial_ai_level, ai_level, bio, avatar_url, role, is_onboarded)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, true)
         RETURNING *;`,
        [
          targetId || `usr_${Date.now()}`,
          targetEmail || `${Date.now()}@placeholder.local`,
          nameToSave || 'کاربر گرامی',
          phone ? phone.trim() : null,
          specialty ? specialty.trim() : null,
          levelToSave || 'BEGINNER',
          levelToSave ? levelToSave.toLowerCase() : 'beginner',
          bio ? bio.trim() : null,
          avatarUrl ? avatarUrl.trim() : null,
          (targetEmail === 'nafa.1395@gmail.com' || decodedUser?.role === 'admin') ? 'admin' : 'user'
        ]
      );
      userRes = insertRes;
    }

    const existingUser = userRes.rows[0];

    // 2. Class allocation if classCode provided
    let targetClassId = existingUser.class_id;
    let targetClassCode = null;

    if (classCode && classCode.trim()) {
      const targetClass = await getOrCreateClass(pool, classCode.trim());
      targetClassId = targetClass.id;
      targetClassCode = targetClass.code;
    } else if (targetClassId) {
      const cRes = await client.query('SELECT code FROM classes WHERE id = $1 LIMIT 1;', [targetClassId]);
      if (cRes.rows.length > 0) targetClassCode = cRes.rows[0].code;
    }

    // 3. Update user profile
    const updateRes = await client.query(
      `UPDATE users SET
        display_name = COALESCE($1, display_name),
        phone = COALESCE($2, phone),
        specialty = COALESCE($3, specialty),
        initial_ai_level = COALESCE($4, initial_ai_level),
        ai_level = COALESCE($5, ai_level),
        bio = COALESCE($6, bio),
        avatar_url = COALESCE($7, avatar_url),
        class_id = COALESCE($8, class_id),
        updated_at = NOW()
       WHERE id = $9
       RETURNING id, google_id, email, username, display_name, avatar_url, bio, role, phone, specialty, ai_level, initial_ai_level, class_id, is_onboarded, created_at;`,
      [
        nameToSave,
        phone !== undefined ? (phone ? phone.trim() : null) : null,
        specialty !== undefined ? (specialty ? specialty.trim() : null) : null,
        levelToSave,
        levelToSave ? levelToSave.toLowerCase() : null,
        bio !== undefined ? (bio ? bio.trim() : '') : null,
        avatarUrl !== undefined ? (avatarUrl ? avatarUrl.trim() : '') : null,
        targetClassId,
        existingUser.id
      ]
    );

    await client.query('COMMIT');

    const updated = updateRes.rows[0];
    const newToken = jwt.sign(
      {
        id: updated.id,
        email: updated.email,
        displayName: updated.display_name,
        role: updated.role,
        classId: updated.class_id,
        classCode: targetClassCode,
        isOnboarded: !!updated.is_onboarded,
        aiLevel: updated.ai_level,
        initialAiLevel: updated.initial_ai_level
      },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    const userObj = {
      id: updated.id,
      googleId: updated.google_id,
      email: updated.email,
      username: updated.username,
      displayName: updated.display_name,
      avatarUrl: updated.avatar_url,
      bio: updated.bio,
      role: updated.role,
      phone: updated.phone,
      specialty: updated.specialty,
      aiLevel: updated.ai_level,
      initialAiLevel: updated.initial_ai_level,
      classId: updated.class_id,
      classCode: targetClassCode,
      isOnboarded: !!updated.is_onboarded,
      createdAt: updated.created_at
    };

    return res.json({
      success: true,
      token: newToken,
      user: userObj
    });
  } catch (err: any) {
    await client.query('ROLLBACK');
    console.error('Error in profile update:', err);
    return res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

// Assessment Submission & Tier Alignment Index Calculation
app.post(['/api/assessment/submit', '/assessment/submit'], async (req, res) => {
  await ensureUsersTable();
  const authHeader = req.headers.authorization;
  let decodedUser: any = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      decodedUser = jwt.verify(token, JWT_SECRET);
    } catch {
      // ignore
    }
  }

  const { testedTier, rawScore, maxScore, percentage, userId: bodyUserId } = req.body;
  const targetUserId = decodedUser?.id || bodyUserId;

  if (!targetUserId) {
    return res.status(401).json({ error: 'کاربر احراز هویت نشده است.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Fetch user details
    const userRes = await client.query('SELECT * FROM users WHERE id = $1 LIMIT 1;', [targetUserId]);
    if (userRes.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'کاربر در سامانه یافت نشد.' });
    }
    const user = userRes.rows[0];

    // Ensure user has a class assigned
    let classId = user.class_id;
    if (!classId) {
      const autoClass = await getOrCreateClass(client);
      classId = autoClass.id;
      await client.query('UPDATE users SET class_id = $1 WHERE id = $2;', [classId, user.id]);
    }

    const claimedTier = user.initial_ai_level || user.ai_level || 'BEGINNER';
    const computedPercentage = percentage !== undefined 
      ? Number(percentage) 
      : (maxScore > 0 ? Math.round((rawScore / maxScore) * 100) : 0);

    const alignmentIndex = calculateAlignmentIndex(claimedTier, testedTier, computedPercentage);

    const resultId = `ass_${user.id}`;
    const insertRes = await client.query(
      `INSERT INTO assessment_results (id, user_id, class_id, tested_tier, raw_score, max_score, percentage, alignment_index, completed_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
       ON CONFLICT (user_id) DO UPDATE SET
         class_id = EXCLUDED.class_id,
         tested_tier = EXCLUDED.tested_tier,
         raw_score = EXCLUDED.raw_score,
         max_score = EXCLUDED.max_score,
         percentage = EXCLUDED.percentage,
         alignment_index = EXCLUDED.alignment_index,
         completed_at = NOW()
       RETURNING *;`,
      [resultId, user.id, classId, (testedTier || claimedTier).toUpperCase(), rawScore, maxScore, computedPercentage, alignmentIndex]
    );

    await client.query('COMMIT');

    const result = insertRes.rows[0];
    res.json({
      success: true,
      result: {
        id: result.id,
        userId: result.user_id,
        classId: result.class_id,
        testedTier: result.tested_tier,
        rawScore: Number(result.raw_score),
        maxScore: Number(result.max_score),
        percentage: Number(result.percentage),
        alignmentIndex: result.alignment_index,
        completedAt: result.completed_at
      }
    });
  } catch (err: any) {
    await client.query('ROLLBACK');
    console.error('Error in /api/assessment/submit:', err);
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

// Competitive Cohort-Isolated Leaderboard
app.get(['/api/leaderboard', '/leaderboard'], async (req, res) => {
  await ensureUsersTable();
  const authHeader = req.headers.authorization;
  let decodedUser: any = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      decodedUser = jwt.verify(token, JWT_SECRET);
    } catch {
      // ignore
    }
  }

  const isAdmin = decodedUser && (decodedUser.role || '').toUpperCase() === 'ADMIN';
  const requestedClassCode = (req.query.classCode as string) || '';
  const requestedClassId = (req.query.classId as string) || '';

  try {
    let targetClass: any = null;

    if (requestedClassId) {
      const resC = await pool.query('SELECT * FROM classes WHERE id = $1 LIMIT 1;', [requestedClassId]);
      if (resC.rows.length > 0) targetClass = resC.rows[0];
    } else if (requestedClassCode) {
      const resC = await pool.query('SELECT * FROM classes WHERE UPPER(code) = $1 LIMIT 1;', [requestedClassCode.toUpperCase()]);
      if (resC.rows.length > 0) targetClass = resC.rows[0];
    } else if (decodedUser?.id) {
      const userRes = await pool.query('SELECT class_id FROM users WHERE id = $1 LIMIT 1;', [decodedUser.id]);
      if (userRes.rows.length > 0 && userRes.rows[0].class_id) {
        const resC = await pool.query('SELECT * FROM classes WHERE id = $1 LIMIT 1;', [userRes.rows[0].class_id]);
        if (resC.rows.length > 0) targetClass = resC.rows[0];
      }
    }

    if (!targetClass) {
      targetClass = await getOrCreateClass(pool);
    }

    const isVisible = targetClass.is_leaderboard_visible;

    // Visibility Control: If false and not admin, return pending state
    if (!isVisible && !isAdmin) {
      const countRes = await pool.query(
        'SELECT COUNT(*) FROM assessment_results WHERE class_id = $1;',
        [targetClass.id]
      );
      return res.json({
        isLeaderboardVisible: false,
        classCode: targetClass.code,
        message: 'نتایج آزمون پس از پایان زمان ارزیابی توسط مدرس دوره منتشر خواهد شد.',
        entries: [],
        totalParticipants: parseInt(countRes.rows[0].count, 10) || 0
      });
    }

    // Query leaderboard entries strictly scoped to this classId
    const query = `
      SELECT 
        u.id as user_id,
        u.display_name as full_name,
        u.avatar_url,
        u.specialty,
        u.initial_ai_level,
        a.tested_tier,
        a.raw_score,
        a.max_score,
        a.percentage,
        a.alignment_index,
        a.completed_at
      FROM assessment_results a
      JOIN users u ON a.user_id = u.id
      WHERE a.class_id = $1
      ORDER BY a.percentage DESC, a.completed_at ASC;
    `;

    const result = await pool.query(query, [targetClass.id]);
    const entries = result.rows.map((row: any, index: number) => ({
      rank: index + 1,
      userId: row.user_id,
      fullName: row.full_name || 'دانشجوی ناشناس',
      avatarUrl: row.avatar_url,
      specialty: row.specialty,
      testedTier: row.tested_tier,
      initialAiLevel: row.initial_ai_level,
      score: Number(row.raw_score),
      maxScore: Number(row.max_score),
      percentage: Number(row.percentage),
      alignmentIndex: row.alignment_index,
      completedAt: row.completed_at
    }));

    res.json({
      isLeaderboardVisible: isVisible,
      classCode: targetClass.code,
      classId: targetClass.id,
      entries,
      totalParticipants: entries.length,
      isAdminPreview: !isVisible && isAdmin
    });
  } catch (err: any) {
    console.error('Error in /api/leaderboard:', err);
    res.status(500).json({ error: err.message });
  }
});

// Curriculum Session Locks (Drip Content Delivery)
app.get(['/api/curriculum/locks', '/curriculum/locks'], async (req, res) => {
  await ensureUsersTable();
  const authHeader = req.headers.authorization;
  let decodedUser: any = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      decodedUser = jwt.verify(token, JWT_SECRET);
    } catch {
      // ignore
    }
  }

  const isAdmin = decodedUser && (decodedUser.role || '').toUpperCase() === 'ADMIN';

  try {
    let targetClass: any = null;
    if (decodedUser?.id) {
      const uRes = await pool.query('SELECT class_id FROM users WHERE id = $1 LIMIT 1;', [decodedUser.id]);
      if (uRes.rows.length > 0 && uRes.rows[0].class_id) {
        const cRes = await pool.query('SELECT * FROM classes WHERE id = $1 LIMIT 1;', [uRes.rows[0].class_id]);
        if (cRes.rows.length > 0) targetClass = cRes.rows[0];
      }
    }

    if (!targetClass) {
      targetClass = await getOrCreateClass(pool);
    }

    const locksRes = await pool.query(
      'SELECT id, class_id, session_num, title, is_unlocked FROM session_locks WHERE class_id = $1 ORDER BY session_num ASC;',
      [targetClass.id]
    );

    const locks = locksRes.rows.map((row: any) => ({
      id: row.id,
      classId: row.class_id,
      sessionNum: row.session_num,
      title: row.title,
      isUnlocked: isAdmin ? true : !!row.is_unlocked,
      rawIsUnlocked: !!row.is_unlocked
    }));

    res.json({
      classId: targetClass.id,
      classCode: targetClass.code,
      isAdminBypass: isAdmin,
      locks
    });
  } catch (err: any) {
    console.error('Error in /api/curriculum/locks:', err);
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// Admin Management & Matrix Endpoints
// -------------------------------------------------------------

// Admin Overview: Classes, User Registry, 2D Placement Matrix, Session Locks
app.get(['/api/admin/overview', '/admin/overview'], async (req, res) => {
  await ensureUsersTable();
  if (!verifyAdmin(req)) {
    return res.status(403).json({ error: 'دسترسی غیرمجاز: این بخش مختص مدیریت ارشد سامانه است.' });
  }

  try {
    // 1. Fetch all classes with student counts
    const classesRes = await pool.query(`
      SELECT c.*, COUNT(u.id) as student_count
      FROM classes c
      LEFT JOIN users u ON u.class_id = c.id
      GROUP BY c.id
      ORDER BY c.created_at DESC;
    `);

    // 2. Fetch User Registry with assessment results
    const usersRes = await pool.query(`
      SELECT 
        u.id, u.email, u.display_name as full_name, u.phone, u.specialty, u.role,
        u.class_id, c.code as class_code, u.initial_ai_level, u.is_onboarded, u.created_at,
        a.tested_tier, a.raw_score, a.percentage, a.alignment_index, a.completed_at as assessment_completed_at
      FROM users u
      LEFT JOIN classes c ON u.class_id = c.id
      LEFT JOIN assessment_results a ON a.user_id = u.id
      ORDER BY u.created_at DESC;
    `);

    const users = usersRes.rows.map((r: any) => ({
      id: r.id,
      email: r.email,
      fullName: r.full_name || 'کاربر گرامی',
      phone: r.phone,
      specialty: r.specialty,
      role: r.role || 'user',
      classId: r.class_id,
      classCode: r.class_code,
      initialAiLevel: r.initial_ai_level || 'BEGINNER',
      isOnboarded: !!r.is_onboarded,
      createdAt: r.created_at,
      assessmentResult: r.percentage !== null && r.percentage !== undefined ? {
        testedTier: r.tested_tier,
        rawScore: Number(r.raw_score),
        percentage: Number(r.percentage),
        alignmentIndex: r.alignment_index,
        completedAt: r.assessment_completed_at
      } : undefined
    }));

    // 3. Compute 2D Placement Matrix
    // Y-Axis: BEGINNER, INTERMEDIATE, ADVANCED (self-reported)
    // X-Axis: Low (<50%), Proficient (50-79%), Mastery (>=80%)
    const matrix: any = {
      BEGINNER: {
        Low: { count: 0, percentage: 0, students: [] },
        Proficient: { count: 0, percentage: 0, students: [] },
        Mastery: { count: 0, percentage: 0, students: [] }
      },
      INTERMEDIATE: {
        Low: { count: 0, percentage: 0, students: [] },
        Proficient: { count: 0, percentage: 0, students: [] },
        Mastery: { count: 0, percentage: 0, students: [] }
      },
      ADVANCED: {
        Low: { count: 0, percentage: 0, students: [] },
        Proficient: { count: 0, percentage: 0, students: [] },
        Mastery: { count: 0, percentage: 0, students: [] }
      }
    };

    let totalAssessed = 0;
    let dunningKrugerCount = 0; // Below Tier
    let highPotentialCount = 0; // Above Tier
    let matchedCount = 0; // Matches

    users.forEach((u: any) => {
      if (u.assessmentResult) {
        totalAssessed++;
        const rawTier = (u.initialAiLevel || 'BEGINNER').toUpperCase();
        const tier = (['BEGINNER', 'INTERMEDIATE', 'ADVANCED'].includes(rawTier) ? rawTier : 'BEGINNER') as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
        const band = getPerformanceBand(u.assessmentResult.percentage);

        matrix[tier][band].count++;
        matrix[tier][band].students.push({
          id: u.id,
          fullName: u.fullName,
          score: u.assessmentResult.percentage
        });

        if (u.assessmentResult.alignmentIndex === 'Below Tier') dunningKrugerCount++;
        else if (u.assessmentResult.alignmentIndex === 'Above Tier') highPotentialCount++;
        else matchedCount++;
      }
    });

    // Compute cell percentages
    (['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const).forEach(tier => {
      (['Low', 'Proficient', 'Mastery'] as const).forEach(band => {
        matrix[tier][band].percentage = totalAssessed > 0 
          ? Math.round((matrix[tier][band].count / totalAssessed) * 100) 
          : 0;
      });
    });

    // 4. Default class session locks (active class)
    const activeClassId = (req.query.classId as string) || (classesRes.rows[0] ? classesRes.rows[0].id : null);
    let sessionLocks: any[] = [];
    if (activeClassId) {
      const sRes = await pool.query(
        'SELECT * FROM session_locks WHERE class_id = $1 ORDER BY session_num ASC;',
        [activeClassId]
      );
      sessionLocks = sRes.rows.map((r: any) => ({
        id: r.id,
        classId: r.class_id,
        sessionNum: r.session_num,
        title: r.title,
        isUnlocked: !!r.is_unlocked
      }));
    }

    res.json({
      classes: classesRes.rows.map((c: any) => ({
        id: c.id,
        code: c.code,
        title: c.title,
        isLeaderboardVisible: !!c.is_leaderboard_visible,
        studentCount: parseInt(c.student_count, 10) || 0,
        createdAt: c.created_at
      })),
      users,
      placementMatrix: {
        matrix,
        totalAssessed,
        dunningKrugerCount,
        highPotentialCount,
        matchedCount
      },
      sessionLocks
    });
  } catch (err: any) {
    console.error('Error in /api/admin/overview:', err);
    res.status(500).json({ error: err.message });
  }
});

// Admin: Toggle Class Leaderboard Visibility
app.post(['/api/admin/classes/toggle-leaderboard', '/admin/classes/toggle-leaderboard'], async (req, res) => {
  await ensureUsersTable();
  if (!verifyAdmin(req)) {
    return res.status(403).json({ error: 'دسترسی غیرمجاز.' });
  }

  const { classId, isLeaderboardVisible } = req.body;
  if (!classId) {
    return res.status(400).json({ error: 'classId is required' });
  }

  try {
    const result = await pool.query(
      'UPDATE classes SET is_leaderboard_visible = $1, updated_at = NOW() WHERE id = $2 RETURNING *;',
      [!!isLeaderboardVisible, classId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'کلاس یافت نشد.' });
    }
    res.json({ success: true, class: result.rows[0] });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Toggle Single Session Lock (Drip Delivery)
app.post(['/api/admin/sessions/toggle-lock', '/admin/sessions/toggle-lock'], async (req, res) => {
  await ensureUsersTable();
  if (!verifyAdmin(req)) {
    return res.status(403).json({ error: 'دسترسی غیرمجاز.' });
  }

  const { classId, sessionNum, isUnlocked } = req.body;
  if (!classId || sessionNum === undefined) {
    return res.status(400).json({ error: 'classId and sessionNum are required' });
  }

  try {
    const result = await pool.query(
      `UPDATE session_locks 
       SET is_unlocked = $1, updated_at = NOW() 
       WHERE class_id = $2 AND session_num = $3 
       RETURNING *;`,
      [!!isUnlocked, classId, sessionNum]
    );
    res.json({ success: true, session: result.rows[0] });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Unlock or Lock All Sessions for a Class
app.post(['/api/admin/sessions/unlock-all', '/admin/sessions/unlock-all'], async (req, res) => {
  await ensureUsersTable();
  if (!verifyAdmin(req)) {
    return res.status(403).json({ error: 'دسترسی غیرمجاز.' });
  }

  const { classId, unlockAll } = req.body;
  if (!classId) {
    return res.status(400).json({ error: 'classId is required' });
  }

  try {
    if (unlockAll) {
      await pool.query(
        'UPDATE session_locks SET is_unlocked = true, updated_at = NOW() WHERE class_id = $1;',
        [classId]
      );
    } else {
      // Reset drip: Sessions 0 & 1 unlocked, 2..21 locked
      await pool.query(
        'UPDATE session_locks SET is_unlocked = (session_num <= 1), updated_at = NOW() WHERE class_id = $1;',
        [classId]
      );
    }

    const updated = await pool.query(
      'SELECT * FROM session_locks WHERE class_id = $1 ORDER BY session_num ASC;',
      [classId]
    );
    res.json({ success: true, sessions: updated.rows });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

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
