import React, { useState } from 'react';
import {
  X,
  Send,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Calendar,
  Sparkles,
  FileText,
  Award,
  ChevronRight,
  Download,
} from 'lucide-react';
import { VeenaLogo } from './VeenaLogo';

// -------------------------------------------------------------
// 1. CHAT WITH VEENA MODAL
// -------------------------------------------------------------
interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
}) => {
  const [messages, setMessages] = useState<
    Array<{ sender: 'user' | 'veena'; text: string; time: string; sources?: string[] }>
  >([
    {
      sender: 'veena',
      text: "Namaste Surabhi! I am Veena, your learning companion. Ask me any doubt about DBMS, Operating Systems, Computer Networks, or your syllabus!",
      time: 'Just now',
    },
    ...(initialQuery
      ? [
          {
            sender: 'user' as const,
            text: initialQuery,
            time: 'Just now',
          },
          {
            sender: 'veena' as const,
            text: `Here is a detailed explanation for "${initialQuery}":\n\nIn Database Management Systems (DBMS), concurrency control ensures ACID properties. For instance, a Deadlock occurs when two or more transactions are waiting indefinitely for resources held by each other (Circular Wait).\n\nKey Prevention Methods:\n1. Mutual Exclusion & Hold and Wait Prevention\n2. Wait-Die Scheme & Wound-Wait Scheme (Timestamp-based)\n3. Deadlock Detection using Wait-For Graphs (WFG).`,
            time: 'Just now',
            sources: ['Korth DBMS 7th Ed, Ch. 15', 'MSBTE Diploma Syllabus Unit 4'],
          },
        ]
      : []),
  ]);
  const [inputVal, setInputVal] = useState('');

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const query = inputVal.trim();
    const newMsg = {
      sender: 'user' as const,
      text: query,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal('');

    setTimeout(() => {
      let reply = `Great question regarding "${query}"!\n\nHere is a structured explanation broken down according to exam marks schema:\n\n• Core Definition & Principle\n• Step-by-step example with diagram concept\n• Key advantages and common exam pitfalls to avoid.`;
      let sources = ['Computer Engineering Diploma Curricula', 'Veena Knowledge Base'];

      if (query.toLowerCase().includes('deadlock')) {
        reply = `**Deadlock in DBMS & OS**:\nA deadlock condition occurs when two or more processes/transactions hold a resource and wait for another resource held by other processes in a cyclic manner.\n\n**Four Necessary Conditions (Coffman Conditions)**:\n1. Mutual Exclusion\n2. Hold and Wait\n3. No Preemption\n4. Circular Wait\n\n**How to Answer in 4 Marks Exam**:\nDraw the Resource Allocation Graph (RAG) with a cycle, explain the 4 Coffman conditions, and state detection via Wait-For-Graph (WFG).`;
        sources = ['Galvin Operating System Concepts', 'DBMS Semester Question Bank'];
      } else if (query.toLowerCase().includes('normalization')) {
        reply = `**Database Normalization (1NF to BCNF)**:\nNormalization is the process of organizing data to reduce redundancy and eliminate anomalies (Insertion, Deletion, Update).\n\n• **1NF**: Atomic values, no repeating groups.\n• **2NF**: In 1NF and no partial dependencies (every non-key attribute fully dependent on primary key).\n• **3NF**: In 2NF and no transitive dependency (X -> Y, where Y is non-prime).\n• **BCNF**: For every functional dependency X -> Y, X must be a super key.`;
        sources = ['Ramakrishnan & Gehrke DBMS', 'MSBTE Exam Solutions 2024'];
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'veena',
          text: reply,
          time: 'Just now',
          sources,
        },
      ]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#081814] border border-[#194437] rounded-3xl shadow-2xl flex flex-col h-[600px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#13352a] bg-[#0a1e19]">
          <div className="flex items-center gap-3">
            <VeenaLogo size={36} />
            <div>
              <h3 className="text-base font-semibold text-white">Ask Veena</h3>
              <p className="text-xs text-emerald-400">Always online & ready to help</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-[#112d24] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-wrap ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-sm'
                    : 'bg-[#0f2d24] border border-[#1b4b3b] text-slate-100 rounded-bl-sm shadow-md'
                }`}
              >
                {m.text}
                {m.sources && (
                  <div className="mt-3 pt-2.5 border-t border-emerald-500/20 text-xs text-emerald-300">
                    <span className="font-semibold text-emerald-400">Sources: </span>
                    {m.sources.join(' • ')}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-500 mt-1 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSend}
          className="p-4 border-t border-[#13352a] bg-[#0a1e19] flex items-center gap-3"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type your question or topic (e.g., Explain Deadlock)..."
            className="flex-1 bg-[#061411] border border-[#183d31] rounded-2xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400"
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 flex items-center justify-center transition-all cursor-pointer shadow-md"
          >
            <Send className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 2. QUIZ MODAL
// -------------------------------------------------------------
interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  if (!isOpen) return null;

  const questions = [
    {
      q: 'Which of the following is NOT one of the Coffman conditions for a Deadlock?',
      options: [
        'Mutual Exclusion',
        'Preemption Allowed',
        'Hold and Wait',
        'Circular Wait',
      ],
      correct: 1,
    },
    {
      q: 'In relational algebra, which operator is used for vertical partitioning of a relation?',
      options: ['Selection (σ)', 'Projection (π)', 'Cartesian Product (×)', 'Join (⋈)'],
      correct: 1,
    },
    {
      q: 'Which normal form strictly eliminates transitive dependency?',
      options: ['1NF', '2NF', '3NF', '5NF'],
      correct: 2,
    },
  ];

  const handleSelect = (optionIdx: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentIdx]: optionIdx });
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correct) score++;
    });
    return score;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-[#081814] border border-[#194437] rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-[#13352a]">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-semibold text-white">
              DBMS & OS Practice Quiz
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!showResult ? (
          <div className="py-5">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Question {currentIdx + 1} of {questions.length}</span>
              <span className="text-emerald-400 font-medium">Difficulty: Diploma Standard</span>
            </div>

            <p className="text-sm font-semibold text-slate-100 mb-4 leading-relaxed">
              {questions[currentIdx].q}
            </p>

            <div className="space-y-2.5">
              {questions[currentIdx].options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentIdx] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelect(optIdx)}
                    className={`w-full text-left p-3.5 rounded-2xl border text-sm transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600/30 border-emerald-400 text-white font-medium'
                        : 'bg-[#0d2620] border-[#183e32] text-slate-300 hover:border-emerald-500/50'
                    }`}
                  >
                    <span className="inline-block w-6 text-emerald-400 font-semibold">
                      {String.fromCharCode(65 + optIdx)}.
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentIdx] === undefined}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-semibold text-sm transition-all cursor-pointer"
              >
                {currentIdx === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 mx-auto flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white">Quiz Completed!</h4>
            <p className="text-slate-300 text-sm">
              You scored <span className="text-emerald-400 font-bold text-lg">{calculateScore()} / {questions.length}</span>
            </p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {calculateScore() === questions.length
                ? 'Excellent work! Your fundamental understanding of OS & DBMS concepts is rock solid.'
                : 'Good attempt! Review Normalization and Concurrency Control in the PYQ Analyzer to boost your exam score.'}
            </p>
            <button
              onClick={() => {
                setShowResult(false);
                setCurrentIdx(0);
                setSelectedAnswers({});
              }}
              className="mt-4 px-6 py-2 rounded-xl bg-[#12382e] hover:bg-[#184a3c] text-emerald-300 text-sm font-medium border border-emerald-500/40 cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 3. PYQ ANALYZER MODAL
// -------------------------------------------------------------
interface PYQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PYQModal: React.FC<PYQModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const topics = [
    {
      subject: 'Database Management Systems (DBMS)',
      items: [
        { topic: 'Deadlock Handling & Wait-for Graph', marks: '4 & 8 Marks', freq: 'Asked 6 times in last 5 years', priority: 'High' },
        { topic: '3NF vs BCNF Normalization Numerical', marks: '4 Marks', freq: 'Asked 5 times', priority: 'High' },
        { topic: 'ACID Properties with Transaction State Diagram', marks: '4 Marks', freq: 'Asked 4 times', priority: 'Medium' },
      ],
    },
    {
      subject: 'Operating Systems (OS)',
      items: [
        { topic: 'Round Robin & SJF CPU Scheduling Calculations', marks: '6 Marks', freq: 'Asked in every winter & summer exam', priority: 'High' },
        { topic: 'Producer-Consumer Problem using Semaphores', marks: '4 Marks', freq: 'Asked 4 times', priority: 'Medium' },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#081814] border border-[#194437] rounded-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#13352a]">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-semibold text-white">PYQ Analyzer</h3>
              <p className="text-xs text-emerald-400">Past 5 Years Exam Trends & Weightage</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-6">
          {topics.map((subj, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-sm font-semibold text-emerald-300 tracking-wide uppercase">
                {subj.subject}
              </h4>
              <div className="space-y-2">
                {subj.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="p-3.5 rounded-2xl bg-[#0d2720] border border-[#194236] flex items-center justify-between gap-4"
                  >
                    <div>
                      <h5 className="text-sm font-medium text-slate-100">{item.topic}</h5>
                      <p className="text-xs text-slate-400 mt-0.5">{item.freq}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {item.marks}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 4. STUDY PLAN MODAL
// -------------------------------------------------------------
interface StudyPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudyPlanModal: React.FC<StudyPlanModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const days = [
    { day: 'Day 1 (Completed)', task: 'DBMS Unit 1: ER Diagrams and Relational Model', done: true },
    { day: 'Day 2 (Completed)', task: 'DBMS Unit 2: SQL Joins and Subqueries practice', done: true },
    { day: 'Day 3 (Today)', task: 'DBMS Unit 3: Normalization (1NF, 2NF, 3NF, BCNF)', done: false },
    { day: 'Day 4', task: 'OS Unit 1: Process Management & CPU Scheduling Algorithms', done: false },
    { day: 'Day 5', task: 'OS Unit 2: Process Synchronization & Deadlock resolution', done: false },
    { day: 'Day 6', task: 'Maths: Matrices and Differential Calculus PYQs', done: false },
    { day: 'Day 7', task: 'Comprehensive Full-Length Mock Exam & Doubt Clearance', done: false },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-[#081814] border border-[#194437] rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-[#13352a]">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-semibold text-white">Your 7-Day Study Plan</h3>
              <p className="text-xs text-emerald-400">Personalized for Surabhi Patil</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-2.5 max-h-[60vh] overflow-y-auto">
          {days.map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                item.done
                  ? 'bg-[#08221b]/60 border-[#123d30] opacity-80'
                  : item.day.includes('Today')
                  ? 'bg-[#103328] border-emerald-500/50 shadow-md'
                  : 'bg-[#0a1e19] border-[#153b2f]'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.done ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-emerald-400/50 flex-shrink-0" />
                )}
                <div>
                  <h4 className="text-xs font-semibold text-emerald-300">{item.day}</h4>
                  <p className="text-sm text-slate-200 mt-0.5">{item.task}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 5. NOTIFICATION POPUP
// -------------------------------------------------------------
interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 md:p-8 bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-sm mt-12 bg-[#081814] border border-[#194437] rounded-3xl p-5 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#13352a]">
          <h4 className="text-sm font-semibold text-white">Notifications</h4>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-3 space-y-3">
          <div className="p-3 rounded-2xl bg-[#0c241e] border border-[#173a30] text-xs">
            <p className="font-semibold text-slate-100">DBMS Quiz starts in 3 days</p>
            <p className="text-slate-400 mt-0.5">Apr 25, 2025 at 10:00 AM</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#0c241e] border border-[#173a30] text-xs">
            <p className="font-semibold text-slate-100">Study Plan Generated</p>
            <p className="text-slate-400 mt-0.5">Your 7-day personalized schedule is ready.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
