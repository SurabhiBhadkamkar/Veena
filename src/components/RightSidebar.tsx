import React from 'react';
import {
  Award,
  Layers,
  BookMarked,
  Network,
  ChevronRight,
} from 'lucide-react';

export type RightSidebarOption = 'quiz' | 'flashcards' | 'revision' | 'mindmap';

interface RightSidebarProps {
  onSelectOption: (option: RightSidebarOption) => void;
  activeOption?: RightSidebarOption | null;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  onSelectOption,
  activeOption,
}) => {
  const tools = [
    {
      id: 'quiz' as RightSidebarOption,
      title: 'Generate Quiz',
      description: 'Practice exam questions & test concepts',
      icon: Award,
    },
    {
      id: 'flashcards' as RightSidebarOption,
      title: 'Flashcards',
      description: 'Active recall for terms, definitions & formulas',
      icon: Layers,
    },
    {
      id: 'revision' as RightSidebarOption,
      title: 'Revision',
      description: 'High-yield short notes & formula cheat sheets',
      icon: BookMarked,
    },
    {
      id: 'mindmap' as RightSidebarOption,
      title: 'Mindmap',
      description: 'Visual concept trees & hierarchical diagrams',
      icon: Network,
    },
  ];

  return (
    <aside className="w-full xl:w-72 flex-shrink-0">
      {/* 
        Requirement 11: Add all the study accelerators inside the box means make the border around it
        Requirements 6, 7, 8, 9, 10, 12: 
        Removed Study Accelerators, 4 tools, Interactive, Quick Recall, Exam Notes, Visual Tree
      */}
      <div className="rounded-3xl bg-[#091b17]/95 border border-[#173a30] p-3 sm:p-3.5 space-y-2.5 shadow-xl">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeOption === tool.id;

          return (
            <button
              key={tool.id}
              onClick={() => onSelectOption(tool.id)}
              className={`w-full group text-left p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#103328] border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                  : 'bg-[#061411]/90 hover:bg-[#0c241e] border-[#14352b] hover:border-emerald-500/40'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#12362c] border border-[#1e4c3e] group-hover:border-emerald-400/60 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-all flex-shrink-0 shadow-inner">
                  <Icon className="w-4.5 h-4.5 stroke-[2]" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                    {tool.title}
                  </h4>

                  <p className="text-xs text-slate-400 mt-0.5 leading-snug line-clamp-2">
                    {tool.description}
                  </p>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
