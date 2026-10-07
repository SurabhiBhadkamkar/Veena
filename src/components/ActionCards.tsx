import React from 'react';
import {
  MessageSquare,
  FileText,
  ShieldCheck,
  Calendar,
  BarChart2,
  Folder,
  ChevronRight,
} from 'lucide-react';

export type ActionCardType =
  | 'question'
  | 'pyq'
  | 'quiz'
  | 'study-plan'
  | 'progress'
  | 'resources';

interface ActionCardsProps {
  onSelectAction: (type: ActionCardType) => void;
}

export const ActionCards: React.FC<ActionCardsProps> = ({ onSelectAction }) => {
  const cards = [
    {
      id: 'question' as ActionCardType,
      title: 'Ask a Question',
      description: 'Get instant help with your doubts',
      icon: MessageSquare,
    },
    {
      id: 'pyq' as ActionCardType,
      title: 'PYQ Analyzer',
      description: 'Find important topics & past year questions',
      icon: FileText,
    },
    {
      id: 'quiz' as ActionCardType,
      title: 'Generate Quiz',
      description: 'Test your knowledge',
      icon: ShieldCheck,
    },
    {
      id: 'study-plan' as ActionCardType,
      title: 'Study Plan',
      description: 'Get a personalized study plan',
      icon: Calendar,
    },
    {
      id: 'progress' as ActionCardType,
      title: 'Track Progress',
      description: 'Monitor your learning journey',
      icon: BarChart2,
    },
    {
      id: 'resources' as ActionCardType,
      title: 'Explore Resources',
      description: 'Access notes, syllabus & more',
      icon: Folder,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <button
            key={card.id}
            onClick={() => onSelectAction(card.id)}
            className="group relative flex items-center justify-between p-4 rounded-2xl bg-[#091b17]/90 hover:bg-[#0d241f] border border-[#173a30] hover:border-emerald-500/40 transition-all duration-200 text-left cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
          >
            <div className="flex items-center gap-3.5 min-w-0 pr-2">
              {/* Circular Icon Container */}
              <div className="w-11 h-11 flex-shrink-0 rounded-full bg-[#13372c] border border-[#1f4e3f] group-hover:border-emerald-400/60 flex items-center justify-center text-emerald-400 group-hover:text-emerald-300 group-hover:scale-105 transition-all shadow-[inset_0_1px_4px_rgba(0,0,0,0.3)]">
                <Icon className="w-5 h-5 stroke-[2]" />
              </div>

              {/* Title & Description */}
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-slate-100 group-hover:text-white transition-colors truncate">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-400/90 group-hover:text-slate-300 transition-colors mt-0.5 line-clamp-1">
                  {card.description}
                </p>
              </div>
            </div>

            {/* Right Chevron */}
            <div className="flex-shrink-0 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all">
              <ChevronRight className="w-4 h-4 stroke-[2]" />
            </div>
          </button>
        );
      })}
    </div>
  );
};
