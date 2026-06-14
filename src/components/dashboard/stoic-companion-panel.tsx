"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateStoicTask,
  useDeleteStoicTask,
  useStoicTasks,
  useToggleStoicCompletion,
  useUpdateStoicTask,
} from "@/hooks/use-stoic-tasks";
import type { StoicTask } from "@/types/database";
import { useState } from "react";

interface StoicCompanionPanelProps {
  timezone: string;
}

export function StoicCompanionPanel({ timezone }: StoicCompanionPanelProps) {
  const { tasks, completedTaskIds, isLoading } = useStoicTasks(timezone);
  const createTask = useCreateStoicTask();
  const updateTask = useUpdateStoicTask();
  const deleteTask = useDeleteStoicTask();
  const toggleCompletion = useToggleStoicCompletion(timezone);

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  async function handleAdd(event: React.FormEvent) {
    event.preventDefault();
    if (!newTitle.trim()) return;

    await createTask.mutateAsync({
      title: newTitle.trim(),
      sort_order: tasks.length,
    });
    setNewTitle("");
    setIsAdding(false);
  }

  async function handleSaveEdit(task: StoicTask) {
    if (!editTitle.trim()) return;
    await updateTask.mutateAsync({
      id: task.id,
      updates: { title: editTitle.trim() },
    });
    setEditingId(null);
  }

  return (
    <aside className="lg:sticky lg:top-6">
      <div className="rounded-2xl border border-white/10 bg-card p-5 transition hover:border-white/15">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-gold/15 text-accent-gold">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
            </svg>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold">
              Daily Practice
            </h3>
            <p className="text-xs text-muted">
              Customizable companion checklist
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted">
          Track daily reflection habits alongside your reading. Add, edit, or
          remove items to match your practice.
        </p>

        <div className="mt-4 space-y-2">
          {isLoading && (
            <p className="text-sm text-muted">Loading tasks...</p>
          )}

          {!isLoading && tasks.length === 0 && (
            <p className="rounded-xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-muted">
              No practice items yet. Add your first daily habit below.
            </p>
          )}

          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3"
            >
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent accent-success"
                checked={completedTaskIds.has(task.id)}
                disabled={toggleCompletion.isPending}
                onChange={(e) =>
                  toggleCompletion.mutate({
                    taskId: task.id,
                    completed: e.target.checked,
                  })
                }
                aria-label={`Complete ${task.title}`}
              />

              <div className="min-w-0 flex-1">
                {editingId === task.id ? (
                  <div className="flex gap-2">
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="h-8 text-sm"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleSaveEdit(task)}
                      loading={updateTask.isPending}
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-medium">{task.title}</p>
                    {task.description && (
                      <p className="mt-0.5 text-xs text-muted">
                        {task.description}
                      </p>
                    )}
                  </>
                )}
              </div>

              {editingId !== task.id && (
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="px-2 text-xs"
                    onClick={() => {
                      setEditingId(task.id);
                      setEditTitle(task.title);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="px-2 text-xs text-red-400"
                    onClick={() => deleteTask.mutate(task.id)}
                  >
                    ×
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {isAdding ? (
          <form onSubmit={handleAdd} className="mt-4 space-y-3">
            <div>
              <Label htmlFor="new-stoic-task">New practice item</Label>
              <Input
                id="new-stoic-task"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Read one Stoic passage"
                autoFocus
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" loading={createTask.isPending}>
                Add
              </Button>
            </div>
          </form>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            className="mt-4 w-full"
            onClick={() => setIsAdding(true)}
          >
            + Add practice item
          </Button>
        )}

        <p className="mt-4 text-[10px] text-muted">
          Recommended: 3 minutes daily. Resets each day in your timezone.
        </p>
      </div>
    </aside>
  );
}
