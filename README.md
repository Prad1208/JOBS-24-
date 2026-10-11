# 💼 JOBS 24

> A full-stack Applicant Tracking System (ATS) built with React, Spring Boot, MySQL, and Docker.

**JOBS 24** helps developers and job seekers organize and track their applications in one unified dashboard. Users can add, update, delete, search, and filter job applications based on status, while viewing live summary metrics and toggling dark mode.

---

## 🚀 Features

- ➕ **Add Applications**: Add company, role, location, salary, status, applied date, and custom notes.
- ✏️ **Edit & Update**: Real-time edit and status transition (`APPLIED` ➔ `OA` ➔ `INTERVIEW` ➔ `HR` ➔ `OFFER` / `REJECTED`).
- 🗑️ **Delete Applications**: Easily remove stale applications.
- 🔍 **Live Search & Filter**: Instant search by company/role and filtering by status.
- 📊 **Dashboard Metrics**: Live cards showing total, applied, interview, and offer counts.
- 🌙 **Dark Mode Support**: Seamless toggle between light and dark themes.
- 🔄 **RESTful Architecture**: Clean REST endpoints with full CORS integration.
- 🗄️ **MySQL Persistence**: Relational schema managed by Spring Data JPA & Hibernate.
- 🐳 **Dockerized**: Pre-configured `docker-compose.yml` for multi-container orchestration.

---

## 🛠️ Tech Stack

### Frontend
- **React 19**
- **Vite**
- **Axios**
- **Bootstrap 5**

### Backend
- **Java 17**
- **Spring Boot 3.3.4**
- **Spring Web**
- **Spring Data JPA**
- **Hibernate**
- **Lombok**

### Database & DevOps
- **MySQL 8.0**
- **Docker & Docker Compose**

---

## 📁 Project Structure

```text
JOBS-24/
├── backend/                  # Spring Boot application (Java 17)
│   ├── src/
│   ├── pom.xml
│   ├── mvnw
│   ├── mvnw.cmd
│   └── DockerFile
│
├── frontend/                 # React application (Vite)
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── DockerFile
│
├── docker-compose.yml        # Multi-container Docker orchestration
├── schema.sql                # MySQL schema & initial sample data
└── README.md
```

---

## ⚡ Quick Start

### Option 1: Run with Docker Compose (Recommended)

1. Make sure Docker Desktop is running.
2. In the project root, run:
   ```bash
   docker compose up -d --build
   ```
3. Open `http://localhost:5173` in your browser.

---

### Option 2: Run Locally

#### 1. Database Setup
Ensure MySQL is running on port `3306`, and create the database (or run `schema.sql`):
```sql
CREATE DATABASE IF NOT EXISTS jobs24;
```

#### 2. Start Backend
```bash
cd backend
./mvnw clean spring-boot:run
```
*(Runs on `http://localhost:8080`)*

#### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev
```
*(Runs on `http://localhost:5173`)*