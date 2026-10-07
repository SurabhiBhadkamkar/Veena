/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserProfile, ChatExchange, ChatSession, AttachedDocument } from './types/user';
import { RegistrationFlow } from './components/RegistrationFlow';
import { LeftSidebar } from './components/LeftSidebar';
import { MainArea } from './components/MainArea';
import { RightSidebar, RightSidebarOption } from './components/RightSidebar';
import { ProfileModal } from './components/ProfileModal';
import { SyllabusModal } from './components/SyllabusModal';
import { StudyPlannerModal } from './components/StudyPlannerModal';
import { CoderModal } from './components/CoderModal';
import { RightSidebarModals } from './components/RightSidebarModals';
import { PanelLeftOpen, Menu } from 'lucide-react';

const DEFAULT_USER: UserProfile = {
  email: 'surabhianitigravity@gmail.com',
  name: 'Surabhi Patil',
  course: 'Computer Engineering',
  year: '2nd',
  semester: '4th semester',
  isLoggedIn: true,
  isOnboarded: true,
};

export default function App() {
  // User profile state with localStorage persistence
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem('veena_user_profile');
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return DEFAULT_USER;
  });

  // Sidebar toggle state (Requirement 13 & 14)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Current active navigation on left sidebar
  const [activeLeftNav, setActiveLeftNav] = useState<string>('new-learning');

  // Q&A exchange state: null = show quote + "Ask Anything", object = show oval command + plain answer below
  const [exchange, setExchange] = useState<ChatExchange | null>(null);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Chat History sessions (Requirement 17)
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(() => {
    try {
      const stored = localStorage.getItem('veena_chat_history');
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return [];
  });

  // Modals state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSyllabusOpen, setIsSyllabusOpen] = useState(false);
  const [isStudyPlannerOpen, setIsStudyPlannerOpen] = useState(false);
  const [isCoderOpen, setIsCoderOpen] = useState(false);
  const [activeRightOption, setActiveRightOption] = useState<RightSidebarOption | null>(null);

  // Sync user profile & chat history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('veena_user_profile', JSON.stringify(user));
    } catch {
      // ignore
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('veena_chat_history', JSON.stringify(chatSessions));
    } catch {
      // ignore
    }
  }, [chatSessions]);

  // Handle Command Submission (with optional attached file)
  const handleSendCommand = (command: string, attachedFile?: AttachedDocument) => {
    setIsLoading(true);
    setActiveLeftNav('');

    const newExchange: ChatExchange = {
      id: Date.now().toString(),
      command,
      answer: 'Analyzing syllabus and generating detailed engineering response...',
      timestamp: 'Just now',
      attachedFile,
    };

    setExchange(newExchange);

    setTimeout(() => {
      let generatedAnswer = '';
      const q = command.toLowerCase();

      if (q.includes('deadlock') || q.includes('coffman')) {
        generatedAnswer = `### Deadlock in Operating Systems & Database Management
A Deadlock is a state where a set of processes are blocked because each process is holding a resource and waiting for another resource held by some other process in the set.

**The 4 Coffman Conditions (Must hold simultaneously)**:
1. **Mutual Exclusion**: At least one resource must be non-shareable.
2. **Hold and Wait**: A process is currently holding at least one resource and requesting additional resources being held by others.
3. **No Preemption**: Resources cannot be forcibly confiscated; they can only be released voluntarily by the process holding them.
4. **Circular Wait**: A closed chain of processes exists such that each process holds a resource needed by the next process in the chain (P0 -> P1 -> P2 -> P0).

**How to Score Full Marks in MSBTE Exam**:
• Always sketch the Resource Allocation Graph (RAG) containing a directed cycle.
• State Deadlock Prevention (disallow any 1 of Coffman's conditions).
• State Deadlock Avoidance (Banker's Algorithm to check Safe State).
• State Deadlock Detection (Wait-For Graph reduction algorithm).`;
      } else if (q.includes('normalization') || q.includes('3nf') || q.includes('bcnf')) {
        generatedAnswer = `### Database Normalization (1NF to BCNF)
Normalization is the systematic approach of decomposing tables to eliminate data redundancy and anomalies (Insertion, Deletion, Update).

**Hierarchy of Normal Forms**:
• **1NF (First Normal Form)**:
  - Each column contains atomic (indivisible) values.
  - No repeating groups or multivalued attributes.

• **2NF (Second Normal Form)**:
  - Must already satisfy 1NF.
  - Eliminates Partial Dependency: Every non-prime attribute must be fully functionally dependent on the entire Primary Key.

• **3NF (Third Normal Form)**:
  - Must already satisfy 2NF.
  - Eliminates Transitive Dependency: For any functional dependency X -> Y, either X is a Super Key or Y is a Prime Attribute.

• **BCNF (Boyce-Codd Normal Form)**:
  - Stricter form of 3NF.
  - For every functional dependency X -> Y, X must strictly be a Super Key.

**Example Solved Question (4 Marks)**:
Given relation R(A, B, C, D) with FDs: { A -> B, B -> C, C -> D }.
Candidate Key is A.
Because B -> C and C -> D have non-superkey left sides, R is in 2NF but violates 3NF due to transitive dependencies. Decompose into R1(A, B), R2(B, C), and R3(C, D).`;
      } else if (q.includes('scheduling') || q.includes('round robin')) {
        generatedAnswer = `### CPU Scheduling Algorithms
CPU Scheduling is the process of allocating CPU time to processes in the ready queue to maximize CPU utilization and throughput.

**Core Formulas for Numerical Problems**:
• Turnaround Time (TAT) = Completion Time - Arrival Time
• Waiting Time (WT) = Turnaround Time - Burst Time
• Average WT = (Sum of all WT) / Number of Processes

**Round Robin (RR) Scheduling**:
• Preemptive algorithm specifically tailored for time-sharing systems.
• Each process is given a fixed time slice (Time Quantum 'q').
• If process burst time > q, it is preempted and put back at the tail of the ready queue.
• Advantage: Starvation-free, predictable response time.
• Drawback: High context-switching overhead if the quantum is too short.`;
      } else if (q.includes('thevenin') || q.includes('norton') || q.includes('circuit')) {
        generatedAnswer = `### Thevenin's and Norton's Theorems
**Thevenin’s Theorem Statement**:
Any linear bilateral electrical network containing several energy sources and resistances can be replaced by an equivalent circuit containing a single voltage source (V_th) in series with a single resistance (R_th).

**Step-by-step Calculation Procedure**:
1. Remove the load resistor (R_L) across terminals A and B.
2. Find Open-Circuit Voltage across A-B: This is V_th.
3. Deactivate all independent sources (Short-circuit voltage sources, open-circuit current sources) and calculate resistance looking into terminals A-B: This is R_th.
4. Draw Thevenin Equivalent Circuit with V_th in series with R_th and reconnect R_L.
5. Load Current: I_L = V_th / (R_th + R_L).`;
      } else {
        generatedAnswer = `### Explanation for: "${command}"
${attachedFile ? `*Analyzed uploaded document: ${attachedFile.name} (${(attachedFile.size / 1024).toFixed(1)} KB)*\n\n` : ''}Here is a comprehensive breakdown structured according to the ${user.course} (${user.year} Year • ${user.semester}) syllabus:

**1. Core Definition & Principle**:
In engineering curricula, understanding "${command}" requires examining the underlying theoretical foundations, mathematical formulas, and practical implementation constraints.

**2. Key Structural Components**:
• Component A: Primary input parameters and operating preconditions.
• Component B: Algorithmic transformation, state transitions, or circuit response.
• Component C: Output characteristics, boundary conditions, and performance metrics.

**3. Practical Examination Insight**:
• When answering this in examinations, define the term in 2 concise sentences, provide the canonical block diagram or truth table, and cite the primary advantage and limitation.`;
      }

      const completedExchange: ChatExchange = {
        ...newExchange,
        answer: generatedAnswer,
      };

      setExchange(completedExchange);
      setIsLoading(false);

      // Save/update session in chatSessions history
      const sessionId = activeSessionId || Date.now().toString();
      setActiveSessionId(sessionId);
      const title = command.length > 28 ? command.slice(0, 28) + '...' : command;

      setChatSessions((prev) => {
        const existing = prev.find((s) => s.id === sessionId);
        if (existing) {
          return prev.map((s) =>
            s.id === sessionId ? { ...s, exchanges: [completedExchange] } : s
          );
        } else {
          return [
            {
              id: sessionId,
              title,
              exchanges: [completedExchange],
              createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
            ...prev,
          ];
        }
      });
    }, 500);
  };

  /**
   * Requirement 17:
   * When a user clicks “New Learning +” in Veena, the current conversation is closed
   * and a new, empty chat screen opens. The user can now start a fresh conversation by typing
   * a new question, uploading a file, or using other available features.
   * The previous chat is not deleted; it remains available in the user’s chat history,
   * so the user can open it again later. The new chat starts without the messages from
   * the previous conversation being displayed in the conversation area.
   */
  const handleNewLearning = () => {
    setActiveLeftNav('new-learning');
    // Clear active conversation view to start fresh
    setExchange(null);
    setActiveSessionId(null);
  };

  const handleSelectSession = (session: ChatSession) => {
    setActiveSessionId(session.id);
    setActiveLeftNav('');
    if (session.exchanges.length > 0) {
      setExchange(session.exchanges[0]);
    }
  };

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setChatSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (activeSessionId === sessionId) {
      setExchange(null);
      setActiveSessionId(null);
      setActiveLeftNav('new-learning');
    }
  };

  const handleSignOut = () => {
    setUser({
      ...user,
      isLoggedIn: false,
      isOnboarded: false,
    });
    setIsProfileOpen(false);
    setExchange(null);
    setActiveSessionId(null);
  };

  const handleCompleteRegistration = (newUser: UserProfile) => {
    setUser(newUser);
  };

  // If user is not logged in or onboarded, display Registration & Onboarding page
  if (!user.isLoggedIn || !user.isOnboarded) {
    return (
      <RegistrationFlow
        onComplete={handleCompleteRegistration}
        initialEmail={user.email}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#05110f] text-slate-100 flex flex-col md:flex-row overflow-x-hidden font-sans selection:bg-emerald-500/30 selection:text-emerald-200 relative">
      {/* 
        Requirement 13 & 14: Responsive Left Sidebar 
        - Can be closed with the close symbol inside sidebar
        - When closed, button to reopen sidebar is readily accessible
      */}
      {isSidebarOpen ? (
        <div className="fixed inset-y-0 left-0 z-40 md:relative flex">
          <LeftSidebar
            user={user}
            activeItem={activeLeftNav}
            chatSessions={chatSessions}
            activeSessionId={activeSessionId}
            onNewLearning={handleNewLearning}
            onCheckSyllabus={() => {
              setActiveLeftNav('syllabus');
              setIsSyllabusOpen(true);
            }}
            onStudyPlanner={() => {
              setActiveLeftNav('planner');
              setIsStudyPlannerOpen(true);
            }}
            onCoder={() => {
              setActiveLeftNav('coder');
              setIsCoderOpen(true);
            }}
            onSelectSession={handleSelectSession}
            onDeleteSession={handleDeleteSession}
            onProfileClick={() => setIsProfileOpen(true)}
            onCloseSidebar={() => setIsSidebarOpen(false)}
          />

          {/* Backdrop for mobile */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs md:hidden -z-10"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>
      ) : (
        /* Reopen Sidebar Trigger when collapsed */
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 z-40 p-2.5 rounded-2xl bg-[#091b17] border border-[#173a30] text-emerald-400 hover:text-white hover:bg-[#0c241e] shadow-lg cursor-pointer transition-all"
          title="Open sidebar"
          aria-label="Open sidebar"
        >
          <PanelLeftOpen className="w-5 h-5" />
        </button>
      )}

      {/* 
        MAIN CHAT AREA (BESIDE SIDEBAR)
        - Shows "Ask Anything" with dynamic study quote until a command is entered.
        - As soon as a command is entered, shows the command in an OVAL BOX SHAPE.
        - Directly below: answer related to question with NO BOX, NO BORDER, NO SHAPE.
      */}
      <main className="flex-1 flex flex-col min-w-0 min-h-screen">
        <MainArea
          user={user}
          exchange={exchange}
          onSendCommand={handleSendCommand}
          onResetToNewLearning={handleNewLearning}
          isLoading={isLoading}
        />
      </main>

      {/* 
        RIGHT SIDEBAR:
        Requirement 11: All study accelerators inside the box (border around it)
        Options: Generate quiz, Flashcards, Revision, Mindmap
      */}
      <div className="p-4 sm:p-5 md:p-6 md:pl-0 flex justify-center items-start flex-shrink-0">
        <RightSidebar
          onSelectOption={(option) => setActiveRightOption(option)}
          activeOption={activeRightOption}
        />
      </div>

      {/* MODALS */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onUpdateUser={(updated) => setUser(updated)}
        onSignOut={handleSignOut}
      />

      <SyllabusModal
        isOpen={isSyllabusOpen}
        onClose={() => setIsSyllabusOpen(false)}
        user={user}
      />

      <StudyPlannerModal
        isOpen={isStudyPlannerOpen}
        onClose={() => setIsStudyPlannerOpen(false)}
        user={user}
      />

      <CoderModal
        isOpen={isCoderOpen}
        onClose={() => setIsCoderOpen(false)}
        user={user}
      />

      <RightSidebarModals
        activeOption={activeRightOption}
        onClose={() => setActiveRightOption(null)}
        user={user}
      />
    </div>
  );
}
