-- =============================================
-- Jobs 24 Applicant Tracking System (ATS) Schema
-- =============================================

CREATE DATABASE IF NOT EXISTS jobs24;
USE jobs24;

-- 1. Table structure for users (Role-Based Access Control)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(180) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(150),
    role VARCHAR(50) NOT NULL DEFAULT 'ROLE_JOB_SEEKER'
);

-- 2. Table structure for job applications pipeline
CREATE TABLE IF NOT EXISTS job (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    salary VARCHAR(100),
    status VARCHAR(50) DEFAULT 'APPLIED',
    applied_date DATE,
    notes TEXT
);

-- 3. Default Demo User Accounts
-- Password for both accounts is bcrypt hashed: seeker123 / recruiter123
INSERT INTO users (username, password, full_name, role) VALUES
('seeker@demo.com', '$2a$10$w8uDk2fX7nJzZ.mZl2p8Q.gI47k6q5p4n1.7u0o5f1o3m4o3e0i0W', 'Alex JobSeeker', 'ROLE_JOB_SEEKER'),
('recruiter@demo.com', '$2a$10$w8uDk2fX7nJzZ.mZl2p8Q.gI47k6q5p4n1.7u0o5f1o3m4o3e0i0W', 'Sarah Recruiter', 'ROLE_RECRUITER')
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name);

-- 4. Sample Pipeline Records
INSERT INTO job (company, role, location, salary, status, applied_date, notes) VALUES
('Google', 'Software Engineer - Backend', 'Bangalore, India', '$120,000 / yr', 'INTERVIEW', '2026-10-01', 'Technical round scheduled next week.'),
('Amazon', 'Java Developer', 'Hyderabad, India', 'INR 28 LPA', 'OA', '2026-10-05', 'Completed HackerRank Online Assessment.'),
('Microsoft', 'Full Stack Engineer', 'Noida, India', 'INR 32 LPA', 'APPLIED', '2026-10-08', 'Applied through referral on careers portal.'),
('Stripe', 'Frontend Engineer (React)', 'Remote', '$160,000 / yr', 'SHORTLISTED', '2026-10-10', 'Resume shortlisted by engineering team.'),
('Atlassian', 'Staff Platform Engineer', 'Remote', 'INR 45 LPA', 'HR', '2026-09-28', 'HR behavioral screening completed.'),
('Uber', 'Senior Platform Engineer', 'San Francisco, CA', '$180,000 / yr', 'OFFER', '2026-09-20', 'Received written offer letter!'),
('Netflix', 'Distributed Systems Engineer', 'Remote', '$180,000 / yr', 'REJECTED', '2026-09-15', 'Position closed internally.');
