const { db } = require('./index');
const fs = require('fs');
const path = require('path');

const tables = ['departments', 'classes', 'students', 'staff', 'sessions', 'attendance', 'leave_requests'];
let dump = '-- USEA Student Attendance Database Dump\n-- Generated for Navicat Premium\nPRAGMA foreign_keys = OFF;\n\n';

for (const t of tables) {
  const schema = db.prepare("SELECT sql FROM sqlite_master WHERE type='table' AND name=?").get(t);
  if (schema) {
    dump += `DROP TABLE IF EXISTS ${t};\n` + schema.sql + ';\n\n';
    const rows = db.prepare(`SELECT * FROM ${t}`).all();
    for (const r of rows) {
      const keys = Object.keys(r);
      const vals = keys.map(k => {
        const v = r[k];
        if (v === null || v === undefined) return 'NULL';
        if (typeof v === 'number') return v;
        return "'" + String(v).replace(/'/g, "''") + "'";
      });
      dump += `INSERT INTO ${t} (${keys.join(', ')}) VALUES (${vals.join(', ')});\n`;
    }
    dump += '\n';
  }
}
dump += 'PRAGMA foreign_keys = ON;\n';

const dumpPath = path.join(__dirname, 'attendance_dump.sql');
fs.writeFileSync(dumpPath, dump, 'utf-8');
console.log('✅ Exported SQL dump successfully to:', dumpPath);
