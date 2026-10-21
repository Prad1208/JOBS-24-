# 💼 JOBS 24 — AI-Assisted Applicant Tracking System (ATS)

> A full-stack job application tracking platform built with React, Spring Boot, and MySQL, featuring AI-powered career assistance, application pipeline management, and JWT-based authentication.

<p align="center">
  <a href="https://github.com/Prad1208/JOBS-24-">
    <img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github" alt="GitHub Repository">
  </a>
  <a href="YOUR_LIVE_WEBSITE_URL">
    <img src="https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge" alt="Live Demo">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=openjdk" alt="Java 17">
  <img src="https://img.shields.io/badge/Spring%20Boot-3.3.4-brightgreen?style=flat-square&logo=springboot" alt="Spring Boot">
  <img src="https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Vite-Frontend-646CFF?style=flat-square&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/MySQL-8.0-blue?style=flat-square&logo=mysql" alt="MySQL">
  <img src="https://img.shields.io/badge/Docker-Containerized-2496ED?style=flat-square&logo=docker" alt="Docker">
  <img src="https://img.shields.io/badge/Spring%20Security-JWT-red?style=flat-square&logo=springsecurity" alt="Spring Security">
</p>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [AI-Powered Career Tools](#-ai-powered-career-tools)
- [Authentication and Authorization](#-authentication-and-authorization)
- [Technology Stack](#️-technology-stack)
- [Project Architecture](#-project-architecture)
- [Prerequisites](#-prerequisites)
- [Run Locally](#-run-locally)
- [Run with Docker](#-run-with-docker)
- [Environment Configuration](#-environment-configuration)
- [API Overview](#-api-overview)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Resume Highlights](#-resume-highlights)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

## 🚀 Overview

**JOBS 24** is a full-stack Applicant Tracking System (ATS) designed to help job seekers organize applications, monitor recruitment progress, and prepare for job opportunities using AI-assisted career tools.

The application combines a React frontend, a Spring Boot REST API, and a MySQL database to provide a centralized platform for managing job applications.

It also includes authentication, role-based access control, and AI-assisted features intended to simplify repetitive job-search tasks.

### 🎯 Project Goals

- Centralize job application tracking.
- Simplify application status management.
- Provide useful insights into application progress.
- Assist users with job-specific preparation.
- Demonstrate full-stack development and containerization.
- Explore integration of generative AI into career tools.

---

## ✨ Features

### 1. 📊 Application Dashboard

- View total job applications.
- Monitor application status distribution.
- Track interviews and offers.
- Review application progress through a centralized dashboard.

### 2. 🔄 Multi-Stage Application Tracking

Track applications through the following stages:

`Applied` → `Shortlisted` → `Online Assessment` → `Interview` → `HR Round` → `Offer`

Applications can also be marked as `Rejected`.

Features include:

- Quick application status updates.
- Color-coded status badges.
- Organized application records.
- Application progress monitoring.

### 3. 📝 Job Application Management

Create and manage job application records containing information such as:

- Company name
- Job role
- Location
- Salary
- Application status
- Application date
- Notes

### 4. 🔍 Search and Filtering

- Search applications by company or role.
- Filter applications by status.
- Quickly locate specific opportunities.

### 5. 🌙 Dark Mode

- Switch between light and dark themes.
- Use a consistent interface across application components.
- Improve usability in different lighting conditions.

### 6. 🔐 Authentication and Role-Based Access

The authentication implementation is designed to support separate experiences for job seekers and recruiters.

- JWT-based authentication.
- Password hashing using BCrypt.
- Role-based authorization.
- Protected API endpoints.
- Stateless authentication using Spring Security.

The exact permissions depend on the application's configured security rules.

---

## 🤖 AI-Powered Career Tools

JOBS 24 includes AI-assisted career features designed to make job searching more efficient.

The backend AI integration is designed to use Google Gemini, with heuristic fallback behavior where implemented.

### 1. Job Description Parser

**Endpoint:** `/api/ai/parse-jd`

Designed to extract useful information from a job description, including:

- Company name
- Job title
- Location
- Salary information
- Relevant skills and keywords

The extracted information can be used to simplify job application entry.

### 2. AI Cover Letter Generator

**Endpoint:** `/api/ai/cover-letter`

Assists users in drafting cover letters tailored to a particular job opportunity.

### 3. LinkedIn Outreach Generator

**Endpoint:** `/api/ai/outreach`

Helps draft professional networking messages for scenarios such as:

- Contacting recruiters.
- Reaching out to alumni.
- Requesting referrals.

### 4. Interview Preparation Assistant

**Endpoint:** `/api/ai/interview-prep`

Helps users prepare for technical and behavioral interview questions based on the target role and company.

### 5. Skill Match and Gap Analysis

**Endpoint:** `/api/ai/match-score`

Designed to compare candidate skills against job requirements and highlight areas that may need improvement.

> **Note:** AI-generated content is intended as a preparation aid. Interview questions, skill scores, and generated career materials should be reviewed by the user rather than treated as guaranteed predictions or professional assessments. AI features require the appropriate backend implementation and configuration.

---

## 🛠️ Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 19 | Component-based user interface |
| Vite | Frontend development and build tooling |
| JavaScript | Application logic |
| Axios | HTTP communication with the backend |
| Context API | Shared application state |
| Bootstrap 5 | Responsive UI components |
| CSS | Styling and theme customization |

### Backend

| Technology | Purpose |
|---|---|
| Java 17 | Backend programming language |
| Spring Boot 3.3.4 | REST API and application framework |
| Spring Web | HTTP endpoints |
| Spring Security 6 | Authentication and authorization |
| Spring Data JPA | Database access |
| Hibernate | Object-relational mapping |
| JJWT | JWT handling |
| BCrypt | Password hashing |
| Maven | Dependency management and builds |

### Database and Infrastructure

| Technology | Purpose |
|---|---|
| MySQL 8.0 | Relational database |
| Docker | Containerization |
| Docker Compose | Multi-container application management |
| Vercel | Planned frontend hosting |
| Render | Planned backend hosting |
| TiDB Cloud | Potential cloud-compatible MySQL database option |

---

## 🏗️ Project Architecture

JOBS 24 follows a frontend-backend-database architecture.

```text
                  ┌─────────────────────────┐
                  │         User            │
                  └────────────┬────────────┘
                               │
                               ▼
                  ┌─────────────────────────┐
                  │    React + Vite         │
                  │    Frontend              │
                  │    Port: 5173            │
                  └────────────┬────────────┘
                               │
                               │ HTTP / REST API
                               ▼
                  ┌─────────────────────────┐
                  │    Spring Boot          │
                  │    Backend API          │
                  │    Port: 8080           │
                  └────────────┬────────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                    ▼                     ▼
          ┌─────────────────┐   ┌──────────────────┐
          │   MySQL 8.0     │   │   AI Services    │
          │   Database      │   │   Gemini API     │
          └─────────────────┘   └──────────────────┘

                  Docker / Docker Compose
```

The frontend communicates with the Spring Boot backend through REST endpoints. The backend manages application logic, security, persistence, and AI integrations.

---

## 📁 Project Structure

```text
JOBS-24/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/example/demo/
│   │       │   ├── config/
│   │       │   ├── controller/
│   │       │   ├── entity/
│   │       │   ├── repository/
│   │       │   ├── security/
│   │       │   └── service/
│   │       │
│   │       └── resources/
│   │
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   │
│   ├── public/
│   ├── package.json
│   └── vercel.json
│
├── schema.sql
├── docker-compose.yml
├── render.yaml
├── DEPLOYMENT.md
└── README.md
```

> This is a representative structure. Actual files and directories may differ depending on the current repository version.

---

## 💻 Prerequisites

Before running the project locally, install:

- Git
- Java Development Kit (JDK) 17
- Maven, or use the project's Maven Wrapper
- Node.js and npm
- MySQL 8.0, or a compatible configured database
- Docker Desktop (optional, for containerized execution)

---

## ⚡ Run Locally

You can run the frontend and backend separately during development.

### Step 1: Clone the Repository

```bash
git clone https://github.com/Prad1208/JOBS-24-.git
```

Navigate to the project directory:

```bash
cd JOBS-24-
```

### Step 2: Configure the Database

Start MySQL and create a database for the application.

For example:

```sql
CREATE DATABASE jobs24;
```

If `schema.sql` contains the database schema and initial records, execute it using the appropriate MySQL client and database.

For example, from the MySQL command-line client:

```sql
SOURCE schema.sql;
```

The `SOURCE` command must be run from a MySQL client connected to the appropriate database context. If the script creates or selects the database itself, follow the script's instructions.

Alternatively, the application may create or update tables automatically if its configuration uses:

```properties
spring.jpa.hibernate.ddl-auto=update
```

Automatic schema updates do not replace a proper production database migration strategy.

### Step 3: Configure Backend Environment

Review:

```text
backend/src/main/resources/application.properties
```

Configure the database connection, credentials, JWT secret, and any AI API credentials required by your implementation.

Example local database configuration:

```properties
spring.datasource.url=${DB_URL:jdbc:mysql://localhost:3306/jobs24}
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update

server.port=8080
```

These are example settings. Retain any additional properties required by your actual application.

Do not commit database passwords, production secrets, JWT signing keys, or AI API keys to GitHub.

### Step 4: Start the Backend

Open a terminal:

```bash
cd backend
```

On Windows, run the Maven Wrapper if the repository includes `mvnw.cmd`:

```powershell
.\mvnw.cmd spring-boot:run
```

On Linux or macOS:

```bash
./mvnw spring-boot:run
```

Alternatively, if Maven is installed:

```bash
mvn spring-boot:run
```

The backend should start at:

```text
http://localhost:8080
```

Keep this terminal open while using the application.

### Step 5: Start the Frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

Vite should display a local development URL, typically:

```text
http://localhost:5173
```

Open that address in your browser.

### Step 6: Verify the Application

Check the frontend:

```text
http://localhost:5173
```

Check the jobs API, if its security configuration permits the request:

```text
http://localhost:8080/api/jobs
```

A protected endpoint may return an unauthorized response until you authenticate.

The frontend, backend, and database must all be configured correctly for the complete application to function.

---

## 🐳 Run with Docker

Docker Compose can start the frontend, backend, and database together when the repository contains a correctly configured `docker-compose.yml`.

### Step 1: Start Docker Desktop

Ensure Docker Desktop is running.

Verify the installation:

```bash
docker --version
docker compose version
```

### Step 2: Start the Application

From the repository root:

```bash
docker compose up -d --build
```

This builds the configured images when necessary and starts the services in the Compose file.

### Step 3: Check Container Status

```bash
docker compose ps
```

Confirm that the expected services are running.

### Step 4: Open the Frontend

If the frontend port is mapped to host port 5173:

```text
http://localhost:5173
```

The backend may be accessible at:

```text
http://localhost:8080
```

These addresses depend on the port mappings in `docker-compose.yml`.

### Step 5: View Logs

View all service logs:

```bash
docker compose logs -f
```

View backend logs:

```bash
docker compose logs -f backend
```

View frontend logs:

```bash
docker compose logs -f frontend
```

View MySQL logs:

```bash
docker compose logs -f mysql
```

Press `Ctrl + C` to stop following logs. This does not stop the containers.

### Step 6: Stop the Application

```bash
docker compose stop
```

This stops the containers while retaining them for later use.

To start the existing containers again:

```bash
docker compose start
```

To stop and remove the Compose containers and network:

```bash
docker compose down
```

Named database volumes are normally retained unless explicitly removed.

> **Important:** Do not run `docker compose down -v` unless you intentionally want to remove the associated volumes and potentially delete your database data.

---

## ⚙️ Environment Configuration

The application may require configuration for database access, JWT authentication, and AI integration.

Typical configuration variables include:

| Variable | Purpose |
|---|---|
| `DB_URL` | Database connection URL |
| `DB_USERNAME` | Database username |
| `DB_PASSWORD` | Database password |
| `JWT_SECRET` | Secret used to sign JWTs |
| `GEMINI_API_KEY` | Google Gemini API credential, if required by the implementation |

These names are examples. Use the exact variable names expected by the current application code and deployment configuration.

For Docker Compose, environment variables may be configured through a local `.env` file or the environment settings of individual services.

For local development, never expose sensitive values in frontend code, public repositories, screenshots, or logs.

A production JWT secret should be sufficiently strong and securely stored.

---

## 🔌 API Overview

The backend exposes REST endpoints for application management, authentication, and AI-assisted tools.

The following table describes the endpoints referenced by this project. Confirm the exact HTTP methods, request formats, and authentication requirements in the backend controllers.

| Endpoint | Purpose |
|---|---|
| `/api/jobs` | Job application management |
| `/api/ai/parse-jd` | Job description parsing |
| `/api/ai/cover-letter` | Cover letter generation |
| `/api/ai/outreach` | Professional outreach message generation |
| `/api/ai/interview-prep` | Interview preparation |
| `/api/ai/match-score` | Candidate skill matching |

The API base URL during local development is typically:

```text
http://localhost:8080
```

Protected endpoints may require a valid JWT access token in the `Authorization` header:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

Refer to the backend controllers and security configuration for the complete API contract.

---

## 🌐 Deployment

The repository includes or references deployment configuration for a potential cloud deployment.

The following is a possible hosting arrangement:

| Component | Hosting option |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | TiDB Cloud or another compatible managed database |

### Deployment Guide

See the repository's deployment documentation:

[📖 Read DEPLOYMENT.md](https://github.com/Prad1208/JOBS-24-/blob/main/DEPLOYMENT.md)

Before deploying:

1. Configure the production database.
2. Set all required environment variables.
3. Configure the backend's CORS policy for the deployed frontend domain.
4. Configure the frontend API base URL.
5. Ensure the backend can securely connect to the database.
6. Configure JWT signing secrets securely.
7. Configure AI credentials if AI features require them.
8. Test authentication, API requests, and application persistence.
9. Verify that the selected hosting plans meet the project's runtime requirements.

**Deployment status:** A public demo URL has not been specified in this README. The hosting options and deployment instructions do not, by themselves, mean that the application is already deployed.

Once the frontend is publicly accessible, replace `YOUR_LIVE_WEBSITE_URL` in the Live Demo button at the top of this README with the actual deployment URL.

Until then, the project can be explored by running it locally.

---

## 🛠️ Troubleshooting

### Frontend Cannot Connect to Backend

Check that:

- The backend is running.
- The configured API base URL is correct.
- The backend CORS configuration allows the frontend origin.
- The frontend is not trying to use `localhost` incorrectly from inside a container.

When frontend and backend run in separate Docker containers, the frontend's browser-side requests and the backend's container-to-container connections have different networking requirements.

### Backend Cannot Connect to MySQL

Check that:

- MySQL is running.
- The database exists.
- Database credentials are correct.
- The JDBC URL points to the correct hostname and port.

When the backend runs directly on Windows, it can use the published host port, such as `localhost:3307` if configured that way.

When the backend runs inside Docker Compose, it generally connects to the database using the Compose service name and the database's internal port, commonly `mysql:3306`.

### Docker Containers Are Not Starting

Check the service status:

```bash
docker compose ps
```

Inspect logs:

```bash
docker compose logs --tail=100
```

Rebuild and start the services:

```bash
docker compose up -d --build
```

Review the Compose configuration and logs if a service continues to fail.

### AI Features Are Not Working

Check that:

- The backend AI service is configured correctly.
- Required API credentials are available to the backend.
- The AI provider is reachable.
- The configured model and API usage are supported by your account.
- The fallback behavior is implemented and handles provider failures correctly.

---

## 📄 Resume Highlights

### JOBS 24 — AI-Assisted Applicant Tracking System

- Developed a full-stack job application tracking platform using **Java, Spring Boot, React, and MySQL**.
- Implemented application management, multi-stage status tracking, search, filtering, and dashboard statistics.
- Built REST APIs with Spring Boot and Spring Data JPA for application data management.
- Implemented or integrated JWT-based authentication and role-based access control, subject to the configured security implementation.
- Developed AI-assisted career tools for job description parsing, cover letter drafting, outreach messages, interview preparation, and skill gap analysis.
- Used Docker and Docker Compose to containerize and run application services locally.

Include claims about cloud deployment, automated CI/CD, production security, or working AI integrations in your résumé only after you have verified that those features are implemented and operational.

---

## 🔮 Future Improvements

Potential enhancements include:

- [ ] Public live demo with production backend and database.
- [ ] Automated testing for frontend and backend.
- [ ] Database migration management.
- [ ] Enhanced application analytics.
- [ ] Resume parsing and job-to-resume matching.
- [ ] Application reminders and deadline notifications.
- [ ] Improved accessibility and mobile responsiveness.
- [ ] Production monitoring and structured logging.

---

## 👨‍💻 Author

**Praduman Dwivedi**

Java Developer | DSA Enthusiast | Full-Stack Development Learner

- **GitHub:** [Prad1208](https://github.com/Prad1208)
- **Project Repository:** [JOBS 24](https://github.com/Prad1208/JOBS-24-)

---

## ⭐ Support

If you find this project useful, consider giving the repository a star on GitHub!

Built with ☕ Java, ⚛️ React, and a passion for solving real-world problems.