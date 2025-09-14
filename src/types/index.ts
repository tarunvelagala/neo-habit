export interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'custom';
  customFrequency?: number; // for custom frequency (e.g., every 3 days)
  completions: string[]; // ISO date strings
  createdAt: string;
  color?: string;
  icon?: string;
}

export interface Routine {
  id: string;
  name: string;
  description: string;
  habitIds: string[];
  createdAt: string;
  color?: string;
  icon?: string;
}

export interface JournalEntry {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  content: string;
  markdown: string;
  createdAt: string;
  updatedAt: string;
  habitIds?: string[]; // linked habits
  routineIds?: string[]; // linked routines
  mood?: number; // 1-5 mood rating
  tags?: string[];
}

export interface StreakData {
  habitId: string;
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  lastCompletion?: string;
}

export interface DayData {
  date: string;
  habits: { [habitId: string]: boolean };
  routines: { [routineId: string]: number }; // completion percentage
  journalEntryId?: string;
  mood?: number;
}

export type ViewMode = 'today' | 'weekly' | 'overall';

export interface AppState {
  habits: Habit[];
  routines: Routine[];
  journalEntries: JournalEntry[];
  currentView: ViewMode;
  selectedDate: string;
  darkMode: boolean;
}