# EduTrack Pro — Enterprise Student Attendance Management System

A high-performance, full-stack Student Attendance Management System engineered with **Node.js (v24)**, **Express 5**, **native `node:sqlite` (zero C++ build dependencies)**, **React**, **Tailwind CSS v4**, and **Recharts**.

Designed with clean architecture, strict database foreign-key constraints, atomic transactions, real-time analytics, and contactless QR self check-in.

---

## 🏗 System Architecture

```
Student Attendance System
├── client/                     # Modern React + Vite Frontend (Tailwind CSS v4)
│   ├── src/
│   │   ├── components/         # Modular UI Views & Modals
│   │   │   ├── Navbar.jsx              # Navigation, Live Clock, Demo Data Seeder
│   │   │   ├── DashboardView.jsx       # Real-time KPIs, Trends, Class Comparison & At-Risk Alerts
│   │   │   ├── MarkAttendanceView.jsx  # Interactive Class Roster, 1-Click Toggles, Batch Actions
│   │   │   ├── QRCheckinView.jsx       # Projector QR Station + Student Kiosk Simulator
│   │   │   ├── StudentsView.jsx        # Enrolled Directory, Search, Filters, Risk Badges
│   │   │   ├── ClassesView.jsx         # Academic Sections, Instructors, Room Schedules
│   │   │   ├── ReportsView.jsx         # Historical Compliance & 1-Click CSV Export
│   │   │   ├── LeaveView.jsx           # Student Leave Applications & Approvals
│   │   │   └── Modals.jsx              # Student Profile Log, Add Student, Add Class Modals
│   │   ├── api.js              # Centralized Typed API Client
│   │   ├── App.jsx             # Top-Level Router & Global State
│   │   └── index.css           # Tailwind CSS v4 Directives & Custom Scrollbars
│   ├── vite.config.js          # Vite configuration with API Proxy (/api -> :5000)
│   └── package.json
│
├── server/                     # Layered Backend Architecture
│   ├── db/
│   │   ├── schema.sql          # Relational DDL (Classes, Students, Sessions, Attendance, Leave)
│   │   ├── index.js            # Node:sqlite DatabaseSync wrapper, Prepared Statements & Transactions
│   │   └── seed.js             # Realistic Demo Seeder (4 Classes, 32 Students, 15 Days of Sessions)
│   ├── routes/
│   │   ├── analytics.js        # KPI Metrics, Daily Trends, At-Risk Calculations, CSV Export
│   │   ├── attendance.js       # Session Sheets, Batch Upserts, Single Toggles, QR Check-in
│   │   ├── classes.js          # Class Section CRUD & Aggregations
│   │   ├── students.js         # Student Directory CRUD & Attendance Rates
│   │   └── leave.js            # Student Leave Requests & Status Workflow
│   └── server.js               # Express 5 Application, CORS, Static Serving & Health Check
│
├── package.json                # Root Concurrently Orchestrator
└── README.md
```

---

## ⚡ Key Highlights for Developers

1. **Native SQLite (`node:sqlite`)**:
   - Zero external binary or node-gyp compilation dependencies.
   - Leverages Node 22/24's synchronous high-throughput `DatabaseSync`.
   - SQLite configured with `PRAGMA journal_mode = WAL;` and `PRAGMA foreign_keys = ON;`.

2. **Atomic Attendance Upserts**:
   - Supports bulk batch saving inside SQLite transactions (`BEGIN TRANSACTION ... COMMIT`).
   - SQLite `ON CONFLICT(session_id, student_id) DO UPDATE` ensures idempotency without race conditions.

3. **QR Self Check-in Station**:
   - Dynamic session tokens generated per class slot: `ATT-{CLASS_CODE}-{YYYY-MM-DD}-{SESSION}`.
   - Dual-screen experience: Instructor projector view + student barcode/kiosk check-in with real-time roster feed.

4. **Automated At-Risk Intervention Algorithm**:
   - Detects students whose attendance rate drops below **75%** across a minimum session threshold.
   - Weighted formula: `(Present + 0.7 * Late) / Total Sessions`.

5. **1-Click Audit & Reporting Export**:
   - Instant server-side streaming CSV generator (`/api/analytics/export-csv`) ready for Excel or Google Sheets.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v22.5.0 or newer (v24.x recommended)
- **npm**: v10.x or newer

### 1. Installation
All dependencies are already installed in root and client. If setting up on a fresh machine:
```bash
npm install
cd client && npm install && cd ..
```

### 2. Seed Database with Realistic Data
Seed 4 classes, 32 students, and 15 days of historical records with at-risk students pre-configured:
```bash
npm run seed
```

### 3. Start Development Environment (Concurrent API + React Client)
Runs Express on `http://localhost:5000` and Vite with hot reload on `http://localhost:5173`:
```bash
npm run dev
```

### 4. Build and Run in Production
Builds the optimized frontend bundle and serves everything from Express on `http://localhost:5000`:
```bash
npm run build
npm start
```

---

## 📡 REST API Reference

### Analytics & Reports
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/analytics/overview` | Overall attendance %, total students, total classes, at-risk count |
| `GET` | `/api/analytics/trends?days=14` | Daily attendance percentage timeline for charts |
| `GET` | `/api/analytics/class-comparison` | Comparative attendance rate breakdown by class |
| `GET` | `/api/analytics/at-risk` | List of students with attendance < 75% |
| `GET` | `/api/analytics/export-csv?class_id=` | Download structured attendance log CSV |

### Attendance Operations
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/attendance/session` | Get or auto-init attendance sheet (`class_id`, `date`, `session_type`) |
| `POST` | `/api/attendance/batch` | Atomic batch save of student records for a session |
| `POST` | `/api/attendance/mark-single` | Fast single-student toggle (`session_id`, `student_id`, `status`) |
| `POST` | `/api/attendance/qr-checkin` | Check in student via QR token (`qr_token`, `student_identifier`) |

### Classes & Sections
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/classes` | List all classes with student count & calculated attendance rate |
| `GET` | `/api/classes/:id` | Class details, enrolled student roster, and recent sessions |
| `POST` | `/api/classes` | Create new class section |
| `PUT` | `/api/classes/:id` | Update class details |
| `DELETE` | `/api/classes/:id` | Delete class section |

### Students
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/students` | List students with query filters (`class_id`, `search`, `status`) |
| `GET` | `/api/students/:id` | Detailed student profile with complete attendance log history |
| `POST` | `/api/students` | Enroll new student |
| `PUT` | `/api/students/:id` | Update student profile |
| `DELETE` | `/api/students/:id` | Delete student and their historical records |

### Leave Requests
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/leave` | List student leave applications |
| `POST` | `/api/leave` | Submit student leave request |
| `PATCH` | `/api/leave/:id/status` | Approve or reject request (`status: 'approved' \| 'rejected'`) |

---

## 🧪 Running Integration Tests

Run the built-in automated test suite:
```bash
node test_api.js
```

---

## 📄 License
ISC. Engineered for university academic institutions.
