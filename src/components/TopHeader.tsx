import React, { useState } from 'react';
import {
  Search,
  Bell,
  Moon,
  ChevronDown,
  User,
  Menu,
} from 'lucide-react';

interface TopHeaderProps {
  onSearch: (searchTerm: string) => void;
  onNotificationsClick: () => void;
  onProfileClick: () => void;
  onToggleMobileMenu: () => void;
  unreadCount?: number;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onSearch,
  onNotificationsClick,
  onProfileClick,
  onToggleMobileMenu,
  unreadCount = 2,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
    }
  };

  return (
    <header className="w-full flex items-center justify-between gap-3 md:gap-6 py-4 px-4 md:px-8 select-none">
      {/* Mobile Menu Button (visible on mobile only) */}
      <button
        onClick={onToggleMobileMenu}
        className="md:hidden p-2 rounded-xl bg-[#091c18] border border-[#173a30] text-slate-300 hover:text-white"
        aria-label="Toggle navigation menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 max-w-2xl relative flex items-center"
      >
        <div className="absolute left-4 text-slate-400 pointer-events-none">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="Search subjects, topics, or ask Veena..."
          className="w-full h-11 pl-11 pr-4 rounded-2xl bg-[#091b17] border border-[#173a30] hover:border-emerald-500/40 focus:border-emerald-400 text-sm text-slate-100 placeholder-slate-400/80 focus:outline-none transition-all shadow-inner"
        />
      </form>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        {/* Notification Bell */}
        <button
          onClick={onNotificationsClick}
          className="relative p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-[#0c241e] transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
          )}
        </button>

        {/* Theme Toggle (Moon) */}
        <button
          className="p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-[#0c241e] transition-colors cursor-pointer"
          title="Theme Toggle"
        >
          <Moon className="w-5 h-5" />
        </button>

        {/* User Pill */}
        <button
          onClick={onProfileClick}
          className="flex items-center gap-3 p-1.5 pr-2.5 rounded-full md:rounded-2xl hover:bg-[#0c241e] border border-transparent hover:border-[#173a30] transition-all cursor-pointer text-left"
        >
          {/* Avatar Circle */}
          <div className="w-8 h-8 rounded-full bg-emerald-700/60 border border-emerald-400/50 flex items-center justify-center text-emerald-300 flex-shrink-0">
            <User className="w-4 h-4" />
          </div>

          {/* User Name & Details (hidden on very small screens) */}
          <div className="hidden sm:block text-left min-w-0 pr-1">
            <p className="text-xs font-semibold text-slate-100 truncate">
              Surabhi Patil
            </p>
            <p className="text-[11px] text-slate-400 truncate">
              Diploma Student
            </p>
          </div>

          <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
        </button>
      </div>
    </header>
  );
};
