import React from 'react';
import { UserProfile, ChatSession } from '../types/user';
import { VeenaLogo } from './VeenaLogo';
import {
  PlusCircle,
  BookOpen,
  Calendar,
  Code2,
  PanelLeftClose,
  MessageSquare,
  Settings2,
  Trash2,
  Clock,
} from 'lucide-react';

interface LeftSidebarProps {
  user: UserProfile;
  activeItem: string;
  chatSessions: ChatSession[];
  activeSessionId?: string | null;
  onNewLearning: () => void;
  onCheckSyllabus: () => void;
  onStudyPlanner: () => void;
  onCoder: () => void;
  onSelectSession: (session: ChatSession) => void;
  onDeleteSession: (sessionId: string, e: React.MouseEvent) => void;
  onProfileClick: () => void;
  onCloseSidebar: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  user,
  activeItem,
  chatSessions,
  activeSessionId,
  onNewLearning,
  onCheckSyllabus,
  onStudyPlanner,
  onCoder,
  onSelectSession,
  onDeleteSession,
  onProfileClick,
  onCloseSidebar,
}) => {
  return (
    <aside className="relative w-64 md:w-68 flex-shrink-0 h-screen bg-[#061210] border-r border-[#133027] flex flex-col justify-between py-5 px-3.5 select-none z-30">
      {/* Background soft ambient gradient */}
      <div className="absolute top-0 left-0 w-full h-40 bg-emerald-500/5 pointer-events-none blur-2xl" />

      <div className="relative z-10 flex flex-col flex-1 min-h-0">
        {/* Top Header: Logo + Close Sidebar Icon */}
        <div className="flex items-center justify-between px-1 mb-6">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={onNewLearning}
          >
            <VeenaLogo size={38} />
            <div>
              <h1 className="text-lg font-extrabold tracking-wider text-white group-hover:text-emerald-300 transition-colors">
                VEENA
              </h1>
              <p className="text-[10px] font-medium text-emerald-400/90 tracking-tight">
                Your Learning Companion
              </p>
            </div>
          </div>

          {/* Close Sidebar Icon (Requirement 13) */}
          <button
            onClick={onCloseSidebar}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#0c241e] transition-colors cursor-pointer"
            title="Close sidebar"
            aria-label="Close sidebar"
          >
            <PanelLeftClose className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1.5">
          {/* 1. Check Syllabus */}
          <button
            onClick={onCheckSyllabus}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 cursor-pointer text-left ${
              activeItem === 'syllabus'
                ? 'bg-[#123c31] text-white shadow-sm border-l-2 border-emerald-400'
                : 'text-slate-300 hover:text-white hover:bg-[#0c241e]'
            }`}
          >
            <BookOpen className={`w-4.5 h-4.5 ${activeItem === 'syllabus' ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span className="truncate">Check Syllabus</span>
          </button>

          {/* 2. Study Planner */}
          <button
            onClick={onStudyPlanner}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 cursor-pointer text-left ${
              activeItem === 'planner'
                ? 'bg-[#123c31] text-white shadow-sm border-l-2 border-emerald-400'
                : 'text-slate-300 hover:text-white hover:bg-[#0c241e]'
            }`}
          >
            <Calendar className={`w-4.5 h-4.5 ${activeItem === 'planner' ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span className="truncate">Study Planner</span>
          </button>

          {/* 3. Coder */}
          <button
            onClick={onCoder}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 cursor-pointer text-left ${
              activeItem === 'coder'
                ? 'bg-[#123c31] text-white shadow-sm border-l-2 border-emerald-400'
                : 'text-slate-300 hover:text-white hover:bg-[#0c241e]'
            }`}
          >
            <Code2 className={`w-4.5 h-4.5 ${activeItem === 'coder' ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span className="truncate">Coder</span>
          </button>

          {/* 4. New Learning (Requirement: below Coder, only 'New Learning') */}
          <button
            onClick={onNewLearning}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer text-left mt-1 ${
              activeItem === 'new-learning'
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.35)]'
                : 'bg-[#0a201a] hover:bg-[#0f2e25] text-emerald-300 border border-emerald-500/30 hover:border-emerald-400/60'
            }`}
            title="Start a fresh learning session"
          >
            <PlusCircle className={`w-4.5 h-4.5 ${activeItem === 'new-learning' ? 'text-slate-950' : 'text-emerald-400'}`} />
            <span>New Learning</span>
          </button>
        </nav>

        {/* Chat History Section (Requirement 17: Previous chats remain available in history) */}
        {chatSessions.length > 0 && (
          <div className="mt-5 flex-1 min-h-0 flex flex-col pt-3 border-t border-[#133027]">
            <div className="flex items-center gap-1.5 px-2 mb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span>Chat History</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
              {chatSessions.map((session) => {
                const isCurrent = activeSessionId === session.id;
                return (
                  <div
                    key={session.id}
                    onClick={() => onSelectSession(session)}
                    className={`group w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-[#103429] text-emerald-200 font-medium'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-[#091e18]'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-1">
                      <MessageSquare className={`w-3.5 h-3.5 flex-shrink-0 ${isCurrent ? 'text-emerald-400' : 'text-slate-500'}`} />
                      <span className="truncate text-[11px]">
                        {session.title || 'Untitled Learning'}
                      </span>
                    </div>

                    <button
                      onClick={(e) => onDeleteSession(session.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:text-rose-400 transition-opacity"
                      title="Delete chat"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 
        Bottom Area: Profile with username with image
        Requirement 15: Remove the border added to the profile, no need of border and background color
      */}
      <div className="relative z-10 pt-4 border-t border-[#133027]">
        <button
          onClick={onProfileClick}
          className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-all text-left cursor-pointer group"
          title="Click to view or update profile"
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* User Avatar with Image or Initial */}
            <div className="relative w-9 h-9 rounded-full overflow-hidden bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-inner">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
              )}
              {/* Online indicator dot */}
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 rounded-full border border-[#061210]" />
            </div>

            <div className="min-w-0">
              <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                {user.name}
              </h4>
              <p className="text-[11px] text-emerald-400/90 truncate font-medium">
                {user.year} Year • {user.semester}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {user.course}
              </p>
            </div>
          </div>

          <div className="text-slate-500 group-hover:text-emerald-400 transition-colors flex-shrink-0 pl-1">
            <Settings2 className="w-4 h-4" />
          </div>
        </button>
      </div>
    </aside>
  );
};
