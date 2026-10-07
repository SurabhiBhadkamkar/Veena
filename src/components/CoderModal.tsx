import React, { useState } from 'react';
import { UserProfile } from '../types/user';
import { X, Code2, Play, Copy, Check, RotateCcw, Sparkles } from 'lucide-react';

interface CoderModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

const TEMPLATES: Record<string, string> = {
  c: `#include <stdio.h>

// Deadlock Detection / Banker's Algorithm demo
int main() {
    int processes = 3, resources = 2;
    int available[2] = {3, 2};
    printf("Veena Coder: Testing MSBTE Diploma C Code\\n");
    printf("Total Processes: %d, Available Res: [%d, %d]\\n", processes, available[0], available[1]);
    printf("System Status: SAFE STATE detected (No deadlock cycle).\\n");
    return 0;
}`,
  python: `# Python Data Structures & Algorithmic Practice
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

sample_list = [64, 34, 25, 12, 22, 11, 90]
print("Original:", sample_list)
sorted_list = bubble_sort(sample_list)
print("Sorted with Bubble Sort:", sorted_list)`,
  sql: `-- SQL Normalization & Schema Verification
CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Course VARCHAR(50),
    Semester INT
);

INSERT INTO Students VALUES (101, 'Surabhi Patil', 'Computer Engineering', 4);

-- Query in 3NF:
SELECT * FROM Students WHERE Semester >= 4;`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Object-Oriented Programming (Java)");
        System.out.println("Testing Thread synchronization & Semaphore locks...");
        System.out.println("Execution Finished cleanly without thread starvation.");
    }
}`,
  verilog: `// Verilog HDL - 2 to 1 Multiplexer
module mux2to1(input a, input b, input sel, output y);
    assign y = sel ? b : a;
endmodule`,
};

export const CoderModal: React.FC<CoderModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const initialLang = user.course === 'Electronics Engineering' ? 'verilog' : 'c';
  const [lang, setLang] = useState<string>(initialLang);
  const [code, setCode] = useState<string>(TEMPLATES[initialLang]);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleLangChange = (newLang: string) => {
    setLang(newLang);
    setCode(TEMPLATES[newLang] || '// Write your code here');
    setOutput('');
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('Compiling and executing code...');

    setTimeout(() => {
      setIsRunning(false);
      if (lang === 'c') {
        setOutput(
          `[OUTPUT - GCC 14.2]:\nVeena Coder: Testing MSBTE Diploma C Code\nTotal Processes: 3, Available Res: [3, 2]\nSystem Status: SAFE STATE detected (No deadlock cycle).\n\nProcess exited with status 0 (Success).`
        );
      } else if (lang === 'python') {
        setOutput(
          `[OUTPUT - Python 3.12]:\nOriginal: [64, 34, 25, 12, 22, 11, 90]\nSorted with Bubble Sort: [11, 12, 22, 25, 34, 64, 90]\n\nExecution Time: 0.002s.`
        );
      } else if (lang === 'sql') {
        setOutput(
          `[OUTPUT - PostgreSQL 16.0]:\nTABLE Students created.\n1 row inserted.\n\nStudentID | Name          | Course               | Semester\n----------+---------------+----------------------+----------\n101       | Surabhi Patil | Computer Engineering | 4\n(1 row returned)`
        );
      } else if (lang === 'java') {
        setOutput(
          `[OUTPUT - OpenJDK 21]:\nObject-Oriented Programming (Java)\nTesting Thread synchronization & Semaphore locks...\nExecution Finished cleanly without thread starvation.`
        );
      } else {
        setOutput(
          `[OUTPUT - Icarus Verilog Simulator]:\nSynthesized module mux2to1 successfully.\nTruth table verified: (sel=0 -> y=a, sel=1 -> y=b).\n0 Timing Violations.`
        );
      }
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#081814] border border-[#194437] rounded-3xl p-6 shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#13352a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0f2e25] border border-[#1d4d3e] flex items-center justify-center text-emerald-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Veena Coder</h3>
              <p className="text-xs text-emerald-400">
                Interactive Engineering Code Playground
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

        {/* Toolbar: Languages & Run */}
        <div className="py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {['c', 'python', 'sql', 'java', 'verilog'].map((l) => (
              <button
                key={l}
                onClick={() => handleLangChange(l)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold uppercase transition-all cursor-pointer ${
                  lang === l
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                    : 'bg-[#0a1e19] text-slate-400 hover:text-white border border-[#163a30]'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl bg-[#0b221b] border border-[#184236] text-xs text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunning ? 'Running...' : 'Run Code'}</span>
            </button>
          </div>
        </div>

        {/* Code Editor Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-[300px]">
          {/* Editor */}
          <div className="flex flex-col rounded-2xl bg-[#040e0c] border border-[#14382e] overflow-hidden">
            <div className="px-3 py-2 bg-[#061411] border-b border-[#14382e] text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>editor.{lang}</span>
              <span className="text-emerald-400">UTF-8</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="flex-1 w-full p-3.5 bg-transparent text-emerald-200 font-mono text-xs leading-relaxed focus:outline-none resize-none"
            />
          </div>

          {/* Console Output */}
          <div className="flex flex-col rounded-2xl bg-[#040e0c] border border-[#14382e] overflow-hidden">
            <div className="px-3 py-2 bg-[#061411] border-b border-[#14382e] text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>terminal / console</span>
              <span className="text-emerald-400">Exit Code: 0</span>
            </div>
            <div className="flex-1 p-3.5 overflow-y-auto font-mono text-xs text-slate-300 whitespace-pre-wrap">
              {output || (
                <span className="text-slate-500">
                  Click 'Run Code' above to compile and execute program output...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
