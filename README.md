# 💼 JOBS 24

> A full-stack job application tracking platform built with React, Spring Boot, MySQL, and Docker.

JOBS 24 helps users organize and track their job applications in one place. 
Users can add, update, delete, search, and filter job applications based on their current application status.

---
## 🚀 Features

- ➕ Add new job applications
- ✏️ Update existing applications
- 🗑️ Delete job applications
- 🔍 Search jobs
- 🎯 Filter applications by status
- 📅 Track application dates
- 🏷️ Application status management
- 🌙 Dark mode UI
- 🔄 REST API integration
- 🗄️ MySQL database persistence
- 🐳 Docker support
- 📦 Docker Compose setup
- ⚡ React + Spring Boot full-stack architecture

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- JavaScript
- HTML5
- CSS3

### Backend

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- REST APIs

### Database

- MySQL

### DevOps

- Docker
- Docker Compose
- Git & GitHub

---

## 🏗️ Architecture

```text
                ┌─────────────────────┐
                │      React UI       │
                │      Vite           │
                └──────────┬──────────┘
                           │
                           │ REST API
                           ▼
                ┌─────────────────────┐
                │    Spring Boot      │
                │     Backend         │
                └──────────┬──────────┘
                           │
                           │ JPA / Hibernate
                           ▼
                ┌─────────────────────┐
                │       MySQL         │
                │      Database       │
                └─────────────────────┘