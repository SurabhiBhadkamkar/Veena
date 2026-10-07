import React, { useState } from 'react';
import { UserProfile } from '../types/user';
import { RightSidebarOption } from './RightSidebar';
import {
  X,
  Award,
  Layers,
  BookMarked,
  Network,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface RightSidebarModalsProps {
  activeOption: RightSidebarOption | null;
  onClose: () => void;
  user: UserProfile;
}

export const RightSidebarModals: React.FC<RightSidebarModalsProps> = ({
  activeOption,
  onClose,
  user,
}) => {
  if (!activeOption) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      {activeOption === 'quiz' && <QuizGenerator user={user} onClose={onClose} />}
      {activeOption === 'flashcards' && <FlashcardsView user={user} onClose={onClose} />}
      {activeOption === 'revision' && <RevisionNotesView user={user} onClose={onClose} />}
      {activeOption === 'mindmap' && <MindmapView user={user} onClose={onClose} />}
    </div>
  );
};

// -------------------------------------------------------------
// 1. QUIZ GENERATOR
// -------------------------------------------------------------
const QuizGenerator: React.FC<{ user: UserProfile; onClose: () => void }> = ({
  user,
  onClose,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const questions =
    user.course === 'Electronics Engineering'
      ? [
          {
            q: 'Which theorem states that any linear bilateral network can be replaced by an equivalent voltage source in series with an impedance?',
            opts: ['Norton’s Theorem', 'Thevenin’s Theorem', 'Superposition Theorem', 'Maximum Power Transfer'],
            correct: 1,
          },
          {
            q: 'In an Op-Amp 741, what is the ideal Common Mode Rejection Ratio (CMRR)?',
            opts: ['Zero', 'Unity', 'Infinite', '100 dB'],
            correct: 2,
          },
          {
            q: 'Which logic family provides the lowest power dissipation?',
            opts: ['TTL', 'ECL', 'CMOS', 'RTL'],
            correct: 2,
          },
        ]
      : [
          {
            q: 'Which condition is NOT one of the Coffman conditions required for a Deadlock?',
            opts: ['Mutual Exclusion', 'Hold and Wait', 'Preemption Allowed', 'Circular Wait'],
            correct: 2,
          },
          {
            q: 'In database normalization, which normal form eliminates transitive dependency?',
            opts: ['1NF', '2NF', '3NF', 'BCNF'],
            correct: 2,
          },
          {
            q: 'Which CPU scheduling algorithm is inherently preemptive and uses a time quantum?',
            opts: ['FCFS', 'SJF Non-preemptive', 'Round Robin', 'Priority Non-preemptive'],
            correct: 2,
          },
        ];

  const handleSelect = (idx: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentIdx]: idx });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correct) score++;
    });
    return score;
  };

  return (
    <div className="relative w-full max-w-xl bg-[#081814] border border-[#194437] rounded-3xl p-6 shadow-2xl">
      <div className="flex items-center justify-between pb-4 border-b border-[#13352a]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Generate Quiz</h3>
            <p className="text-xs text-emerald-400">{user.course} • {user.semester}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {!submitted ? (
        <div className="py-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Question {currentIdx + 1} of {questions.length}</span>
            <span className="text-emerald-400 font-mono">MSBTE Exam Bank</span>
          </div>

          <h4 className="text-sm font-semibold text-white mb-4 leading-relaxed">
            {questions[currentIdx].q}
          </h4>

          <div className="space-y-2.5">
            {questions[currentIdx].opts.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentIdx] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelect(optIdx)}
                  className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600/30 border-emerald-400 text-white font-semibold'
                      : 'bg-[#0a1e19] border-[#163a30] text-slate-300 hover:border-emerald-500/50'
                  }`}
                >
                  <span className="font-bold text-emerald-400 mr-2.5">
                    {String.fromCharCode(65 + optIdx)}.
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => setCurrentIdx((c) => Math.max(0, c - 1))}
              disabled={currentIdx === 0}
              className="text-xs text-slate-400 hover:text-white disabled:opacity-30"
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (currentIdx === questions.length - 1) {
                  setSubmitted(true);
                } else {
                  setCurrentIdx((c) => c + 1);
                }
              }}
              disabled={selectedAnswers[currentIdx] === undefined}
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              {currentIdx === questions.length - 1 ? 'Submit Answers' : 'Next'}
            </button>
          </div>
        </div>
      ) : (
        <div className="py-6 text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
            <Award className="w-7 h-7" />
          </div>
          <h4 className="text-lg font-bold text-white">Quiz Result</h4>
          <p className="text-sm text-slate-300">
            You scored <span className="text-emerald-400 font-bold text-base">{calculateScore()} / {questions.length}</span>
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setCurrentIdx(0);
              setSelectedAnswers({});
            }}
            className="mt-3 px-5 py-2 rounded-xl bg-[#12382f] text-emerald-300 border border-emerald-500/30 text-xs font-semibold"
          >
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// 2. FLASHCARDS
// -------------------------------------------------------------
const FlashcardsView: React.FC<{ user: UserProfile; onClose: () => void }> = ({
  user,
  onClose,
}) => {
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const cards = [
    {
      term: 'Coffman Conditions (Deadlock)',
      definition: '1. Mutual Exclusion\n2. Hold & Wait\n3. No Preemption\n4. Circular Wait\n(All 4 must hold simultaneously for deadlock to occur).',
    },
    {
      term: '3NF (Third Normal Form)',
      definition: 'A relation is in 3NF if it is in 2NF and no non-prime attribute is transitively dependent on the primary key (X -> Y: either X is super key or Y is prime).',
    },
    {
      term: 'Thevenin Equivalent Circuit',
      definition: 'V_th is open-circuit voltage across terminals, and R_th is the equivalent resistance viewed from terminals with independent sources turned off.',
    },
    {
      term: 'ACID Properties in DBMS',
      definition: 'Atomicity (All or nothing), Consistency (State valid), Isolation (Concurrent transparency), Durability (Committed updates persist).',
    },
  ];

  const currentCard = cards[cardIdx];

  const nextCard = () => {
    setFlipped(false);
    setCardIdx((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setFlipped(false);
    setCardIdx((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="relative w-full max-w-xl bg-[#081814] border border-[#194437] rounded-3xl p-6 shadow-2xl">
      <div className="flex items-center justify-between pb-4 border-b border-[#13352a]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Active Recall Flashcards</h3>
            <p className="text-xs text-emerald-400">Card {cardIdx + 1} of {cards.length}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="py-6 flex flex-col items-center">
        {/* Flip Card */}
        <div
          onClick={() => setFlipped(!flipped)}
          className="w-full h-56 rounded-3xl bg-gradient-to-br from-[#0c2820] to-[#071914] border-2 border-emerald-400/40 p-6 flex flex-col items-center justify-center text-center cursor-pointer shadow-lg hover:border-emerald-400 transition-all select-none"
        >
          <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-2">
            {flipped ? 'Definition (Answer)' : 'Question / Concept (Click to flip)'}
          </span>
          <p className="text-base sm:text-lg font-bold text-white whitespace-pre-line leading-relaxed">
            {flipped ? currentCard.definition : currentCard.term}
          </p>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-between w-full">
          <button
            onClick={prevCard}
            className="p-2 rounded-xl bg-[#0a1e19] border border-[#163a30] text-slate-300 hover:text-white flex items-center gap-1 text-xs cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </button>
          <button
            onClick={() => setFlipped(!flipped)}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            Flip Card ⟳
          </button>
          <button
            onClick={nextCard}
            className="p-2 rounded-xl bg-[#0a1e19] border border-[#163a30] text-slate-300 hover:text-white flex items-center gap-1 text-xs cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 3. REVISION NOTES
// -------------------------------------------------------------
const RevisionNotesView: React.FC<{ user: UserProfile; onClose: () => void }> = ({
  user,
  onClose,
}) => {
  return (
    <div className="relative w-full max-w-2xl bg-[#081814] border border-[#194437] rounded-3xl p-6 shadow-2xl max-h-[85vh] flex flex-col">
      <div className="flex items-center justify-between pb-4 border-b border-[#13352a]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <BookMarked className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Revision Quick Notes</h3>
            <p className="text-xs text-emerald-400">{user.course} • High Yield Exam Cheat Sheet</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 text-xs sm:text-sm text-slate-300">
        <div className="p-4 rounded-2xl bg-[#0a201a] border border-[#173d32] space-y-2">
          <h4 className="font-bold text-emerald-300 text-sm">
            1. Operating Systems: CPU Scheduling Formulas
          </h4>
          <p>• Turnaround Time (TAT) = Completion Time - Arrival Time</p>
          <p>• Waiting Time (WT) = Turnaround Time - Burst Time</p>
          <p>• Response Time = Time when CPU is first allocated - Arrival Time</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0a201a] border border-[#173d32] space-y-2">
          <h4 className="font-bold text-emerald-300 text-sm">
            2. DBMS: Normal Forms Fast Check
          </h4>
          <p>• 1NF: Atomic values only, eliminate duplicate columns.</p>
          <p>• 2NF: In 1NF + No partial dependency (Non-prime attribute dependent on a subset of candidate key).</p>
          <p>• 3NF: In 2NF + No transitive dependencies (FD X &rarr; Y requires X is superkey or Y is prime).</p>
          <p>• BCNF: For every FD X &rarr; Y, X must strictly be a Super Key.</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0a201a] border border-[#173d32] space-y-2">
          <h4 className="font-bold text-emerald-300 text-sm">
            3. Computer Networks: OSI 7-Layer Protocol Stack
          </h4>
          <p>• Layer 7 (Application): HTTP, DNS, SMTP, FTP</p>
          <p>• Layer 4 (Transport): TCP (connection-oriented), UDP (connectionless)</p>
          <p>• Layer 3 (Network): IPv4/IPv6, ICMP, Routing (OSPF, BGP)</p>
          <p>• Layer 2 (Data Link): Ethernet, MAC Addressing, Switches</p>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 4. MINDMAP VIEW
// -------------------------------------------------------------
const MindmapView: React.FC<{ user: UserProfile; onClose: () => void }> = ({
  user,
  onClose,
}) => {
  return (
    <div className="relative w-full max-w-3xl bg-[#081814] border border-[#194437] rounded-3xl p-6 shadow-2xl max-h-[85vh] flex flex-col">
      <div className="flex items-center justify-between pb-4 border-b border-[#13352a]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Visual Concept Mindmap</h3>
            <p className="text-xs text-emerald-400">Hierarchical Map of Core Syllabus</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-6">
        <div className="space-y-6">
          {/* Root node */}
          <div className="text-center">
            <div className="inline-block px-5 py-2.5 rounded-full bg-emerald-500 text-slate-950 font-extrabold text-sm shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              {user.course} ({user.semester})
            </div>
            <div className="w-0.5 h-6 bg-emerald-500/50 mx-auto" />
          </div>

          {/* Tier 1 Branches */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Branch 1 */}
            <div className="p-4 rounded-2xl bg-[#0a201b] border border-[#173f33] space-y-2 text-center">
              <span className="font-bold text-emerald-300 text-xs uppercase tracking-wider">
                Core Systems
              </span>
              <div className="space-y-1 text-xs text-slate-300 pt-1">
                <p className="p-1.5 rounded-lg bg-[#051411]">Process Management</p>
                <p className="p-1.5 rounded-lg bg-[#051411]">Memory & Paging</p>
                <p className="p-1.5 rounded-lg bg-[#051411]">Deadlock Prevention</p>
              </div>
            </div>

            {/* Branch 2 */}
            <div className="p-4 rounded-2xl bg-[#0a201b] border border-[#173f33] space-y-2 text-center">
              <span className="font-bold text-emerald-300 text-xs uppercase tracking-wider">
                Data & Storage
              </span>
              <div className="space-y-1 text-xs text-slate-300 pt-1">
                <p className="p-1.5 rounded-lg bg-[#051411]">Relational Schemas</p>
                <p className="p-1.5 rounded-lg bg-[#051411]">1NF, 2NF, 3NF, BCNF</p>
                <p className="p-1.5 rounded-lg bg-[#051411]">ACID Transactions</p>
              </div>
            </div>

            {/* Branch 3 */}
            <div className="p-4 rounded-2xl bg-[#0a201b] border border-[#173f33] space-y-2 text-center">
              <span className="font-bold text-emerald-300 text-xs uppercase tracking-wider">
                Networking / Circuits
              </span>
              <div className="space-y-1 text-xs text-slate-300 pt-1">
                <p className="p-1.5 rounded-lg bg-[#051411]">OSI Model & TCP/IP</p>
                <p className="p-1.5 rounded-lg bg-[#051411]">Subnetting & Routing</p>
                <p className="p-1.5 rounded-lg bg-[#051411]">Packet Switching</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
