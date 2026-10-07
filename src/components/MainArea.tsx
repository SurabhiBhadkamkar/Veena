import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, STUDY_QUOTES, ChatExchange, AttachedDocument } from '../types/user';
import {
  Send,
  Plus,
  RefreshCw,
  Copy,
  Check,
  FileText,
  X,
  Paperclip,
} from 'lucide-react';

interface MainAreaProps {
  user: UserProfile;
  exchange: ChatExchange | null;
  onSendCommand: (command: string, attachedFile?: AttachedDocument) => void;
  onResetToNewLearning: () => void;
  isLoading: boolean;
}

export const MainArea: React.FC<MainAreaProps> = ({
  user,
  exchange,
  onSendCommand,
  onResetToNewLearning,
  isLoading,
}) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [inputText, setInputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [attachedFile, setAttachedFile] = useState<AttachedDocument | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const followUpFileInputRef = useRef<HTMLInputElement>(null);

  // Pick random quote on mount
  useEffect(() => {
    const randomIdx = Math.floor(Math.random() * STUDY_QUOTES.length);
    setQuoteIndex(randomIdx);
  }, []);

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % STUDY_QUOTES.length);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile({
        name: file.name,
        size: file.size,
        type: file.type || 'document',
      });
    }
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (followUpFileInputRef.current) followUpFileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!inputText.trim() && !attachedFile) || isLoading) return;

    const commandText = inputText.trim() || `Analyze uploaded document: ${attachedFile?.name}`;
    onSendCommand(commandText, attachedFile || undefined);

    setInputText('');
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (followUpFileInputRef.current) followUpFileInputRef.current.value = '';
  };

  const handleCopyAnswer = () => {
    if (exchange?.answer) {
      navigator.clipboard.writeText(exchange.answer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen px-4 sm:px-6 md:px-10 py-6 max-w-4xl mx-auto w-full">
      {/* Hidden file input for uploading documents from laptop */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,.c,.cpp,.py,.java,.sql,.json,image/*"
      />
      <input
        type="file"
        ref={followUpFileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,.c,.cpp,.py,.java,.sql,.json,image/*"
      />

      {/* 
        STATE A: NO COMMAND ENTERED YET
        Requirements:
        1. Remove text Daily Study Motivation
        2. Remove text Ready for your Computer Engineering...
        3. Remove small dash below quote
        4. Remove text Ask Anything (heading)
        5. Placeholder is only "Ask Anything" with + sign before it to add documents
      */}
      {!exchange ? (
        <div className="flex-1 flex flex-col justify-center items-center text-center my-auto py-8 animate-fadeIn">
          {/* Dynamic Study Quote (Changes every time / with subtle shuffle icon) */}
          <div className="max-w-2xl mb-8 group relative px-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              <button
                onClick={handleNextQuote}
                className="p-1 rounded-full text-slate-500 hover:text-emerald-400 hover:bg-[#0c2720] transition-all cursor-pointer"
                title="Change Quote"
              >
                <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>

            <p className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-100 italic leading-relaxed tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              {STUDY_QUOTES[quoteIndex]}
            </p>
          </div>

          {/* Document Attachment Preview Badge (if file attached) */}
          {attachedFile && (
            <div className="mb-3 max-w-2xl w-full flex justify-start">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0e2c24] border border-emerald-500/40 text-emerald-200 text-xs">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-medium truncate max-w-xs">{attachedFile.name}</span>
                <span className="text-[10px] text-slate-400">
                  ({(attachedFile.size / 1024).toFixed(1)} KB)
                </span>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="p-0.5 hover:text-white transition-colors cursor-pointer"
                  title="Remove document"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Central Input Box with + Sign before input and placeholder 'Ask Anything' */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl relative flex items-center bg-[#081b16] border border-[#1b483c] hover:border-emerald-500/50 focus-within:border-emerald-400 rounded-3xl p-1.5 pl-2.5 sm:pl-3 shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-all"
          >
            {/* + Sign to add documents from the laptop (Requirement 5) */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-8.5 h-8.5 rounded-full bg-[#0d2821] hover:bg-[#12382e] border border-[#1b4a3c] hover:border-emerald-400 text-emerald-400 hover:text-white flex items-center justify-center transition-all cursor-pointer flex-shrink-0 mr-2"
              title="Add documents from laptop"
              aria-label="Add documents from laptop"
            >
              <Plus className="w-4.5 h-4.5 stroke-[2.5]" />
            </button>

            {/* Placeholder is strictly 'Ask Anything' (Requirement 5) */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Anything"
              autoFocus
              className="flex-1 bg-transparent text-sm sm:text-base text-slate-100 placeholder-slate-400 focus:outline-none pr-3"
            />

            <button
              type="submit"
              disabled={(!inputText.trim() && !attachedFile) || isLoading}
              className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500 text-slate-950 flex items-center justify-center transition-all cursor-pointer shadow-md flex-shrink-0"
              title="Submit command"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>
        </div>
      ) : (
        /* 
          STATE B: COMMAND HAS BEEN ENTERED
          1. Shows entered command in an OVAL BOX SHAPE
          2. Directly below: answer related to question with NO BOX, NO BORDER, NO SHAPE
        */
        <div className="flex-1 flex flex-col justify-between py-4 animate-fadeIn">
          <div className="space-y-6">
            {/* 1. ENTERED COMMAND IN OVAL BOX SHAPE */}
            <div className="flex flex-col items-start gap-2">
              <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#0d2e24] border border-emerald-400/50 shadow-[0_0_18px_rgba(16,185,129,0.25)] text-white text-sm sm:text-base font-semibold max-w-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <span className="truncate">{exchange.command}</span>
              </div>

              {/* Attached file chip if present */}
              {exchange.attachedFile && (
                <div className="inline-flex items-center gap-1.5 text-xs text-emerald-300/90 pl-3">
                  <Paperclip className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Attached: {exchange.attachedFile.name}</span>
                </div>
              )}
            </div>

            {/* 
              2. ANSWER RELATED TO THE QUESTION 
              CRITICAL: NO BOX, NO BORDER, NO CONTAINER SHAPE
              Pure clean text, typography, headings, code, and bullet points.
            */}
            <div className="pt-2 text-slate-100">
              {isLoading ? (
                <div className="flex items-center gap-3 text-emerald-400 py-6">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-sm font-medium">
                    Veena is analyzing and preparing answer...
                  </span>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Action row (Copy, New Learning) */}
                  <div className="flex items-center justify-end gap-3 pb-2 text-xs text-slate-400">
                    <button
                      onClick={handleCopyAnswer}
                      className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                      onClick={onResetToNewLearning}
                      className="hover:text-emerald-300 transition-colors cursor-pointer flex items-center gap-1 text-emerald-400"
                    >
                      <span>New Learning</span>
                    </button>
                  </div>

                  {/* Pure Typography Output (No card, no background box, no borders) */}
                  <div className="text-slate-200 text-sm sm:text-base leading-relaxed space-y-3 font-normal">
                    {exchange.answer.split('\n\n').map((paragraph, pIdx) => {
                      if (paragraph.startsWith('### ') || paragraph.startsWith('## ')) {
                        return (
                          <h3
                            key={pIdx}
                            className="text-lg font-bold text-emerald-300 pt-2"
                          >
                            {paragraph.replace(/^#+\s/, '')}
                          </h3>
                        );
                      }
                      if (paragraph.startsWith('**') && paragraph.includes('**:\n')) {
                        const parts = paragraph.split('**:\n');
                        return (
                          <div key={pIdx} className="space-y-1">
                            <h4 className="font-bold text-white text-base">
                              {parts[0].replace(/\*\*/g, '')}
                            </h4>
                            <p className="text-slate-300">{parts[1]}</p>
                          </div>
                        );
                      }
                      if (paragraph.startsWith('```')) {
                        const codeContent = paragraph.replace(/```[a-z]*\n?/, '').replace(/```$/, '');
                        return (
                          <pre
                            key={pIdx}
                            className="p-4 rounded-xl bg-[#030c0a] text-emerald-300 font-mono text-xs overflow-x-auto my-2"
                          >
                            <code>{codeContent}</code>
                          </pre>
                        );
                      }
                      return (
                        <p key={pIdx} className="whitespace-pre-line text-slate-200">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Follow-up question bar at bottom with + sign for document attachment */}
          <div className="pt-8 mt-6">
            {attachedFile && (
              <div className="mb-2 flex justify-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#0e2c24] border border-emerald-500/40 text-emerald-200 text-xs">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-medium truncate max-w-xs">{attachedFile.name}</span>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="p-0.5 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="w-full relative flex items-center bg-[#081b16] border border-[#1b483c] hover:border-emerald-500/50 focus-within:border-emerald-400 rounded-3xl p-1.5 pl-2.5 sm:pl-3 shadow-lg transition-all"
            >
              {/* + Sign to add documents from laptop */}
              <button
                type="button"
                onClick={() => followUpFileInputRef.current?.click()}
                className="w-8.5 h-8.5 rounded-full bg-[#0d2821] hover:bg-[#12382e] border border-[#1b4a3c] hover:border-emerald-400 text-emerald-400 hover:text-white flex items-center justify-center transition-all cursor-pointer flex-shrink-0 mr-2"
                title="Add documents from laptop"
                aria-label="Add documents from laptop"
              >
                <Plus className="w-4.5 h-4.5 stroke-[2.5]" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Anything"
                className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-none pr-3"
              />

              <button
                type="submit"
                disabled={(!inputText.trim() && !attachedFile) || isLoading}
                className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 flex items-center justify-center transition-all cursor-pointer shadow-md flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
