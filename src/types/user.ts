export type CourseType =
  | 'Computer Engineering'
  | 'Information Technology'
  | 'Electronics Engineering';

export type YearType = '1st' | '2nd' | '3rd';

export type SemesterType =
  | '1st semester'
  | '2nd semester'
  | '3rd semester'
  | '4th semester'
  | '5th semester'
  | '6th semester';

export interface UserProfile {
  email: string;
  name: string;
  course: CourseType;
  year: YearType;
  semester: SemesterType;
  avatarUrl?: string;
  isLoggedIn: boolean;
  isOnboarded: boolean;
}

export const YEAR_SEMESTER_MAP: Record<YearType, SemesterType[]> = {
  '1st': ['1st semester', '2nd semester'],
  '2nd': ['3rd semester', '4th semester'],
  '3rd': ['5th semester', '6th semester'],
};

export const STUDY_QUOTES = [
  '“Every page turned is a step closer to your dreams.”',
  '“Focus transforms effort into achievement.”',
  '“Small victories today pave the way for tomorrow’s success.”',
  '“Success is the sum of small efforts, repeated day in and day out.”',
  '“The expert in anything was once a beginner.”',
  '“Believe you can and you’re halfway there.”',
  '“Your future is created by what you do today, not tomorrow.”',
  '“Strive for progress, not perfection.”',
  '“Discipline is the bridge between goals and accomplishment.”',
  '“Knowledge speaks, but wisdom listens.”',
];

export interface AttachedDocument {
  name: string;
  size: number;
  type: string;
}

export interface ChatExchange {
  id: string;
  command: string;
  answer: string;
  timestamp: string;
  attachedFile?: AttachedDocument;
}

export interface ChatSession {
  id: string;
  title: string;
  exchanges: ChatExchange[];
  createdAt: string;
}
