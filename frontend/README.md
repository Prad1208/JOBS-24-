# ⚛️ JOBS 24 - Frontend

> Modern React (Vite) interface for the Jobs 24 Applicant Tracking System.

---

## 🚀 Features

- 📊 **Real-time Dashboard**: Live application statistics (Total, Applied, Interview, Offers).
- ➕ **Job Form**: Add and update job applications with company, role, location, salary, status, dates, and notes.
- 📋 **Application Table**: Interactive table with color-coded status badges and quick action buttons.
- 🔍 **Search & Filter**: Instant search by company/role and filtering by recruitment pipeline stage.
- 🌙 **Dark Mode**: Theme toggle with dark & light styling powered by Bootstrap 5.

---

## 🛠️ Tech Stack

- **React 19**
- **Vite 8**
- **Axios** (API requests to Spring Boot on `http://localhost:8080/api/jobs`)
- **Bootstrap 5** (Responsive UI components & styling)

---

## 📁 Directory Structure

```text
src/
├── assets/          # Images and static assets
├── components/      # Reusable UI components
│   ├── Dashboard.jsx
│   ├── JobForm.jsx
│   ├── JobList.jsx
│   ├── Navbar.jsx
│   ├── SearchFilter.jsx
│   ├── StatsCards.jsx
│   └── StatusBadge.jsx
├── pages/           # Page containers
│   └── Home.jsx
├── services/        # Axios API client
│   └── jobService.js
├── App.jsx
└── main.jsx
```

---

## ⚡ Running the Frontend

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Build for production
npm run build
```

Local development runs at: **`http://localhost:5173`**
