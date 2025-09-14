import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { TodayView } from "@/pages/TodayView";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Habit, JournalEntry, ViewMode, AppState } from "@/types";
import { format } from "date-fns";
import { toast } from "sonner";

// Initial app state
const initialState: AppState = {
  habits: [],
  routines: [],
  journalEntries: [],
  currentView: 'today',
  selectedDate: format(new Date(), 'yyyy-MM-dd'),
  darkMode: false,
};

const App = () => {
  const [appState, setAppState] = useLocalStorage<AppState>('dayone-app-state', initialState);

  // Apply dark mode to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', appState.darkMode);
  }, [appState.darkMode]);

  // Handlers
  const handleViewChange = (view: ViewMode) => {
    setAppState(prev => ({ ...prev, currentView: view }));
  };

  const handleToggleDarkMode = () => {
    setAppState(prev => ({ ...prev, darkMode: !prev.darkMode }));
    toast.success(appState.darkMode ? 'Light mode activated' : 'Dark mode activated');
  };

  const handleAddHabit = (habitData: Omit<Habit, 'id' | 'createdAt' | 'completions'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: `habit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      completions: [],
    };

    setAppState(prev => ({
      ...prev,
      habits: [...prev.habits, newHabit]
    }));

    toast.success(`Habit "${newHabit.name}" created successfully!`);
  };

  const handleToggleHabit = (habitId: string) => {
    const today = appState.selectedDate;
    
    setAppState(prev => {
      const updatedHabits = prev.habits.map(habit => {
        if (habit.id === habitId) {
          const isCompleted = habit.completions.includes(today);
          const updatedCompletions = isCompleted
            ? habit.completions.filter(date => date !== today)
            : [...habit.completions, today].sort();
            
          return { ...habit, completions: updatedCompletions };
        }
        return habit;
      });

      return { ...prev, habits: updatedHabits };
    });

    const habit = appState.habits.find(h => h.id === habitId);
    const isCompleted = habit?.completions.includes(today);
    
    toast.success(
      isCompleted 
        ? `Unmarked "${habit?.name}"` 
        : `Completed "${habit?.name}"! 🎉`
    );
  };

  const handleSaveJournal = (content: string) => {
    const today = appState.selectedDate;
    const existingEntry = appState.journalEntries.find(entry => entry.date === today);

    setAppState(prev => {
      if (existingEntry) {
        // Update existing entry
        const updatedEntries = prev.journalEntries.map(entry =>
          entry.id === existingEntry.id
            ? { 
                ...entry, 
                content, 
                markdown: content,
                updatedAt: new Date().toISOString() 
              }
            : entry
        );
        return { ...prev, journalEntries: updatedEntries };
      } else {
        // Create new entry
        const newEntry: JournalEntry = {
          id: `journal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          date: today,
          content,
          markdown: content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        return { ...prev, journalEntries: [...prev.journalEntries, newEntry] };
      }
    });

    toast.success('Journal entry saved!');
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto p-4">
          <Navigation
            currentView={appState.currentView}
            onViewChange={handleViewChange}
            darkMode={appState.darkMode}
            onToggleDarkMode={handleToggleDarkMode}
          />

          <main>
            {appState.currentView === 'today' && (
              <TodayView
                habits={appState.habits}
                journalEntries={appState.journalEntries}
                onAddHabit={handleAddHabit}
                onToggleHabit={handleToggleHabit}
                onSaveJournal={handleSaveJournal}
                selectedDate={appState.selectedDate}
              />
            )}
            
            {appState.currentView === 'weekly' && (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">Weekly View</h2>
                <p className="text-muted-foreground">Coming soon! This will show weekly habit trends and statistics.</p>
              </div>
            )}
            
            {appState.currentView === 'overall' && (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">Overall Statistics</h2>
                <p className="text-muted-foreground">Coming soon! This will show lifetime stats, streaks, and journal archive.</p>
              </div>
            )}
          </main>
        </div>
      </div>
      
      <Toaster />
      <Sonner />
    </TooltipProvider>
  );
};

export default App;