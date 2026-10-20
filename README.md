# 💼 JOBS 24 — AI-Assisted Applicant Tracking System (ATS)

> An enterprise-grade, full-stack Applicant Tracking System with Generative AI career tools, multi-stage application pipeline tracking, and stateless JWT Role-Based Access Control (RBAC).

[![Java 17](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot 3.3.4](https://img.shields.io/badge/Spring%20Boot-3.3.4-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React 19](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Bundler-purple.svg)](https://vitejs.dev/)
[![MySQL 8.0](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)
[![JWT Security](https://img.shields.io/badge/Security-Spring%20Security%206%20%2B%20JWT-red.svg)](https://jwt.io/)

---

## 🚀 Key Highlights & Resume Value

### 1. 🔄 Multi-Stage Application Status Tracking Workflow
Track every job application across 7 distinct pipeline stages:
`📝 Applied` ➔ `🌟 Shortlisted` ➔ `⚡ Online Assessment (OA)` ➔ `🎯 Interview Round` ➔ `🤝 HR Round` ➔ `🏆 Offer Received` / `❌ Rejected`
- **1-Click Status Transitions**: Instantly advance candidates or personal applications from the interactive table.
- **Stage Distribution Analytics**: Real-time summary metrics measuring active pipeline health, conversion rates, and total opportunities.

### 2. 🤖 4 Integrated AI Assistant Features
Integrated directly with Google Gemini AI microservices (with automated offline heuristic fallback):
1. **One-Click Job Description Auto-Fill (`/api/ai/parse-jd`)**: Paste any raw job description; AI parses the company, role, location, salary range, and critical keywords into form fields automatically.
2. **Tailored Cover Letter Generator (`/api/ai/cover-letter`)**: Generates custom, persuasive cover letters matching your skills directly with company requirements.
3. **LinkedIn Cold Outreach & Referral Pitch (`/api/ai/outreach`)**: Generates 3 customized networking pitches (recruiter message, alumni cold pitch, and hiring manager referral request).
4. **Company-Specific Interview Question Predictor & Match Gap Scorer (`/api/ai/interview-prep` & `/api/ai/match-score`)**: Predicts technical and behavioral questions asked specifically by the target company (Google, Amazon, Meta, etc.), and scores candidate skill alignment with recommended focus areas.

### 3. 🔐 Stateless JWT Authentication with Role-Based Access Control (RBAC)
- **Spring Security 6 & JJWT**: Secures endpoints with stateless Bearer tokens and BCrypt password encryption.
- **Two First-Class Roles**:
  - `ROLE_JOB_SEEKER`: Application pipeline tracking, AI assistant access, and personal status updates.
  - `ROLE_RECRUITER`: Job requisition posting, candidate pipeline inspection, and hiring stage transitions.
- **⚡ Instant 1-Click Demo Logins**: Test both roles immediately without typing credentials using the built-in demo credentials switcher (`seeker@demo.com` / `recruiter@demo.com`).

### 4. ☁️ Zero-Cost Cloud Deployment Ready
- Configured for free deployment on **Vercel** (frontend), **Render** (backend container), and **TiDB Cloud** (free serverless MySQL).
- Full step-by-step instructions in [DEPLOYMENT.md](DEPLOYMENT.md).

---

## 🛠️ Tech Stack

### Frontend
- **React 19** + **Vite**: Ultra-fast hot module replacement and client rendering.
- **Context API**: Centralized state management for JWT auth, roles, and UI theme.
- **Axios with Interceptors**: Automatically injects JWT Bearer authorization on outgoing requests.
- **Modern Responsive Design**: Custom CSS design system with CSS custom properties, Plus Jakarta Sans typography, and dark/light persistence.

### Backend
- **Java 17** & **Spring Boot 3.3.4**
- **Spring Security 6 & JJWT (0.11.5)**: Stateless token issuance and filter-based request authentication.
- **Spring Data JPA & Hibernate**: Relational persistence and schema lifecycle management.
- **BCrypt Password Encoder**: Cryptographic password hashing.

### Database & Cloud
- **MySQL 8.0 / TiDB Serverless Cloud**
- **Docker**: Multi-stage container builds.
- **Vercel & Render**: Free cloud hosting setup with automated CI/CD.

---

## 📁 Project Structure

```text
JOBS-24/
├── backend/                              # Spring Boot 3 Backend
│   ├── src/main/java/com/example/demo/
│   │   ├── config/                       # SecurityConfig, DataInitializer
│   │   ├── controller/                   # AuthController, JobController, AiController
│   │   ├── entity/                       # Job, User, Roles
│   │   ├── repository/                   # JobRepository, UserRepository
│   │   ├── security/                     # JwtUtils, AuthTokenFilter
│   │   └── service/                      # JobService, AiService
│   ├── src/main/resources/               # application.properties
│   ├── Dockerfile                        # Multi-stage production Docker build
│   └── pom.xml
│
├── frontend/                             # React 19 Frontend
│   ├── src/
│   │   ├── components/                   # Navbar, Dashboard, JobList, JobForm,
│   │   │                                 # AiAssistantModal, AuthModal, StatusBadge
│   │   ├── context/                      # AuthContext.jsx
│   │   ├── pages/                        # Home.jsx
│   │   └── services/                     # api.js, authService.js, jobService.js, aiService.js
│   ├── vercel.json                       # Vercel SPA rewrites
│   └── package.json
│
├── schema.sql                            # Production database DDL and initial seeds
├── render.yaml                           # Render cloud deployment blueprint
├── DEPLOYMENT.md                         # Complete free-tier deployment guide
└── README.md
```

---

## ⚡ Quick Start (Local Development)

### 1. Database Setup
Make sure local MySQL is running on port `3306`, then run:
```sql
SOURCE schema.sql;
```
*(Or let Spring Boot auto-create the tables via `spring.jpa.hibernate.ddl-auto=update`)*

### 2. Start the Backend
```bash
cd backend
./mvnw clean spring-boot:run
```
Backend runs on `http://localhost:8080`.
The built-in `DataInitializer` will automatically seed demo users (`seeker@demo.com` and `recruiter@demo.com`) on startup.

### 3. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🌐 Deploy to Cloud (Free Tier)

For full step-by-step instructions to get a live URL for your resume, see **[DEPLOYMENT.md](DEPLOYMENT.md)**.
- **Frontend**: One-click import into Vercel.
- **Backend**: Free Web Service on Render with Docker.
- **Database**: Free 5 GB Serverless MySQL on TiDB Cloud.

---

## 📄 Resume Description Template

**Jobs 24 — AI-Assisted Applicant Tracking System (ATS)**
- Built a full-stack ATS with **Spring Boot 3, Java 17, React 19, and MySQL**, streamlining multi-stage job application pipelines (`Applied` to `Offer`).
- Implemented stateless **JWT authentication and Role-Based Access Control (RBAC)** supporting Job Seeker and Recruiter personas with BCrypt password hashing.
- Integrated **Generative AI microservices** for one-click job description auto-fill, company-specific interview prep, tailored cover letters, and match gap analysis.
- Containerized with multi-stage **Docker** and deployed live on **Vercel and Render** with automated CI/CD and zero-cost cloud hosting.