-- Flag Review Oversight Dashboard - Database Schema

CREATE TABLE IF NOT EXISTS cases (
    id SERIAL PRIMARY KEY,
    case_number VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS flags (
    id SERIAL PRIMARY KEY,
    case_id INTEGER REFERENCES cases(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    status VARCHAR(30) DEFAULT 'PENDING REVIEW',
    budget_screen_info TEXT,
    case_file_info TEXT,
    explanation TEXT,
    notes TEXT DEFAULT '',
    reviewed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS flag_actions (
    id SERIAL PRIMARY KEY,
    flag_id INTEGER REFERENCES flags(id) ON DELETE CASCADE,
    action VARCHAR(30) NOT NULL,
    notes TEXT,
    acted_at TIMESTAMP DEFAULT NOW()
);
