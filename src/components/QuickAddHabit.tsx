import { useState } from "react";
import { NeumorphicCard } from "@/components/NeumorphicCard";
import { NeumorphicButton } from "@/components/NeumorphicButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { Habit } from "@/types";

interface QuickAddHabitProps {
  onAddHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'completions'>) => void;
}

export function QuickAddHabit({ onAddHabit }: QuickAddHabitProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'custom'>('daily');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddHabit({
      name: name.trim(),
      description: description.trim(),
      frequency,
    });

    // Reset form
    setName("");
    setDescription("");
    setFrequency('daily');
    setIsOpen(false);
  };

  const handleCancel = () => {
    setName("");
    setDescription("");
    setFrequency('daily');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <NeumorphicButton
        variant="accent"
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add New Habit
      </NeumorphicButton>
    );
  }

  return (
    <NeumorphicCard variant="inset" className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Add New Habit</h3>
        <NeumorphicButton
          variant="ghost"
          size="sm"
          onClick={handleCancel}
        >
          <X className="w-4 h-4" />
        </NeumorphicButton>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Habit name (e.g., 'Morning meditation')"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="neumorphic-input"
            autoFocus
          />
        </div>

        <div>
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="neumorphic-input resize-none"
            rows={2}
          />
        </div>

        <div>
          <Select value={frequency} onValueChange={(value: any) => setFrequency(value)}>
            <SelectTrigger className="neumorphic-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <NeumorphicButton
            type="submit"
            variant="success"
            className="flex-1"
          >
            Create Habit
          </NeumorphicButton>
          <NeumorphicButton
            type="button"
            variant="ghost"
            onClick={handleCancel}
          >
            Cancel
          </NeumorphicButton>
        </div>
      </form>
    </NeumorphicCard>
  );
}