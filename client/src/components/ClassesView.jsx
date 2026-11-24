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
  BookOpen,
  Search,
  Filter,
  Layers,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Table as TableIcon
} from 'lucide-react';
import { api } from '../api';
import { useLanguage } from '../i18n/LanguageContext';

export default function ClassesView({ onSelectClassForAttendance, onOpenAddClass }) {
  const { t, lang } = useLanguage();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('curriculum'); // 'curriculum' | 'active'

  // Filters for active view
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('ALL');
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [selectedSemester, setSelectedSemester] = useState('ALL');

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

  // Helper to match a class in database by course name substring
  function findClass(namePrefix) {
    if (!classes || classes.length === 0) return null;
    const cleanPrefix = namePrefix.toLowerCase().trim();
    return classes.find(c => c.name.toLowerCase().includes(cleanPrefix));
  }

  // Filtered classes for 'active' view
  const filteredClasses = classes.filter(cls => {
    const matchesSearch = 
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cls.teacher_name && cls.teacher_name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesMajor = 
      selectedMajor === 'ALL' || 
      (cls.major && cls.major.toLowerCase() === selectedMajor.toLowerCase()) ||
      (cls.department && cls.department.toLowerCase().includes(selectedMajor.toLowerCase()));

    const matchesYear = 
      selectedYear === 'ALL' || 
      (cls.year_level && cls.year_level.toLowerCase() === selectedYear.toLowerCase());

    const matchesSemester = 
      selectedSemester === 'ALL' || 
      (cls.semester && cls.semester.toLowerCase().includes(selectedSemester.toLowerCase()));

    return matchesSearch && matchesMajor && matchesYear && matchesSemester;
  });

  // Official Curriculum definition from the document:
  // "២. កម្មវិធីអប់រំ នៃមុខជំនាញព័ត៌មានវិទ្យា និងមុខជំនាញប្រព័ន្ធអាជីវកម្មអេឡិចត្រូនិក"
  const curriculumData = [
    {
      yearLabelKm: 'ឆ្នាំទី២',
      yearLabelEn: 'Year 2',
      semesters: [
        {
          semLabelKm: 'ឆមាសទី១',
          semLabelEn: 'Semester 1',
          bgCol: 'bg-amber-50/40',
          itCourses: [
            { name: 'Database Management System', code: 'IT-211' },
            { name: 'Data Communication and Networking', code: 'IT-212' },
            { name: 'UX and UI Design', code: 'IT-213' },
            { name: 'Web App Development II', code: 'IT-214' },
            { name: 'Chinese Language III', code: 'LANG-211' },
            { name: 'English Language III', code: 'LANG-212' }
          ],
          ebsCourses: [
            { name: 'Database Management System', code: 'EBS-211' },
            { name: 'Business and Technology', code: 'EBS-212' },
            { name: 'UX and UI Design', code: 'EBS-213' },
            { name: 'Web App Development II', code: 'EBS-214' },
            { name: 'Chinese Language III', code: 'EBS-LANG-211' },
            { name: 'English Language III', code: 'EBS-LANG-212' }
          ]
        },
        {
          semLabelKm: 'ឆមាសទី២',
          semLabelEn: 'Semester 2',
          bgCol: 'bg-amber-50/60',
          itCourses: [
            { name: '.NET Technology', code: 'IT-221' },
            { name: 'Cisco Networking I', code: 'IT-222' },
            { name: 'Data Structure and Algorithms with C++', code: 'IT-223' },
            { name: 'Web App Framework', code: 'IT-224' },
            { name: 'Chinese Language IV', code: 'LANG-221' },
            { name: 'English Language IV', code: 'LANG-222' }
          ],
          ebsCourses: [
            { name: 'Principle of Modern Marketing', code: 'EBS-221' },
            { name: 'Business Communication and Responsible', code: 'EBS-222' },
            { name: 'Data Structure and Algorithms with C++', code: 'EBS-223' },
            { name: 'Web App Framework', code: 'EBS-224' },
            { name: 'Chinese Language IV', code: 'EBS-LANG-221' },
            { name: 'English Language IV', code: 'EBS-LANG-222' }
          ]
        }
      ]
    },
    {
      yearLabelKm: 'ឆ្នាំទី៣',
      yearLabelEn: 'Year 3',
      semesters: [
        {
          semLabelKm: 'ឆមាសទី១',
          semLabelEn: 'Semester 1',
          bgCol: 'bg-sky-50/40',
          itCourses: [
            { name: 'Database Administration', code: 'IT-311' },
            { name: 'Cisco Networking II', code: 'IT-312' },
            { name: 'Java Programming', code: 'IT-313' },
            { name: 'System Analysis and Design', code: 'IT-314' },
            { name: 'English Language V', code: 'LANG-311' },
            { name: 'Chinese Language V', code: 'LANG-312' }
          ],
          ebsCourses: [
            { name: 'Accounting Information System', code: 'EBS-311' },
            { name: 'Cambodian Business Law', code: 'EBS-312' },
            { name: 'Entrepreneurship & Innovation', code: 'EBS-313' },
            { name: 'System Analysis and Design', code: 'EBS-314' },
            { name: 'English Language V', code: 'EBS-LANG-311' },
            { name: 'Chinese Language V', code: 'EBS-LANG-312' }
          ]
        },
        {
          semLabelKm: 'ឆមាសទី២',
          semLabelEn: 'Semester 2',
          bgCol: 'bg-sky-50/60',
          itCourses: [
            { name: 'Data Science', code: 'IT-321' },
            { name: 'Research Methodology I', code: 'IT-322' },
            { name: 'Android App Development', code: 'IT-323' },
            { name: 'Network Administration I', code: 'IT-324' },
            { name: 'English Language VI', code: 'LANG-321' },
            { name: 'Chinese Language VI', code: 'LANG-322' }
          ],
          ebsCourses: [
            { name: 'Data Science', code: 'EBS-321' },
            { name: 'Research Methodology I', code: 'EBS-322' },
            { name: 'Marketing Management', code: 'EBS-323' },
            { name: 'Project Management', code: 'EBS-324' },
            { name: 'English Language VI', code: 'EBS-LANG-321' },
            { name: 'Chinese Language VI', code: 'EBS-LANG-322' }
          ]
        }
      ]
    },
    {
      yearLabelKm: 'ឆ្នាំទី៤',
      yearLabelEn: 'Year 4',
      semesters: [
        {
          semLabelKm: 'ឆមាសទី១',
          semLabelEn: 'Semester 1',
          bgCol: 'bg-emerald-50/40',
          itCourses: [
            { name: 'Research Methodology II', code: 'IT-411' },
            { name: 'Hybrid App Development', code: 'IT-412' },
            { name: 'Cyber Security', code: 'IT-413' },
            { name: 'Internet of Things (IoT)', code: 'IT-414' },
            { name: 'Network Administration II', code: 'IT-415' }
          ],
          ebsCourses: [
            { name: 'Research Methodology II', code: 'EBS-411' },
            { name: 'Hybrid App Development', code: 'EBS-412' },
            { name: 'Cyber Security', code: 'EBS-413' },
            { name: 'Artificial Intelligence for Business', code: 'EBS-414' },
            { name: 'Global Supplied Chain Management', code: 'EBS-415' }
          ]
        },
        {
          semLabelKm: 'ឆមាសទី២ (សារណា)',
          semLabelEn: 'Semester 2 (Thesis)',
          bgCol: 'bg-emerald-50/60',
          itCourses: [
            { name: 'Management Information System', code: 'IT-421' },
            { name: 'E-Commerce and Digital Marketing', code: 'IT-422' },
            { name: 'Thesis', code: 'IT-THE-423' }
          ],
          ebsCourses: [
            { name: 'Management Information System', code: 'EBS-421' },
            { name: 'E-Commerce and Digital Marketing', code: 'EBS-422' },
            { name: 'Thesis', code: 'EBS-THE-423' }
          ]
        },
        {
          semLabelKm: 'ឆមាសទី២ (របាយការណ៍)',
          semLabelEn: 'Semester 2 (Report)',
          bgCol: 'bg-emerald-50/80',
          itCourses: [
            { name: 'Management Information System', code: 'IT-421' },
            { name: 'E-Commerce and Digital Marketing', code: 'IT-422' },
            { name: 'Machine Learning', code: 'IT-424' },
            { name: 'DevOps', code: 'IT-425' },
            { name: 'Report', code: 'IT-REP-426' }
          ],
          ebsCourses: [
            { name: 'Management Information System', code: 'EBS-421' },
            { name: 'E-Commerce and Digital Marketing', code: 'EBS-422' },
            { name: 'Machine Learning', code: 'EBS-424' },
            { name: 'Cloud Computing for Digital Business', code: 'EBS-425' },
            { name: 'Report', code: 'EBS-REP-426' }
          ]
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <GraduationCap className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {t('classesTitle')}
              </h1>
              <p className="text-xs text-indigo-600 font-medium">
                {t('curriculumDocSubtitle')}
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            {t('classesDesc')}
          </p>
        </div>

        {/* View Mode Switcher & Add Class */}
        <div className="flex items-center space-x-2 self-start md:self-auto">
          <div className="bg-slate-100 p-1 rounded-2xl flex space-x-1 border border-slate-200">
            <button
              onClick={() => setViewMode('curriculum')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer flex items-center space-x-1.5 ${
                viewMode === 'curriculum' 
                  ? 'bg-white text-indigo-700 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>{t('curriculumMatrixTab')}</span>
            </button>
            <button
              onClick={() => setViewMode('active')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer flex items-center space-x-1.5 ${
                viewMode === 'active' 
                  ? 'bg-white text-indigo-700 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{t('activeClassesTab')} ({classes.length})</span>
            </button>
          </div>

          <button
            onClick={onOpenAddClass}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-100 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">{t('addNewClassBtn')}</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: CURRICULUM COMPARATIVE MATRIX (Matches Document Exactly) */}
      {viewMode === 'curriculum' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
          {/* Table Header Callout */}
          <div className="p-5 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-200 text-[11px] font-bold mb-1 border border-indigo-400/30">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>USEA Official Curriculum Specification</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold">
                {t('curriculumDocTitle')}
              </h2>
              <p className="text-xs text-slate-300">
                {t('viewCurriculumDesc')}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-mono bg-white/10 px-2.5 py-1 rounded-lg text-slate-200 border border-white/10">
                Total Classes: {classes.length}
              </span>
            </div>
          </div>

          {/* Comparative Curriculum Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/90 text-slate-800 border-b border-slate-200 text-[11px] uppercase tracking-wider font-bold">
                  <th className="p-3.5 border-r border-slate-200 text-center w-20">
                    {lang === 'km' ? 'ឆ្នាំ' : 'Year'}
                  </th>
                  <th className="p-3.5 border-r border-slate-200 text-center w-32 sm:w-40">
                    {lang === 'km' ? 'ឆមាស' : 'Semester'}
                  </th>
                  <th className="p-3.5 border-r border-slate-200 w-1/2 bg-sky-50 text-sky-900">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">
                        {lang === 'km' ? 'មុខជំនាញ ព័ត៌មានវិទ្យា' : 'Major: Information Technology (IT)'}
                      </span>
                      <span className="text-[10px] bg-sky-200/70 text-sky-800 px-2 py-0.5 rounded-md font-mono">
                        IT Program
                      </span>
                    </div>
                  </th>
                  <th className="p-3.5 w-1/2 bg-amber-50 text-amber-900">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">
                        {lang === 'km' ? 'មុខជំនាញ ប្រព័ន្ធអាជីវកម្មអេឡិចត្រូនិក' : 'Major: E-Business Systems (EBS)'}
                      </span>
                      <span className="text-[10px] bg-amber-200/70 text-amber-800 px-2 py-0.5 rounded-md font-mono">
                        EBS Program
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {curriculumData.map((yearItem, yrIdx) => (
                  <React.Fragment key={yrIdx}>
                    {yearItem.semesters.map((sem, semIdx) => {
                      const isFirstInYear = semIdx === 0;
                      return (
                        <tr key={`${yrIdx}-${semIdx}`} className="hover:bg-slate-50/60 transition">
                          {/* Year Column with RowSpan */}
                          {isFirstInYear && (
                            <td 
                              rowSpan={yearItem.semesters.length}
                              className="p-3.5 text-center font-bold text-sm text-slate-800 border-r border-slate-200 bg-slate-50/70 align-middle"
                            >
                              <div className="font-bold text-slate-900">
                                {lang === 'km' ? yearItem.yearLabelKm : yearItem.yearLabelEn}
                              </div>
                              <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                                USEA
                              </span>
                            </td>
                          )}

                          {/* Semester Column */}
                          <td className={`p-3.5 text-center font-bold text-xs text-slate-700 border-r border-slate-200 ${sem.bgCol} align-middle`}>
                            <div>{lang === 'km' ? sem.semLabelKm : sem.semLabelEn}</div>
                          </td>

                          {/* IT Courses Column */}
                          <td className="p-3 border-r border-slate-200 align-top bg-sky-50/20">
                            <div className="space-y-1.5">
                              {sem.itCourses.map((c, i) => {
                                const matched = findClass(c.name);
                                return (
                                  <div 
                                    key={i}
                                    className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-indigo-300 hover:shadow-xs transition flex items-center justify-between group"
                                  >
                                    <div className="pr-2">
                                      <div className="font-semibold text-slate-800 group-hover:text-indigo-600 transition flex items-center space-x-1.5">
                                        <span>{c.name}</span>
                                      </div>
                                      <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-mono mt-0.5">
                                        <span className="bg-sky-50 text-sky-700 px-1 rounded font-bold border border-sky-200">
                                          {matched?.code || c.code}
                                        </span>
                                        {matched && (
                                          <span>• {matched.teacher_name} ({matched.student_count || 0} students)</span>
                                        )}
                                      </div>
                                    </div>

                                    {matched ? (
                                      <button
                                        onClick={() => onSelectClassForAttendance(matched.id)}
                                        className="shrink-0 px-2 py-1 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white rounded-lg text-[10px] font-bold transition flex items-center space-x-1 cursor-pointer"
                                        title={t('takeAttendanceBtn')}
                                      >
                                        <ClipboardCheck className="w-3 h-3" />
                                        <span className="hidden sm:inline">{t('takeAttendanceBtn')}</span>
                                      </button>
                                    ) : (
                                      <span className="text-[10px] text-slate-400 font-mono">Curriculum</span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </td>

                          {/* EBS Courses Column */}
                          <td className="p-3 align-top bg-amber-50/20">
                            <div className="space-y-1.5">
                              {sem.ebsCourses.map((c, i) => {
                                const matched = findClass(c.name);
                                return (
                                  <div 
                                    key={i}
                                    className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-amber-300 hover:shadow-xs transition flex items-center justify-between group"
                                  >
                                    <div className="pr-2">
                                      <div className="font-semibold text-slate-800 group-hover:text-amber-700 transition flex items-center space-x-1.5">
                                        <span>{c.name}</span>
                                      </div>
                                      <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-mono mt-0.5">
                                        <span className="bg-amber-50 text-amber-800 px-1 rounded font-bold border border-amber-200">
                                          {matched?.code || c.code}
                                        </span>
                                        {matched && (
                                          <span>• {matched.teacher_name} ({matched.student_count || 0} students)</span>
                                        )}
                                      </div>
                                    </div>

                                    {matched ? (
                                      <button
                                        onClick={() => onSelectClassForAttendance(matched.id)}
                                        className="shrink-0 px-2 py-1 bg-amber-50 hover:bg-amber-600 text-amber-800 hover:text-white rounded-lg text-[10px] font-bold transition flex items-center space-x-1 cursor-pointer"
                                        title={t('takeAttendanceBtn')}
                                      >
                                        <ClipboardCheck className="w-3 h-3" />
                                        <span className="hidden sm:inline">{t('takeAttendanceBtn')}</span>
                                      </button>
                                    ) : (
                                      <span className="text-[10px] text-slate-400 font-mono">Curriculum</span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: ACTIVE CLASSES GRID WITH SEARCH & FILTERS */}
      {viewMode === 'active' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Box */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'km' ? 'ស្វែងរកតាមឈ្មោះមុខវិជ្ជា, កូដ, ឬសាស្ត្រាចារ្យ...' : 'Search by course name, code, instructor...'}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Major Filter */}
              <select
                value={selectedMajor}
                onChange={(e) => setSelectedMajor(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 font-semibold text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="ALL">{t('allMajors')}</option>
                <option value="Information Technology">{t('majorIT')}</option>
                <option value="E-Business Systems">{t('majorEBS')}</option>
              </select>

              {/* Year Filter */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 font-semibold text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="ALL">{t('allYears')}</option>
                <option value="Year 2">{t('year2')}</option>
                <option value="Year 3">{t('year3')}</option>
                <option value="Year 4">{t('year4')}</option>
              </select>

              {/* Semester Filter */}
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 font-semibold text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="ALL">{t('allSemesters')}</option>
                <option value="Semester 1">{t('semester1')}</option>
                <option value="Semester 2">{t('semester2')}</option>
              </select>
            </div>
          </div>

          <div className="text-xs text-slate-500 font-medium px-1 flex items-center justify-between">
            <span>{filteredClasses.length} {t('classesFound')}</span>
            <span>{t('academicTerm')}</span>
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClasses.map((cls) => {
              const rate = cls.attendance_rate || 0;
              const isIT = cls.major === 'Information Technology' || (cls.code && cls.code.startsWith('IT-'));
              return (
                <div 
                  key={cls.id} 
                  className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                        <span className={`px-2 py-0.5 rounded-lg font-mono text-xs font-bold border ${
                          isIT 
                            ? 'bg-sky-50 text-sky-700 border-sky-200' 
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          {cls.code}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {cls.year_level || 'Year 2'}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200 shrink-0">
                        {cls.semester}
                      </span>
                    </div>

                    {/* Course Title */}
                    <h3 className="text-base font-bold text-slate-900 mt-3 group-hover:text-indigo-600 transition leading-snug">
                      {cls.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {cls.department || cls.major}
                    </p>

                    {/* Meta info */}
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center space-x-2">
                        <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span><strong className="text-slate-800">{cls.teacher_name}</strong></span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{cls.room}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-mono text-[11px]">{cls.schedule_time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{t('enrolledLabel')}: <strong className="text-slate-800">{cls.student_count || 0} students</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Attendance Bar & CTA */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[11px] font-medium text-slate-500">{t('averageAttendance')}</span>
                      <span className={`font-bold text-xs ${rate >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>{rate}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${rate >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                        style={{ width: `${rate}%` }}
                      />
                    </div>

                    <div className="mt-3 flex items-center justify-end">
                      <button
                        onClick={() => onSelectClassForAttendance(cls.id)}
                        className="w-full py-2 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center space-x-1.5 shadow-2xs"
                      >
                        <ClipboardCheck className="w-3.5 h-3.5" />
                        <span>{t('takeAttendanceBtn')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
