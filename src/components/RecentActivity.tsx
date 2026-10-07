import React from 'react';
import {
  MessageSquare,
  FileText,
  ShieldCheck,
  Calendar,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

export interface ActivityItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  timeAgo: string;
  type: string;
}

interface RecentActivityProps {
  onSelectActivity?: (activity: ActivityItem) => void;
  onViewAll?: () => void;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  onSelectActivity,
  onViewAll,
}) => {
  const activities: ActivityItem[] = [
    {
      id: '1',
      icon: MessageSquare,
      title: 'Asked about Deadlock in DBMS',
      description: 'Veena provided a detailed explanation with relevant sources.',
      timeAgo: '2 hours ago',
      type: 'chat',
    },
    {
      id: '2',
      icon: FileText,
      title: 'Generated 4 Mark Answer - Normalization',
      description: 'Answer generated as per your selected marks and syllabus.',
      timeAgo: '4 hours ago',
      type: 'pyq',
    },
    {
      id: '3',
      icon: ShieldCheck,
      title: 'Completed Quiz - Operating System',
      description: 'You scored 8/10. Great job!',
      timeAgo: 'Yesterday',
      type: 'quiz',
    },
    {
      id: '4',
      icon: Calendar,
      title: 'Study Plan Created',
      description: 'Your personalized 7-day study plan is ready.',
      timeAgo: 'Yesterday',
      type: 'study-plan',
    },
  ];

  return (
    <div className="rounded-3xl bg-[#091b17]/90 border border-[#173a30] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5 px-1">
        <h2 className="text-base font-semibold text-white tracking-wide">
          Recent Activity
        </h2>
        <button
          onClick={onViewAll}
          className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 font-medium cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* List */}
      <div className="divide-y divide-[#133229]/60">
        {activities.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onSelectActivity?.(item)}
              className="group py-3.5 first:pt-2 last:pb-1 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#0c241f]/50 px-2 rounded-xl transition-all"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Circular Badge */}
                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[#13372c] border border-[#1f4e3f] group-hover:border-emerald-400/50 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-all">
                  <Icon className="w-4.5 h-4.5 stroke-[2]" />
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-slate-100 group-hover:text-emerald-300 transition-colors truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400/90 mt-0.5 line-clamp-1">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Time & Arrow */}
              <div className="flex items-center gap-3 flex-shrink-0 pl-2">
                <span className="text-xs text-slate-400/80 hidden sm:inline-block">
                  {item.timeAgo}
                </span>
                <span className="text-xs text-slate-400/80 sm:hidden">
                  {item.timeAgo.replace('hours ago', 'h').replace('Yesterday', '1d')}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
