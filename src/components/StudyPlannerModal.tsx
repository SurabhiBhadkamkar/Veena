import React, { useState } from 'react';
import { UserProfile } from '../types/user';
import { X, Calendar, CheckCircle2, Clock, Plus, Trash2 } from 'lucide-react';

interface StudyPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

interface PlanItem {
  id: string;
  day: string;
  topic: string;
  duration: string;
  completed: boolean;
}

export const StudyPlannerModal: React.FC<StudyPlannerModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const [plans, setPlans] = useState<PlanItem[]>([
    {
      id: '1',
      day: 'Monday',
      topic: `${user.course === 'Electronics Engineering' ? 'Signals & Systems: Fourier Transforms' : 'DBMS: Normalization 1NF to BCNF practice'}`,
      duration: '2 Hours',
      completed: true,
    },
    {
      id: '2',
      day: 'Tuesday',
      topic: `${user.course === 'Electronics Engineering' ? 'Linear ICs: Op-Amp 741 derivations' : 'OS: Deadlock Coffman conditions & Wait-for-graphs'}`,
      duration: '1.5 Hours',
      completed: true,
    },
    {
      id: '3',
      day: 'Wednesday (Today)',
      topic: 'Past Year Exam Questions (4-Mark & 8-Mark Numerical)',
      duration: '2.5 Hours',
      completed: false,
    },
    {
      id: '4',
      day: 'Thursday',
      topic: 'Active Recall Flashcards & Formula Revision',
      duration: '1 Hour',
      completed: false,
    },
    {
      id: '5',
      day: 'Friday',
      topic: 'Full Subject Mock Quiz & Doubt Clarification with Veena',
      duration: '2 Hours',
      completed: false,
    },
  ]);

  const [newTopic, setNewTopic] = useState('');
  const [newDay, setNewDay] = useState('Saturday');

  if (!isOpen) return null;

  const toggleComplete = (id: string) => {
    setPlans(
      plans.map((p) => (p.id === id ? { ...p, completed: !p.completed } : p))
    );
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim()) return;
    setPlans([
      ...plans,
      {
        id: Date.now().toString(),
        day: newDay,
        topic: newTopic.trim(),
        duration: '1.5 Hours',
        completed: false,
      },
    ]);
    setNewTopic('');
  };

  const handleDelete = (id: string) => {
    setPlans(plans.filter((p) => p.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#081814] border border-[#194437] rounded-3xl p-6 sm:p-7 shadow-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#13352a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0f2e25] border border-[#1d4d3e] flex items-center justify-center text-emerald-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Study Planner</h3>
              <p className="text-xs text-emerald-400">
                Personalized for {user.name} ({user.semester})
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

        {/* Add Plan item */}
        <form onSubmit={handleAdd} className="py-4 flex gap-2">
          <select
            value={newDay}
            onChange={(e) => setNewDay(e.target.value)}
            className="bg-[#051411] border border-[#163a30] text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-400"
          >
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
          </select>
          <input
            type="text"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            placeholder="Add new study goal or revision topic..."
            className="flex-1 bg-[#051411] border border-[#163a30] text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </form>

        {/* Schedule List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {plans.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                item.completed
                  ? 'bg-[#061512]/60 border-[#123328] opacity-75'
                  : 'bg-[#0a201b] border-[#184236]'
              }`}
            >
              <div
                className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
                onClick={() => toggleComplete(item.id)}
              >
                {item.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-emerald-400/50 flex-shrink-0" />
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-400">
                      {item.day}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.duration}
                    </span>
                  </div>
                  <p
                    className={`text-xs mt-0.5 truncate ${
                      item.completed
                        ? 'line-through text-slate-500'
                        : 'text-slate-200 font-medium'
                    }`}
                  >
                    {item.topic}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
