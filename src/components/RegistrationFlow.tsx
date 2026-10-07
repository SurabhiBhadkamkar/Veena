import React, { useState } from 'react';
import {
  UserProfile,
  CourseType,
  YearType,
  SemesterType,
  YEAR_SEMESTER_MAP,
} from '../types/user';
import { VeenaLogo } from './VeenaLogo';
import { Mail, Key, ShieldCheck, User, GraduationCap, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';

interface RegistrationFlowProps {
  onComplete: (user: UserProfile) => void;
  initialEmail?: string;
}

export const RegistrationFlow: React.FC<RegistrationFlowProps> = ({
  onComplete,
  initialEmail = '',
}) => {
  // Step 1: Auth (email + password OR code)
  // Step 2: Information Onboarding (Name, Course, Year & Semester)
  const [step, setStep] = useState<'auth' | 'onboarding'>('auth');
  const [authMethod, setAuthMethod] = useState<'password' | 'code'>('password');

  // Auth inputs
  const [email, setEmail] = useState(initialEmail || 'surabhianitigravity@gmail.com');
  const [password, setPassword] = useState('veena123');
  const [enteredCode, setEnteredCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [codeSent, setCodeSent] = useState(false);
  const [authError, setAuthError] = useState('');

  // Onboarding inputs
  const [name, setName] = useState('Surabhi Patil');
  const [course, setCourse] = useState<CourseType>('Computer Engineering');
  const [year, setYear] = useState<YearType>('2nd');
  const [semester, setSemester] = useState<SemesterType>('4th semester');

  const handleYearChange = (newYear: YearType) => {
    setYear(newYear);
    // Auto-select first semester of that year
    setSemester(YEAR_SEMESTER_MAP[newYear][0]);
  };

  const handleSendCode = () => {
    if (!email || !email.includes('@')) {
      setAuthError('Please enter a valid email address');
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setCodeSent(true);
    setAuthError('');
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!email || !email.includes('@')) {
      setAuthError('Please enter a valid email address.');
      return;
    }

    if (authMethod === 'password') {
      if (!password || password.length < 4) {
        setAuthError('Please enter a valid password (min 4 characters).');
        return;
      }
      // Success, move to Step 2
      setStep('onboarding');
    } else {
      // Code method
      if (!codeSent) {
        setAuthError('Please click "Send Code" first.');
        return;
      }
      if (enteredCode !== generatedCode) {
        setAuthError('Invalid verification code. Please check the code.');
        return;
      }
      // Success, move to Step 2
      setStep('onboarding');
    }
  };

  const handleOnboardingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }

    const newUser: UserProfile = {
      email,
      name: name.trim(),
      course,
      year,
      semester,
      isLoggedIn: true,
      isOnboarded: true,
    };

    onComplete(newUser);
  };

  return (
    <div className="min-h-screen bg-[#05110f] text-slate-100 flex items-center justify-center p-4 selection:bg-emerald-500/30">
      {/* Background radial decorative glows */}
      <div className="fixed top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 -right-20 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="mb-3">
            <VeenaLogo size={56} />
          </div>
          <h1 className="text-2xl font-extrabold tracking-wider text-white">
            VEENA
          </h1>
          <p className="text-xs text-emerald-400/90 font-medium tracking-wide mt-0.5">
            Your AI Learning Companion
          </p>
        </div>

        {/* Card Container */}
        <div className="rounded-3xl bg-[#091b17]/95 border border-[#173a30] p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md">
          {step === 'auth' ? (
            /* STEP 1: LOGIN / REGISTRATION BY EMAIL */
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  Sign in or Register
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Enter your email address to get started with your personalized dashboard.
                </p>
              </div>

              {/* Method Tabs: Password vs Code */}
              <div className="flex rounded-2xl bg-[#051411] p-1 border border-[#14362d] mb-5">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMethod('password');
                    setAuthError('');
                  }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                    authMethod === 'password'
                      ? 'bg-[#12382f] text-white shadow-sm border border-emerald-400/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Enter Password
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMethod('code');
                    setAuthError('');
                  }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                    authMethod === 'code'
                      ? 'bg-[#12382f] text-white shadow-sm border border-emerald-400/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Send Code to Email
                </button>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {/* Email Input */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-emerald-400 absolute left-3.5 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com"
                      required
                      className="w-full h-11 pl-10 pr-4 rounded-2xl bg-[#051411] border border-[#163a30] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Password Option */}
                {authMethod === 'password' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Password
                    </label>
                    <div className="relative flex items-center">
                      <Key className="w-4 h-4 text-emerald-400 absolute left-3.5 pointer-events-none" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full h-11 pl-10 pr-4 rounded-2xl bg-[#051411] border border-[#163a30] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* Email Code Option */}
                {authMethod === 'code' && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Verification Code
                      </label>
                      <button
                        type="button"
                        onClick={handleSendCode}
                        className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                      >
                        {codeSent ? 'Resend Code' : 'Send Code to Email'}
                      </button>
                    </div>

                    <div className="relative flex items-center">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 absolute left-3.5 pointer-events-none" />
                      <input
                        type="text"
                        maxLength={6}
                        value={enteredCode}
                        onChange={(e) => setEnteredCode(e.target.value)}
                        placeholder="Enter 6-digit code"
                        className="w-full h-11 pl-10 pr-4 rounded-2xl bg-[#051411] border border-[#163a30] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors tracking-widest font-mono"
                      />
                    </div>

                    {codeSent && (
                      <div className="mt-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center justify-between">
                        <span>Code sent to inbox!</span>
                        <span className="font-mono font-bold bg-[#0a231b] px-2 py-0.5 rounded border border-emerald-400/40">
                          {generatedCode}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {authError && (
                  <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-xl">
                    {authError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full h-11 mt-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            /* STEP 2: NECESSARY INFORMATION (NAME, COURSE, YEAR & SEMESTER) */
            <div>
              <div className="mb-5">
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                  Step 2 of 2
                </span>
                <h2 className="text-lg font-bold text-white tracking-wide mt-0.5">
                  Complete Your Student Profile
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Customize your learning companion with your syllabus and academic year.
                </p>
              </div>

              <form onSubmit={handleOnboardingSubmit} className="space-y-4">
                {/* a. Enter Your Name */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    a. Enter Your Name
                  </label>
                  <div className="relative flex items-center">
                    <User className="w-4 h-4 text-emerald-400 absolute left-3.5 pointer-events-none" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Surabhi Patil"
                      required
                      className="w-full h-11 pl-10 pr-4 rounded-2xl bg-[#051411] border border-[#163a30] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>
                </div>

                {/* b. Select Course */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    b. Select Course
                  </label>
                  <div className="space-y-2">
                    {(
                      [
                        'Computer Engineering',
                        'Information Technology',
                        'Electronics Engineering',
                      ] as CourseType[]
                    ).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCourse(c)}
                        className={`w-full flex items-center justify-between p-3 rounded-2xl border text-xs sm:text-sm font-medium transition-all text-left cursor-pointer ${
                          course === c
                            ? 'bg-emerald-600/20 border-emerald-400 text-white shadow-sm'
                            : 'bg-[#051411] border-[#163a30] text-slate-300 hover:border-emerald-500/40'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <GraduationCap className="w-4 h-4 text-emerald-400" />
                          <span>{c}</span>
                        </div>
                        {course === c && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* c. Select Year and Semester */}
                <div className="pt-1">
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    c. Select Year and Semester
                  </label>

                  {/* Year selector pills */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {(['1st', '2nd', '3rd'] as YearType[]).map((y) => (
                      <button
                        key={y}
                        type="button"
                        onClick={() => handleYearChange(y)}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                          year === y
                            ? 'bg-[#12382f] border-emerald-400 text-emerald-300 shadow-sm'
                            : 'bg-[#051411] border-[#163a30] text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {y} Year
                      </button>
                    ))}
                  </div>

                  {/* Semester selector for selected year */}
                  <div className="grid grid-cols-2 gap-2">
                    {YEAR_SEMESTER_MAP[year].map((sem) => (
                      <button
                        key={sem}
                        type="button"
                        onClick={() => setSemester(sem)}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer text-center flex items-center justify-center gap-2 ${
                          semester === sem
                            ? 'bg-emerald-500/25 border-emerald-400 text-white font-semibold'
                            : 'bg-[#051411] border-[#163a30] text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{sem}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('auth')}
                    className="px-4 h-11 rounded-2xl bg-[#081f18] border border-[#163a30] text-slate-400 hover:text-white text-xs font-medium cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 h-11 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                  >
                    <span>Enter VEENA Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
