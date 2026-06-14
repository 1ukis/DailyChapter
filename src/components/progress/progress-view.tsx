"use client";

import { ConfettiCanvas } from "@/components/progress/confetti-canvas";
import { ConsistencyChart } from "@/components/progress/consistency-chart";
import { ContributionCalendar } from "@/components/progress/contribution-calendar";
import { LogReadingForm } from "@/components/progress/log-reading-form";
import { StreakStats } from "@/components/progress/streak-stats";
import { TbrPanel } from "@/components/progress/tbr-panel";
import { Alert } from "@/components/ui/alert";
import { useIdentityLevels } from "@/hooks/use-identity-levels";
import { useLogs } from "@/hooks/use-logs";
import { useProfile } from "@/hooks/use-profile";
import { useRealtimeSync } from "@/hooks/use-realtime";
import { useStreak } from "@/hooks/use-streaks";
import { getTodayInTimezone } from "@/lib/utils/date";
import { useState } from "react";

export function ProgressView() {
  useRealtimeSync(
    "logs",
    "streaks",
    "backlog",
    "books",
    "reading_identity_levels",
    "profiles",
  );

  const { data: profile } = useProfile();
  const timezone = profile?.timezone ?? "America/Toronto";
  const today = getTodayInTimezone(timezone);

  const { data: logs = [], isLoading: logsLoading, error: logsError } =
    useLogs(timezone);
  const { data: streak } = useStreak();
  const { data: identityLevels = [] } = useIdentityLevels();

  const [showConfetti, setShowConfetti] = useState(false);

  const todayLog = logs.find((log) => log.log_date === today);
  const currentStreak = streak?.current_streak ?? 0;
  const longestStreak = streak?.longest_streak ?? 0;

  function handleLogged(metGoal: boolean) {
    if (metGoal) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }

  return (
    <>
      <ConfettiCanvas active={showConfetti} />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-8">
          <h1 className="font-display text-3xl font-bold">Reading Progress</h1>
          <p className="mt-2 text-muted">
            Log daily pages, track streaks, and visualize your consistency.
          </p>
        </header>

        {logsError && (
          <Alert variant="error" className="mb-6">
            {logsError instanceof Error
              ? logsError.message
              : "Failed to load reading logs."}
          </Alert>
        )}

        <div className="grid gap-8 xl:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            <div>
              <LogReadingForm
                timezone={timezone}
                todayLog={todayLog}
                onLogged={handleLogged}
              />
              {!logsLoading && (
                <StreakStats
                  currentStreak={currentStreak}
                  longestStreak={longestStreak}
                  logs={logs}
                  identityLevels={identityLevels}
                />
              )}
            </div>

            {!logsLoading && (
              <>
                <ContributionCalendar logs={logs} timezone={timezone} />
                <ConsistencyChart logs={logs} timezone={timezone} />
              </>
            )}
          </div>

          <TbrPanel />
        </div>
      </main>
    </>
  );
}
