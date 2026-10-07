import React, { useState } from 'react';
import {
  UserProfile,
  CourseType,
  YearType,
  SemesterType,
  YEAR_SEMESTER_MAP,
} from '../types/user';
import {
  X,
  User,
  GraduationCap,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Save,
  LogOut,
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onSignOut: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  onSignOut,
}) => {
  const [name, setName] = useState(user.name);
  const [course, setCourse] = useState<CourseType>(user.course);
  const [year, setYear] = useState<YearType>(user.year);
  const [semester, setSemester] = useState<SemesterType>(user.semester);
  const [showSaveAlert, setShowSaveAlert] = useState(false);

  if (!isOpen) return null;

  const handleYearChange = (newYear: YearType) => {
    setYear(newYear);
    setSemester(YEAR_SEMESTER_MAP[newYear][0]);
  };

  const handlePromoteNextYear = () => {
    if (year === '1st') {
      setYear('2nd');
      setSemester('3rd semester');
    } else if (year === '2nd') {
      setYear('3rd');
      setSemester('5th semester');
    } else {
      alert('You are already in 3rd Year (Final Year)!');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...user,
      name: name.trim(),
      course,
      year,
      semester,
    };
    onUpdateUser(updated);
    setShowSaveAlert(true);
    setTimeout(() => {
      setShowSaveAlert(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#081814] border border-[#194437] rounded-3xl p-6 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#13352a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-700/50 border border-emerald-400/50 flex items-center justify-center text-emerald-300 font-bold text-base">
              {name.charAt(0) || 'S'}
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Student Profile</h3>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-[#112d24] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Advance Banner */}
        <div className="my-4 p-3.5 rounded-2xl bg-gradient-to-r from-[#0c2b21] to-[#0f3428] border border-emerald-500/30 flex items-center justify-between gap-3">
          <div>
            <h4 className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Passed your exams?
            </h4>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Promote to next academic year and load new syllabus.
            </p>
          </div>
          <button
            type="button"
            onClick={handlePromoteNextYear}
            disabled={year === '3rd'}
            className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
          >
            <span>Advance Year</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Update Profile Form */}
        <form onSubmit={handleSave} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Full Name
            </label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 text-emerald-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-[#051411] border border-[#163a30] text-sm text-slate-100 focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          {/* Course */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Course / Branch
            </label>
            <div className="space-y-1.5">
              {(
                [
                  'Computer Engineering',
                  'Information Technology',
                  'Electronics Engineering',
                ] as CourseType[]
              ).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCourse(c)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition-all text-left cursor-pointer ${
                    course === c
                      ? 'bg-emerald-600/20 border-emerald-400 text-white font-semibold'
                      : 'bg-[#051411] border-[#163a30] text-slate-300 hover:border-emerald-500/40'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{c}</span>
                  </div>
                  {course === c && (
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">
                      Selected
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Year & Semester */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Year of Studying & Semester
            </label>

            {/* Year Pills */}
            <div className="grid grid-cols-3 gap-2 mb-2.5">
              {(['1st', '2nd', '3rd'] as YearType[]).map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => handleYearChange(y)}
                  className={`py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                    year === y
                      ? 'bg-[#12382f] border-emerald-400 text-emerald-300'
                      : 'bg-[#051411] border-[#163a30] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {y} Year
                </button>
              ))}
            </div>

            {/* Semester Pills */}
            <div className="grid grid-cols-2 gap-2">
              {YEAR_SEMESTER_MAP[year].map((sem) => (
                <button
                  key={sem}
                  type="button"
                  onClick={() => setSemester(sem)}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                    semester === sem
                      ? 'bg-emerald-500/25 border-emerald-400 text-white font-semibold'
                      : 'bg-[#051411] border-[#163a30] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Calendar className="w-3 h-3 text-emerald-400" />
                  <span>{sem}</span>
                </button>
              ))}
            </div>
          </div>

          {showSaveAlert && (
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-xs text-emerald-300 text-center font-medium animate-fadeIn">
              Profile updated successfully!
            </div>
          )}

          {/* Footer actions */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onSignOut}
              className="px-3.5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-[#081f18] border border-[#163a30] text-slate-400 hover:text-white text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
