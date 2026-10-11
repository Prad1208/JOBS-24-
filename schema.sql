-- =============================================
-- Jobs24 Applicant Tracking System Database
-- =============================================

CREATE DATABASE IF NOT EXISTS jobs24;
USE jobs24;

-- Table structure for jobs
CREATE TABLE IF NOT EXISTS job (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    salary VARCHAR(100),
    status ENUM('APPLIED', 'OA', 'INTERVIEW', 'HR', 'OFFER', 'REJECTED') DEFAULT 'APPLIED',
    applied_date DATE,
    notes TEXT
);

-- Sample Data for initial testing
INSERT INTO job (company, role, location, salary, status, applied_date, notes) VALUES
('Google', 'Software Engineer - Backend', 'Bangalore, India', '$120,000 / yr', 'INTERVIEW', '2026-10-01', 'Technical round scheduled next week.'),
('Amazon', 'Java Developer', 'Hyderabad, India', 'INR 28 LPA', 'OA', '2026-10-05', 'Completed HackerRank Online Assessment.'),
('Microsoft', 'Full Stack Engineer', 'Noida, India', 'INR 32 LPA', 'APPLIED', '2026-10-08', 'Applied through referral on careers portal.'),
('Atlassian', 'Frontend Engineer (React)', 'Remote', 'INR 35 LPA', 'HR', '2026-09-28', 'HR behavioral screening completed.'),
('Netflix', 'Senior Platform Engineer', 'Remote', '$180,000 / yr', 'REJECTED', '2026-09-15', 'Position closed internally.'),
('Stripe', 'Software Engineer', 'Bangalore, India', 'INR 45 LPA', 'OFFER', '2026-09-20', 'Received written offer letter!');
