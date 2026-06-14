import type { LogDifficulty } from "@/types/database";

const DIFFICULTY_MULTIPLIERS: Record<LogDifficulty, number> = {
  easy: 1,
  medium: 20 / 30,
  hard: 15 / 30,
  difficult: 10 / 30,
};

/**
 * Calculates the dynamic daily page target based on base goal and session difficulty.
 * Preserves the prototype's ratio logic and adds the "difficult" tier.
 */
export function calculateDynamicTarget(
  baseGoal: number,
  difficulty: LogDifficulty,
): number {
  const multiplier = DIFFICULTY_MULTIPLIERS[difficulty] ?? 1;
  return Math.max(1, Math.round(baseGoal * multiplier));
}

export const LOG_DIFFICULTY_OPTIONS: {
  value: LogDifficulty;
  label: string;
}[] = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
  { value: "difficult", label: "Difficult" },
];
