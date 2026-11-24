import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  AlertTriangle, 
  CheckCircle2, 
  Trash2, 
  Edit3, 
  ExternalLink,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { api } from '../api';
import { useLanguage } from '../i18n/LanguageContext';

export default function StudentsView({ onSelectStudent, onOpenAddStudent }) {
  const { t } = useLanguage();
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [riskFilter, setRiskFilter] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [selectedClass, search]);

  async function loadData() {
    try {
      setLoading(true);
      const params = {};
      if (selectedClass) params.class_id = selectedClass;
      if (search) params.search = search;

      const [stRes, clRes] = await Promise.all([
        api.getStudents(params),
        api.getClasses()
      ]);

      if (stRes.success) setStudents(stRes.data);
      if (clRes.success) setClasses(clRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteStudent(id, name) {
    if (!window.confirm(`Are you sure you want to remove ${name}? This will delete all attendance records.`)) {
      return;
    }
    try {
      const res = await api.deleteStudent(id);
      if (res.success) {
        setStudents(prev => prev.filter(s => s.id !== id));
      }
    } catch (err) {
      alert('Failed to delete student');
    }
  }

  const displayedStudents = students.filter(s => {
    if (riskFilter && !s.is_at_risk) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Users className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{t('directoryTitle')}</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t('directoryDesc')}
          </p>
        </div>

        <button
          onClick={onOpenAddStudent}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-indigo-100 transition cursor-pointer self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>{t('addNewStudentBtn')}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Filter by Class */}
        <div className="w-full md:w-56">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">{t('allClassesFilter')}</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.code} - {c.name}</option>
            ))}
          </select>
        </div>

        {/* At-risk Quick Toggle */}
        <button
          type="button"
          onClick={() => setRiskFilter(!riskFilter)}
          className={`w-full md:w-auto px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition border cursor-pointer ${
            riskFilter 
              ? 'bg-rose-600 text-white border-rose-600' 
              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <AlertTriangle className={`w-3.5 h-3.5 ${riskFilter ? 'text-white' : 'text-rose-500'}`} />
          <span>{t('atRiskOnlyToggle')}</span>
        </button>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center justify-center space-y-2">
            <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-medium">Loading...</p>
          </div>
        ) : displayedStudents.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Users className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No students match your query</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">{t('studentCol')}</th>
                  <th className="py-3 px-4">{t('studentIdCol')}</th>
                  <th className="py-3 px-4">{t('classCol')}</th>
                  <th className="py-3 px-4 text-center">{t('genderCol')}</th>
                  <th className="py-3 px-4">{t('rateCol')}</th>
                  <th className="py-3 px-4 text-center">{t('statusCol')}</th>
                  <th className="py-3 px-4 text-right">{t('actionsCol')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={st.avatar} 
                          alt="" 
                          className="w-9 h-9 rounded-full border border-slate-200 bg-slate-50 shrink-0" 
                        />
                        <div>
                          <p className="font-semibold text-slate-900">{st.last_name} {st.first_name}</p>
                          <p className="text-xs text-slate-400">{st.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-700 text-xs">
                      {st.student_id}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800">{st.class_code}</span>
                      <span className="text-slate-400 block text-xs">{st.class_name}</span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-xs text-slate-600">
                        {st.gender === 'Male' ? t('male') : st.gender === 'Female' ? t('female') : t('otherGender')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className={`font-bold ${
                            st.is_at_risk ? 'text-rose-600' : 'text-slate-800'
                          }`}>
                            {st.attendance_rate}%
                          </span>
                          <span className="text-slate-400 text-[11px]">
                            {st.present_count}P / {st.absent_count}A / {st.late_count}L
                          </span>
                        </div>
                        <div className="w-28 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              st.attendance_rate >= 80 
                                ? 'bg-emerald-500' 
                                : st.attendance_rate >= 75 
                                ? 'bg-indigo-500' 
                                : 'bg-rose-500'
                            }`}
                            style={{ width: `${st.attendance_rate}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {st.is_at_risk ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-semibold border border-rose-200">
                          <AlertTriangle className="w-3 h-3 text-rose-500" />
                          <span>{t('atRisk')}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span>{t('goodBadge')}</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center space-x-2">
                        <button
                          onClick={() => onSelectStudent(st.id)}
                          className="px-2.5 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md transition cursor-pointer"
                        >
                          {t('profileLogBtn')}
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(st.id, `${st.first_name} ${st.last_name}`)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
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
