import React, { useState, useEffect } from 'react';
import { 
  Users, 
  GraduationCap, 
  Percent, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  FileText,
  ArrowRight,
  ArrowUpRight,
  QrCode,
  ClipboardCheck,
  Download
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell 
} from 'recharts';
import { api } from '../api';
import { useLanguage } from '../i18n/LanguageContext';

export default function DashboardView({ onNavigate, onSelectStudent }) {
  const { t } = useLanguage();
  const [overview, setOverview] = useState(null);
  const [trends, setTrends] = useState([]);
  const [classesComparison, setClassesComparison] = useState([]);
  const [atRiskList, setAtRiskList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      setLoading(true);
      const [ovRes, trRes, ccRes, arRes] = await Promise.all([
        api.getOverview(),
        api.getTrends(14),
        api.getClassComparison(),
        api.getAtRisk()
      ]);

      if (ovRes.success) setOverview(ovRes.data);
      if (trRes.success) setTrends(trRes.data);
      if (ccRes.success) setClassesComparison(ccRes.data);
      if (arRes.success) setAtRiskList(arRes.data);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !overview) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-sm text-slate-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const { total_students, total_classes, overall_attendance_rate, at_risk_count, breakdown } = overview;
  const totalBreakdown = (breakdown.present + breakdown.late + breakdown.absent + breakdown.excused) || 1;

  return (
    <div className="space-y-6">
      {/* Welcome & Quick Action Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-10">
          <GraduationCap className="w-64 h-64" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold mb-2 backdrop-blur-xs">
            {t('academicTerm')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{t('heroTitle')}</h1>
          <p className="text-slate-300 text-sm mt-1">
            {t('heroDesc')}
          </p>

          <div className="flex flex-wrap gap-3 mt-5">
            <button
              onClick={() => onNavigate('mark')}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-medium rounded-xl transition shadow-md shadow-indigo-900/50 cursor-pointer"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>{t('markTodayBtn')}</span>
            </button>
            <button
              onClick={() => onNavigate('qr')}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium rounded-xl backdrop-blur-xs transition border border-white/15 cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>{t('openQrStationBtn')}</span>
            </button>
            <a
              href={api.getExportCsvUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium rounded-xl backdrop-blur-xs transition border border-white/15 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t('exportCsvBtn')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t('activeStudents')}</p>
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <h3 className="text-2xl font-bold text-slate-900">{total_students}</h3>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {t('activeEnrolled')}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">{t('acrossDepts')}</p>
        </div>

        {/* Total Classes */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t('classesAndSections')}</p>
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <h3 className="text-2xl font-bold text-slate-900">{total_classes}</h3>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              {t('activeCourses')}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">{t('dailyScheduled')}</p>
        </div>

        {/* Overall Attendance Rate */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t('averageAttendance')}</p>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              overall_attendance_rate >= 80 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
            }`}>
              <Percent className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <h3 className={`text-2xl font-bold ${
              overall_attendance_rate >= 80 ? 'text-emerald-600' : 'text-amber-600'
            }`}>
              {overall_attendance_rate}%
            </h3>
            <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
              {t('past30Days')}
            </span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className={`h-full rounded-full ${overall_attendance_rate >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
              style={{ width: `${overall_attendance_rate}%` }}
            ></div>
          </div>
        </div>

        {/* At-Risk Students */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t('atRiskStudents')}</p>
            <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <h3 className="text-2xl font-bold text-rose-600">{at_risk_count}</h3>
            <span className="text-xs font-medium text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              {t('atRisk')}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">{t('requiresIntervention')}</p>
        </div>
      </div>

      {/* Status Breakdown Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t('recordDistribution')}</span>
          <span className="text-xs text-slate-400">{t('totalRecorded')}: {totalBreakdown.toLocaleString()}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3">
          <div className="flex items-center space-x-3 p-2 rounded-lg bg-emerald-50/50 border border-emerald-100">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <div>
              <p className="text-xs text-slate-500 font-medium">{t('present')}</p>
              <p className="text-sm font-bold text-slate-900">{breakdown.present} ({Math.round(breakdown.present / totalBreakdown * 100)}%)</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-2 rounded-lg bg-amber-50/50 border border-amber-100">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div>
              <p className="text-xs text-slate-500 font-medium">{t('late')}</p>
              <p className="text-sm font-bold text-slate-900">{breakdown.late} ({Math.round(breakdown.late / totalBreakdown * 100)}%)</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-2 rounded-lg bg-rose-50/50 border border-rose-100">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div>
              <p className="text-xs text-slate-500 font-medium">{t('absent')}</p>
              <p className="text-sm font-bold text-slate-900">{breakdown.absent} ({Math.round(breakdown.absent / totalBreakdown * 100)}%)</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-2 rounded-lg bg-blue-50/50 border border-blue-100">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <div>
              <p className="text-xs text-slate-500 font-medium">{t('excused')}</p>
              <p className="text-sm font-bold text-slate-900">{breakdown.excused} ({Math.round(breakdown.excused / totalBreakdown * 100)}%)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Area Chart */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">{t('dailyTrend')}</h3>
              <p className="text-xs text-slate-500">{t('dailyTrendDesc')}</p>
            </div>
            <span className="flex items-center space-x-1 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{t('past15Sessions')}</span>
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 11, fill: '#64748b' }} 
                  tickFormatter={(val) => val ? val.slice(5) : ''} 
                />
                <YAxis 
                  domain={[40, 100]} 
                  tick={{ fontSize: 11, fill: '#64748b' }} 
                  unit="%" 
                />
                <Tooltip 
                  formatter={(val) => [`${val}%`, 'Attendance Rate']}
                  labelFormatter={(lbl) => `Date: ${lbl}`}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="attendance_rate" 
                  stroke="#4f46e5" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#rateGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Class Comparison Bar Chart */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">{t('classPerformance')}</h3>
              <p className="text-xs text-slate-500">{t('classPerformanceDesc')}</p>
            </div>
            <button 
              onClick={() => onNavigate('classes')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
            >
              <span>{t('viewAll')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classesComparison} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="code" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#64748b' }} unit="%" />
                <Tooltip 
                  formatter={(val, name, item) => [`${val}%`, item.payload.name]}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="attendance_rate" radius={[6, 6, 0, 0]}>
                  {classesComparison.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.attendance_rate >= 85 ? '#10b981' : entry.attendance_rate >= 75 ? '#6366f1' : '#f59e0b'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* At-Risk Students Action Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">{t('studentsNeedingAttention')}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{t('studentsNeedingAttentionDesc')}</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 self-start sm:self-auto">
            {atRiskList.length} {t('atRiskStudents')}
          </span>
        </div>

        {atRiskList.length === 0 ? (
          <div className="p-8 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <h4 className="text-sm font-semibold text-slate-900">{t('allGoodStanding')}</h4>
            <p className="text-xs text-slate-500">{t('allGoodStandingDesc')}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">{t('studentCol')}</th>
                  <th className="py-3 px-4">{t('studentIdCol')}</th>
                  <th className="py-3 px-4">{t('classCol')}</th>
                  <th className="py-3 px-4 text-center">{t('absencesCol')}</th>
                  <th className="py-3 px-4">{t('rateCol')}</th>
                  <th className="py-3 px-4 text-right">{t('actionCol')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {atRiskList.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={st.avatar} 
                          alt={st.first_name} 
                          className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50" 
                        />
                        <div>
                          <p className="font-semibold text-slate-900">{st.last_name} {st.first_name}</p>
                          <p className="text-xs text-slate-400">{st.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">{st.student_id}</td>
                    <td className="py-3 px-4 text-slate-700">
                      <span className="font-medium">{st.class_code}</span>
                      <span className="text-slate-400 block text-xs truncate max-w-[150px]">{st.class_name}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold text-xs border border-rose-200">
                        {st.absent_count} {t('absent')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-rose-500 h-full rounded-full" 
                            style={{ width: `${st.attendance_rate}%` }}
                          ></div>
                        </div>
                        <span className="font-bold text-rose-600 text-xs">{st.attendance_rate}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onSelectStudent(st.id)}
                        className="inline-flex items-center space-x-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-md transition cursor-pointer"
                      >
                        <span>{t('historyBtn')}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
