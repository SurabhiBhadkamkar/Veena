import React, { useState } from 'react';
import { UserProfile, SemesterType, YEAR_SEMESTER_MAP } from '../types/user';
import { SYLLABUS_DATABASE, Subject } from '../data/syllabusData';
import { X, BookOpen, Search, CheckCircle, Award } from 'lucide-react';

interface SyllabusModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

export const SyllabusModal: React.FC<SyllabusModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const [selectedSem, setSelectedSem] = useState<SemesterType>(user.semester);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const currentCourseSyllabus = SYLLABUS_DATABASE[user.course] || SYLLABUS_DATABASE['Computer Engineering'];
  const subjects: Subject[] = currentCourseSyllabus[selectedSem] || [];

  const filteredSubjects = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.topics.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#081814] border border-[#194437] rounded-3xl p-6 sm:p-7 shadow-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#13352a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0f2e25] border border-[#1d4d3e] flex items-center justify-center text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Course Syllabus — {user.course}
              </h3>
              <p className="text-xs text-emerald-400">
                Official Engineering Curricula
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-[#112d24] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Semester Selector Tabs & Search */}
        <div className="py-4 space-y-3">
          {/* Semester Pills */}
          <div className="flex flex-wrap gap-2">
            {(
              [
                '1st semester',
                '2nd semester',
                '3rd semester',
                '4th semester',
                '5th semester',
                '6th semester',
              ] as SemesterType[]
            ).map((sem) => (
              <button
                key={sem}
                onClick={() => setSelectedSem(sem)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedSem === sem
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                    : 'bg-[#0a1e19] text-slate-400 hover:text-slate-200 border border-[#163a30]'
                }`}
              >
                {sem}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search topics, subject code, or concepts..."
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-[#051411] border border-[#163a30] text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        {/* Subjects List */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
          {filteredSubjects.length === 0 ? (
            <p className="text-center text-xs text-slate-400 py-8">
              No subjects or topics matched your search filter.
            </p>
          ) : (
            filteredSubjects.map((subject) => (
              <div
                key={subject.code}
                className="p-4 rounded-2xl bg-[#0a1f1a] border border-[#163c31] space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {subject.code}
                    </span>
                    <h4 className="text-sm font-bold text-white">
                      {subject.name}
                    </h4>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {subject.credits} Credits
                  </span>
                </div>

                {/* Topics list */}
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 mb-1">
                    Key Exam Units & Topics:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {subject.topics.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-slate-300 bg-[#061411] border border-[#17382e] px-2.5 py-1 rounded-lg"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
