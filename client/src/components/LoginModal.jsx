import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  User, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  X,
  AlertCircle,
  School,
  CheckCircle2
} from 'lucide-react';
import { api } from '../api';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [role, setRole] = useState('student'); // 'student' | 'faculty'
  const [studentId, setStudentId] = useState('USEA-2024-001');
  const [password, setPassword] = useState('password123');
  const [facultyEmail, setFacultyEmail] = useState('r.vance@usea.edu.kh');
  const [demoStudents, setDemoStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function loadDemos() {
      try {
        const res = await api.getDemoStudents();
        if (res.success) setDemoStudents(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    loadDemos();
  }, []);

  if (!isOpen) return null;

  async function handleStudentLogin(e, customId) {
    if (e) e.preventDefault();
    const idToUse = customId || studentId.trim();
    if (!idToUse) return;

    try {
      setLoading(true);
      setErrorMsg('');
      const res = await api.studentLogin(idToUse, password);
      if (res.success) {
        onLoginSuccess(res.user);
        onClose();
      } else {
        setErrorMsg(res.error || 'Failed to login');
      }
    } catch (err) {
      setErrorMsg('Network error connecting to login server');
    } finally {
      setLoading(false);
    }
  }

  async function handleFacultyLogin(e) {
    if (e) e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg('');
      const res = await api.facultyLogin(facultyEmail, password);
      if (res.success) {
        onLoginSuccess(res.user);
        onClose();
      } else {
        setErrorMsg(res.error || 'Failed to login');
      }
    } catch (err) {
      setErrorMsg('Network error connecting to login server');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header Card */}
        <div className="bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 p-6 text-white text-center relative">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 mx-auto flex items-center justify-center mb-3">
            <School className="w-6 h-6 text-indigo-300" />
          </div>
          <h3 className="text-xl font-bold tracking-tight">University Portal Sign In</h3>
          <p className="text-xs text-slate-300 mt-1">Access attendance, QR check-ins, and academic records</p>
        </div>

        {/* Role Switcher Tabs */}
        <div className="p-2 bg-slate-100 border-b border-slate-200 flex space-x-1">
          <button
            type="button"
            onClick={() => { setRole('student'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center space-x-1.5 ${
              role === 'student' 
                ? 'bg-white text-indigo-700 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Student Account</span>
          </button>
          <button
            type="button"
            onClick={() => { setRole('faculty'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center space-x-1.5 ${
              role === 'faculty' 
                ? 'bg-white text-indigo-700 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Faculty / Staff</span>
          </button>
        </div>

        {/* Login Body */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 text-rose-700 text-xs flex items-center space-x-2 border border-rose-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {role === 'student' ? (
            <form onSubmit={handleStudentLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                  Student ID Number
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="e.g. USEA-2024-001"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                  Portal Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Default demo password: <code className="bg-slate-100 px-1 py-0.5 rounded">password123</code></p>
              </div>

              <button
                type="submit"
                disabled={loading || !studentId.trim()}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl transition shadow-md shadow-indigo-100 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <span>{loading ? 'Authenticating...' : 'Sign In to Student Portal'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* 1-Click Quick Demo Student Switchers */}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400 block mb-2 uppercase">
                  1-Click Demo Accounts:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => { setStudentId('USEA-2024-001'); handleStudentLogin(null, 'USEA-2024-001'); }}
                    className="p-2 text-left bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 rounded-xl border border-slate-200 transition cursor-pointer"
                  >
                    <span className="text-xs font-bold text-slate-800 block">Sopanha Chhem</span>
                    <span className="text-[10px] text-slate-500 font-mono">USEA-2024-001 (SE-301)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setStudentId('USEA-2024-002'); handleStudentLogin(null, 'USEA-2024-002'); }}
                    className="p-2 text-left bg-rose-50/50 hover:bg-rose-50 hover:border-rose-200 rounded-xl border border-rose-200/60 transition cursor-pointer"
                  >
                    <span className="text-xs font-bold text-rose-800 block">Bopha Sok (At-Risk)</span>
                    <span className="text-[10px] text-rose-600 font-mono">USEA-2024-002</span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleFacultyLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                  Faculty Email Address
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={facultyEmail}
                    onChange={(e) => setFacultyEmail(e.target.value)}
                    placeholder="faculty@usea.edu.kh"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-xl transition shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <span>{loading ? 'Signing in...' : 'Sign In as Faculty'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
