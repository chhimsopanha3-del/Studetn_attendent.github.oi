const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const classesRouter = require('./routes/classes');
const studentsRouter = require('./routes/students');
const attendanceRouter = require('./routes/attendance');
const analyticsRouter = require('./routes/analytics');
const leaveRouter = require('./routes/leave');
const authRouter = require('./routes/auth');
const { seedDatabase } = require('./db/seed');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging in development
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (!req.url.startsWith('/static')) {
      console.log(`[API] ${req.method} ${req.url} -> ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/classes', classesRouter);
app.use('/api/students', studentsRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/leave', leaveRouter);

// Reset / Re-seed Database endpoint (useful for demo testing)
app.post('/api/system/reseed', (req, res) => {
  try {
    seedDatabase();
    res.json({ success: true, message: 'Database successfully re-seeded with demo data' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Serve frontend static build if it exists
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.url.startsWith('/api')) {
      return res.sendFile(path.join(clientDistPath, 'index.html'));
    }
    next();
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  res.status(500).json({ success: false, error: 'Internal Server Error', message: err.message });
});

// Export app for Vercel serverless handler
module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Student Attendance API Server running at http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/analytics/overview`);
  });
}
