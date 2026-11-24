const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

// Support Vercel serverless environment (writable /tmp directory)
let dbPath = process.env.DB_PATH;
if (!dbPath) {
  if (process.env.VERCEL) {
    dbPath = path.join('/tmp', 'attendance.db');
  } else {
    dbPath = path.join(__dirname, 'attendance.db');
  }
}
const DB_PATH = dbPath;

// Ensure db directory exists
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new DatabaseSync(DB_PATH);

// Configure SQLite for high performance and integrity
db.exec('PRAGMA foreign_keys = ON;');
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA synchronous = NORMAL;');

// Execute initial schema
const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
db.exec(schemaSql);

// Ensure migration columns exist
try {
  db.exec("ALTER TABLE classes ADD COLUMN major TEXT DEFAULT 'Information Technology';");
} catch (e) {}
try {
  db.exec("ALTER TABLE classes ADD COLUMN year_level TEXT DEFAULT 'Year 2';");
} catch (e) {}

/**
 * Database helper wrapper providing parameterized helpers
 */
module.exports = {
  db,
  
  queryAll(sql, params = []) {
    const stmt = db.prepare(sql);
    return stmt.all(...params);
  },

  queryOne(sql, params = []) {
    const stmt = db.prepare(sql);
    return stmt.get(...params) || null;
  },

  run(sql, params = []) {
    const stmt = db.prepare(sql);
    return stmt.run(...params);
  },

  /**
   * Run operations inside a transaction
   */
  transaction(callback) {
    db.exec('BEGIN TRANSACTION;');
    try {
      const result = callback(db);
      db.exec('COMMIT;');
      return result;
    } catch (err) {
      db.exec('ROLLBACK;');
      throw err;
    }
  }
};

// Auto-seed if database is newly initialized or empty (e.g. on Vercel deployment)
try {
  const classCount = db.prepare("SELECT COUNT(*) AS count FROM classes").get();
  if (!classCount || classCount.count === 0) {
    const { seedDatabase } = require('./seed');
    seedDatabase();
  }
} catch (e) {
  // If table is still initializing, ignore silently
}
