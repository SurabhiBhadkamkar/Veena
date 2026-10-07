import React from 'react';
import {
  Home,
  MessageSquare,
  Calendar,
  FileText,
  ShieldCheck,
  Folder,
  BarChart2,
  User,
  ChevronRight,
  Sprout,
} from 'lucide-react';
import { VeenaLogo } from './VeenaLogo';

export type NavTab =
  | 'home'
  | 'chat'
  | 'study-plan'
  | 'pyq'
  | 'quiz'
  | 'resources'
  | 'progress'
  | 'profile';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onProfileClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  onProfileClick,
}) => {
  const navItems = [
    { id: 'home' as NavTab, label: 'Home', icon: Home },
    { id: 'chat' as NavTab, label: 'Chat with Veena', icon: MessageSquare },
    { id: 'study-plan' as NavTab, label: 'Study Plan', icon: Calendar },
    { id: 'pyq' as NavTab, label: 'PYQ Analyzer', icon: FileText },
    { id: 'quiz' as NavTab, label: 'Quiz', icon: ShieldCheck },
    { id: 'resources' as NavTab, label: 'Resources', icon: Folder },
    { id: 'progress' as NavTab, label: 'Progress', icon: BarChart2 },
    { id: 'profile' as NavTab, label: 'Profile', icon: User },
  ];

  return (
    <aside className="relative w-64 md:w-68 flex-shrink-0 min-h-screen bg-[#061210] border-r border-[#133027] flex flex-col justify-between py-6 px-4 select-none overflow-hidden">
      {/* Background organic topographic wave lines in bottom left */}
      <div className="absolute bottom-0 left-0 w-full h-72 pointer-events-none opacity-40 overflow-hidden">
        <svg
          viewBox="0 0 300 300"
          className="absolute -bottom-10 -left-10 w-[140%] h-[140%]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-20 220 C 60 180, 140 260, 240 210 C 290 190, 320 230, 340 260 L 340 320 L -20 320 Z"
            fill="url(#wave-grad-1)"
          />
          <path
            d="M-20 250 C 40 220, 120 290, 200 240 C 260 210, 300 260, 340 280 L 340 320 L -20 320 Z"
            fill="url(#wave-grad-2)"
          />
          <path
            d="M-20 280 C 50 260, 100 300, 180 270 C 230 250, 280 290, 340 300 L 340 320 L -20 320 Z"
            fill="url(#wave-grad-3)"
          />
          <defs>
            <linearGradient id="wave-grad-1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#047857" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#064e3b" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="wave-grad-2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#047857" stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="wave-grad-3" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#065f46" stopOpacity="0.04" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10">
        {/* Logo Section */}
        <div className="flex items-center gap-3.5 px-2 mb-8">
          <VeenaLogo size={44} />
          <div>
            <h1 className="text-xl font-extrabold tracking-wider text-white">
              VEENA
            </h1>
            <p className="text-[11px] font-medium text-emerald-400/90 tracking-tight">
              Your Learning Companion
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 cursor-pointer text-left ${
                  isActive
                    ? 'bg-[#123c31] text-white shadow-[0_2px_12px_rgba(16,185,129,0.15)] border-l-2 border-emerald-400'
                    : 'text-slate-300 hover:text-white hover:bg-[#0c241e]'
                }`}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 transition-colors ${
                    isActive ? 'text-emerald-400' : 'text-slate-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: User profile & motivational note */}
      <div className="relative z-10 space-y-5 pt-6">
        {/* Mini User Profile Card */}
        <button
          onClick={onProfileClick}
          className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-[#0a1e19]/90 hover:bg-[#0e2721] border border-[#173a30] hover:border-emerald-500/40 transition-all text-left cursor-pointer group"
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-emerald-600/40 border border-emerald-400/50 flex items-center justify-center text-emerald-300 flex-shrink-0">
              <User className="w-5 h-5" />
            </div>

            <div className="min-w-0">
              <h4 className="text-xs font-semibold text-white group-hover:text-emerald-300 transition-colors truncate">
                Surabhi Patil
              </h4>
              <p className="text-[11px] text-slate-400 truncate">
                Diploma Student
              </p>
            </div>
          </div>

          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
        </button>

        {/* Motivational Quote */}
        <div className="px-2">
          <div className="flex items-center gap-2 mb-1.5 text-emerald-400">
            <Sprout className="w-4 h-4" />
          </div>
          <p className="text-xs text-slate-300/90 leading-relaxed font-normal">
            Small steps every day bring big results.
          </p>
          <div className="w-7 h-0.5 bg-amber-400/90 rounded-full mt-2" />
        </div>
      </div>
    </aside>
  );
};
