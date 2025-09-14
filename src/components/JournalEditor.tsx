import { useState } from "react";
import { NeumorphicCard } from "@/components/NeumorphicCard";
import { NeumorphicButton } from "@/components/NeumorphicButton";
import { Textarea } from "@/components/ui/textarea";
import { JournalEntry } from "@/types";
import { BookOpen, Save, Sparkles } from "lucide-react";
import { format } from "date-fns";

interface JournalEditorProps {
  entry?: JournalEntry;
  date: string;
  onSave: (content: string) => void;
  onGeneratePrompt?: () => void;
}

const aiPrompts = [
  "What are you most grateful for today?",
  "What challenged you today and how did you handle it?",
  "What small win can you celebrate today?",
  "How did your habits serve you today?",
  "What would make tomorrow even better?",
  "What did you learn about yourself today?",
  "How are you feeling right now, and why?",
];

export function JournalEditor({ entry, date, onSave, onGeneratePrompt }: JournalEditorProps) {
  const [content, setContent] = useState(entry?.content || "");
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const handleSave = () => {
    onSave(content);
  };

  const handleGeneratePrompt = () => {
    const randomPrompt = aiPrompts[Math.floor(Math.random() * aiPrompts.length)];
    setCurrentPrompt(randomPrompt);
    setIsExpanded(true);
    onGeneratePrompt?.();
  };

  const insertPrompt = () => {
    const newContent = content ? `${content}\n\n${currentPrompt}\n` : `${currentPrompt}\n`;
    setContent(newContent);
    setCurrentPrompt("");
  };

  if (!isExpanded) {
    return (
      <NeumorphicCard variant="hover" className="cursor-pointer" onClick={() => setIsExpanded(true)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-muted-foreground" />
            <div>
              <h3 className="font-semibold">Journal Entry</h3>
              <p className="text-sm text-muted-foreground">
                {format(new Date(date), 'EEEE, MMMM d, yyyy')}
              </p>
            </div>
          </div>
          {content && (
            <div className="text-xs text-success bg-success-soft px-2 py-1 rounded">
              {content.length} characters
            </div>
          )}
        </div>
        
        {content && (
          <div className="mt-4 text-sm text-muted-foreground line-clamp-2">
            {content}
          </div>
        )}
      </NeumorphicCard>
    );
  }

  return (
    <NeumorphicCard variant="inset" className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5" />
          <div>
            <h3 className="font-semibold">Journal Entry</h3>
            <p className="text-sm text-muted-foreground">
              {format(new Date(date), 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
        </div>
        
        <NeumorphicButton
          variant="ghost"
          size="sm"
          onClick={handleGeneratePrompt}
          className="flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          AI Prompt
        </NeumorphicButton>
      </div>

      {/* AI Prompt Display */}
      {currentPrompt && (
        <div className="neumorphic-inset p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">AI Writing Prompt</span>
          </div>
          <p className="text-sm italic">{currentPrompt}</p>
          <div className="flex gap-2">
            <NeumorphicButton
              size="sm"
              variant="accent"
              onClick={insertPrompt}
            >
              Use This Prompt
            </NeumorphicButton>
            <NeumorphicButton
              size="sm"
              variant="ghost"
              onClick={() => setCurrentPrompt("")}
            >
              Dismiss
            </NeumorphicButton>
          </div>
        </div>
      )}

      <div>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind today? How did your habits go? What are you grateful for?"
          className="neumorphic-input min-h-[200px] resize-none"
          rows={8}
        />
      </div>

      <div className="flex gap-2">
        <NeumorphicButton
          variant="success"
          onClick={handleSave}
          className="flex-1 flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Entry
        </NeumorphicButton>
        <NeumorphicButton
          variant="ghost"
          onClick={() => setIsExpanded(false)}
        >
          Collapse
        </NeumorphicButton>
      </div>
    </NeumorphicCard>
  );
}