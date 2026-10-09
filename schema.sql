-- ==============================================================================
-- CPMAI Workbook Database Schema for Neon PostgreSQL
-- Organization: OWJ Business Council
-- Target Engine: PostgreSQL 16+ / Neon Serverless Postgres
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Table for Workbooks / AI Projects
CREATE TABLE IF NOT EXISTS workbooks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_title VARCHAR(255) NOT NULL DEFAULT 'XYZ Company Customer Support Chatbot',
    organization VARCHAR(255) DEFAULT 'OWJ Business Council',
    student_name VARCHAR(255) DEFAULT 'Anonymous',
    language VARCHAR(10) DEFAULT 'fa',
    theme VARCHAR(10) DEFAULT 'light',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Table for Workbook Page Responses (Pages 1 to 15+)
CREATE TABLE IF NOT EXISTS workbook_pages (
    id SERIAL PRIMARY KEY,
    workbook_id UUID REFERENCES workbooks(id) ON DELETE CASCADE,
    page_number INT NOT NULL,
    phase_id INT NOT NULL DEFAULT 1,
    content_text TEXT,
    content_json JSONB DEFAULT '{}'::jsonb,
    is_completed BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(workbook_id, page_number)
);

-- 3. Table for AI Evaluation & PMI Stage-Gate Feedback
CREATE TABLE IF NOT EXISTS ai_evaluations (
    id SERIAL PRIMARY KEY,
    workbook_id UUID REFERENCES workbooks(id) ON DELETE CASCADE,
    page_number INT NOT NULL,
    score NUMERIC(5,2),
    feedback_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- High-speed indexes
CREATE INDEX IF NOT EXISTS idx_workbook_pages_wid ON workbook_pages(workbook_id);
CREATE INDEX IF NOT EXISTS idx_workbook_pages_page ON workbook_pages(page_number);
CREATE INDEX IF NOT EXISTS idx_ai_evaluations_wid ON ai_evaluations(workbook_id);
