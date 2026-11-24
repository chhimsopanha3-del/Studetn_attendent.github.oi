import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Plus, 
  Clock, 
  MapPin, 
  User, 
  Users, 
  Calendar,
  Percent,
  ClipboardCheck,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { api } from '../api';
import { useLanguage } from '../i18n/LanguageContext';

export default function ClassesView({ onSelectClassForAttendance, onOpenAddClass }) {
  const { t } = useLanguage();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClasses();
  }, []);

  async function loadClasses() {
    try {
      setLoading(true);
      const res = await api.getClasses();
      if (res.success) {
        setClasses(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <GraduationCap className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{t('classesTitle')}</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t('classesDesc')}
          </p>
        </div>

        <button
          onClick={onOpenAddClass}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-indigo-100 transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t('addNewClassBtn')}</span>
        </button>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((cls) => {
          const rate = cls.attendance_rate || 0;
          return (
            <div 
              key={cls.id} 
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Top Badge & Code */}
                <div className="flex items-start justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-mono text-xs font-bold border border-indigo-200">
                    {cls.code}
                  </span>
                  <div className="flex items-center space-x-1.5 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
                    <span className="text-[11px] font-semibold text-slate-500">{t('termLabel')}:</span>
                    <span className="text-[11px] font-bold text-slate-800">{cls.semester}</span>
                  </div>
                </div>

                {/* Title & Department */}
                <h3 className="text-lg font-bold text-slate-900 mt-3">{cls.name}</h3>
                <p className="text-xs text-slate-500">{cls.department}</p>

                {/* Details list */}
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{t('instructorLabel')}: <strong className="text-slate-800">{cls.teacher_name}</strong></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{t('locationLabel')}: <strong className="text-slate-800">{cls.room}</strong></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{t('scheduleLabel')}: <strong className="text-slate-800">{cls.schedule_time}</strong></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{t('enrolledLabel')}: <strong className="text-slate-800">{cls.student_count || 0}</strong></span>
                  </div>
                </div>
              </div>

              {/* Attendance Progress & CTA */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-500">{t('averageAttendance')}</span>
                  <span className={`font-bold ${rate >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>{rate}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${rate >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                    style={{ width: `${rate}%` }}
                  />
                </div>

                <div className="mt-4 flex items-center justify-end">
                  <button
                    onClick={() => onSelectClassForAttendance(cls.id)}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg transition cursor-pointer"
                  >
                    <ClipboardCheck className="w-4 h-4" />
                    <span>{t('takeAttendanceBtn')}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
