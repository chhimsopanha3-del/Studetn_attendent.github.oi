const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'attendance.db');

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
