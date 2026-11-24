import React, { useState, useEffect } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  Filter, 
  Calendar, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  FileText,
  Search
} from 'lucide-react';
import { api } from '../api';

export default function ReportsView() {
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadClasses() {
      try {
        const res = await api.getClasses();
        if (res.success) setClasses(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    loadClasses();
  }, []);

  const downloadUrl = api.getExportCsvUrl(selectedClassId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <FileSpreadsheet className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Reports & Compliance Export</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Generate audit-ready attendance sheets and export structured CSV records for university administration.
          </p>
        </div>

        <a
          href={downloadUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-emerald-100 transition cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Download CSV Report</span>
        </a>
      </div>

      {/* Filter Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-4 flex items-center space-x-2">
          <Filter className="w-4 h-4 text-indigo-600" />
          <span>Export Parameters</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Filter by Class</label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">All Classes & Sections (Entire University)</option>
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.code} - {c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Export Format</label>
            <div className="flex items-center space-x-3 mt-1.5">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>CSV (Excel, Google Sheets compatible)</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            Export includes: Student ID, Full Name, Class Code, Date, Session Slot, Status, Check-in Timestamp, Method, and Notes.
          </p>
          <a
            href={downloadUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Generate & Download</span>
          </a>
        </div>
      </div>
    </div>
  );
}
