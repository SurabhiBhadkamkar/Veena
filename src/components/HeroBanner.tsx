import React, { useState } from 'react';
import { MessageSquare, ChevronRight } from 'lucide-react';
import { VeenaIllustration } from './VeenaIllustration';

interface HeroBannerProps {
  onAskVeena: (query: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onAskVeena }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onAskVeena(query.trim());
      setQuery('');
    } else {
      onAskVeena('How can I optimize my study plan for exams?');
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0a1e1a] via-[#0d2720] to-[#0c2e25] border border-[#1b463a]/80 shadow-[0_8px_30px_rgb(0,0,0,0.35)] p-6 md:p-8">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 z-10">
        {/* Left Text and Search Area */}
        <div className="flex-1 w-full max-w-xl">
          <p className="text-slate-300 text-sm md:text-base font-medium tracking-wide">
            Hello Surabhi!
          </p>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white mt-1.5 tracking-tight flex items-center gap-2">
            <span>Welcome to</span>
            <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]">VEENA</span>
          </h1>

          <p className="text-slate-300/90 text-xs md:text-sm mt-2.5 leading-relaxed max-w-lg">
            Your AI learning assistant is here to help you learn, grow and achieve your goals.
          </p>

          {/* Ask Veena anything search input */}
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex items-center gap-3 bg-[#081814]/90 border border-[#1f4a3d] hover:border-emerald-500/50 transition-colors rounded-2xl px-3.5 py-2 shadow-inner max-w-md"
          >
            <div className="text-emerald-400/90 pl-1">
              <MessageSquare className="w-4 h-4" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask Veena anything..."
              className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-400/70 focus:outline-none"
            />

            <button
              type="submit"
              className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-[#051310] flex items-center justify-center transition-all shadow-[0_0_12px_rgba(16,185,129,0.4)] cursor-pointer"
              title="Submit query"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </form>
        </div>

        {/* Right Veena Illustration */}
        <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-end">
          <VeenaIllustration />
        </div>
      </div>
    </div>
  );
};
