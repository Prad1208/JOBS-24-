# 🚀 Free-Tier Cloud Deployment Guide for Jobs 24 ATS

Follow this step-by-step guide to get your **Jobs 24 Applicant Tracking System** deployed live on the internet completely for **free**, giving you a live URL to feature prominently on your resume and LinkedIn!

---

## 🏗️ Architecture Overview

| Component | Platform | Free Tier Benefits |
| :--- | :--- | :--- |
| **Frontend** | [Vercel](https://vercel.com) | Unlimited builds, global CDN, instant deployments |
| **Backend** | [Render](https://render.com) | Free web service container, Docker support, automated CI/CD |
| **Database** | [TiDB Cloud](https://tidbcloud.com) or [Aiven](https://aiven.io) | Free 5 GB Serverless MySQL-compatible cluster, zero sleep |

---

## 1️⃣ Step 1: Set Up Free Cloud MySQL (TiDB Cloud)

1. Sign up for free at [tidbcloud.com](https://tidbcloud.com) (or [aiven.io](https://aiven.io)).
2. Click **Create Cluster** → Choose **Serverless (Free)**.
3. Once created, click **Connect** → choose **General** / **Java (JDBC)**.
4. Note down:
   - **Host** (e.g., `gateway01.us-east-1.prod.aws.tidbcloud.com`)
   - **Port** (e.g., `4000` or `3306`)
   - **User** (e.g., `xxxxxx.root`)
   - **Password**
5. Open the built-in **SQL Editor** in TiDB Cloud and run the contents of [`schema.sql`](file:///C:/Users/ASUS/Downloads/JOBS%2024/schema.sql) to initialize the tables and seed demo accounts.

Your JDBC URL will look like:
```text
jdbc:mysql://<HOST>:<PORT>/jobs24?useSSL=true&verifyServerCertificate=true
```

---

## 2️⃣ Step 2: Deploy Spring Boot Backend (Render Free Tier)

1. Sign up at [render.com](https://render.com) with your GitHub account.
2. Click **New +** → **Web Service**.
3. Select your repository: **`Prad1208/JOBS-24-`**.
4. Configure the service settings:
   - **Name**: `jobs24-backend`
   - **Region**: Oregon (US West) or closest to your database
   - **Root Directory**: `backend`
   - **Runtime**: `Docker` (Render will automatically detect `backend/Dockerfile`)
   - **Instance Type**: `Free`
5. Scroll down to **Environment Variables** and add:
   - `SPRING_DATASOURCE_URL` = `jdbc:mysql://<HOST>:<PORT>/jobs24?useSSL=true&verifyServerCertificate=true`
   - `SPRING_DATASOURCE_USERNAME` = `<YOUR_DB_USER>`
   - `SPRING_DATASOURCE_PASSWORD` = `<YOUR_DB_PASSWORD>`
   - `JWT_SECRET` = `Jobs24SuperSecretKeyForJwtTokenGeneration2026SecureKey`
   - *(Optional)* `GEMINI_API_KEY` = `<YOUR_FREE_GEMINI_KEY>` *(If omitted, smart offline heuristic fallback is used)*
6. Click **Deploy Web Service**.
7. Once deployed, copy your backend URL:
   `https://jobs24-backend.onrender.com`

---

## 3️⃣ Step 3: Deploy React Frontend (Vercel Free Tier)

1. Sign up at [vercel.com](https://vercel.com) with GitHub.
2. Click **Add New...** → **Project**.
3. Import your repository: **`Prad1208/JOBS-24-`**.
4. In Project Settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click edit and select `frontend`
5. Expand **Environment Variables** and add:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://jobs24-backend.onrender.com` (your Render backend URL without trailing slash)
6. Click **Deploy**.
7. Vercel will build and assign you a live HTTPS URL (e.g. `https://jobs-24-ats.vercel.app`).

---

## 4️⃣ Step 4: Verification & Resume Showcase

1. Open your live Vercel URL.
2. Click **⚡ 1-Click Job Seeker** or **⚡ 1-Click Recruiter** in the top navigation bar to test JWT authentication and role switching.
3. Open any job and click **✨ AI** to test all 4 AI assistant features:
   - Cover Letter Generator
   - LinkedIn Cold Outreach
   - Interview Question Prep
   - Match Score & Skills Gap
4. Test moving applications along the pipeline:
   `Applied → Shortlisted → OA → Interview → HR → Offer → Rejected`.

### 📄 Ready-Made Resume Bullet Points
> - **Jobs 24 - AI-Powered Applicant Tracking System (ATS)** | [Live Demo](https://your-vercel-app.vercel.app) | [GitHub](https://github.com/Prad1208/JOBS-24-)
>   - Engineered a full-stack ATS with **Spring Boot 3, Java 17, React 19, and MySQL**, orchestrating multi-stage job application pipelines (`Applied` to `Offer`).
>   - Implemented stateless **JWT authentication with Role-Based Access Control (RBAC)** distinguishing Job Seekers from Recruiters with BCrypt encryption.
>   - Integrated **Generative AI microservices** providing automated job description parsing, company-specific interview prep, tailored cover letters, and match gap scoring.
>   - Containerized with multi-stage **Docker** and deployed live on **Vercel and Render** with automated CI/CD and zero-cost cloud infrastructure.
