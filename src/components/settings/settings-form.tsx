"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { COMMON_TIMEZONES } from "@/lib/constants/timezones";
import { detectBrowserTimezone } from "@/lib/utils/date";
import { useProfile, useUpdateProfile } from "@/hooks/use-profile";
import type { LogDifficulty, Profile } from "@/types/database";
import { useState } from "react";

const LOG_DIFFICULTY_OPTIONS: { value: LogDifficulty; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
  { value: "difficult", label: "Difficult" },
];

function SettingsFormFields({ profile }: { profile: Profile }) {
  const updateProfile = useUpdateProfile();

  const [displayName, setDisplayName] = useState(profile.display_name ?? "");
  const [timezone, setTimezone] = useState(profile.timezone);
  const [baseGoal, setBaseGoal] = useState(String(profile.base_goal));
  const [defaultDifficulty, setDefaultDifficulty] = useState<LogDifficulty>(
    profile.default_log_difficulty,
  );
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSaved(false);

    try {
      await updateProfile.mutateAsync({
        display_name: displayName.trim() || null,
        timezone,
        base_goal: Number(baseGoal) || 30,
        default_log_difficulty: defaultDifficulty,
      });
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings.");
    }
  }

  function useDetectedTimezone() {
    setTimezone(detectBrowserTimezone());
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
      {error && <Alert variant="error">{error}</Alert>}
      {saved && <Alert variant="success">Settings saved.</Alert>}

      <section className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
        <h2 className="font-display text-lg font-semibold">Profile</h2>

        <div>
          <Label htmlFor="displayName">Display name</Label>
          <Input
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Reader"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-lg font-semibold">Timezone</h2>
          <Button type="button" variant="ghost" size="sm" onClick={useDetectedTimezone}>
            Use detected
          </Button>
        </div>
        <p className="text-sm text-muted">
          Streaks and daily logs use this timezone. Detected:{" "}
          <span className="text-foreground">{detectBrowserTimezone()}</span>
        </p>

        <div>
          <Label htmlFor="timezone">Preferred timezone</Label>
          <Select
            id="timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          >
            {COMMON_TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
            {!COMMON_TIMEZONES.includes(
              timezone as (typeof COMMON_TIMEZONES)[number],
            ) && <option value={timezone}>{timezone}</option>}
          </Select>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
        <h2 className="font-display text-lg font-semibold">Reading defaults</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="baseGoal">Base daily page goal</Label>
            <Input
              id="baseGoal"
              type="number"
              min={1}
              value={baseGoal}
              onChange={(e) => setBaseGoal(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="defaultDifficulty">Default session difficulty</Label>
            <Select
              id="defaultDifficulty"
              value={defaultDifficulty}
              onChange={(e) =>
                setDefaultDifficulty(e.target.value as LogDifficulty)
              }
            >
              {LOG_DIFFICULTY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </section>

      <Button type="submit" loading={updateProfile.isPending}>
        Save settings
      </Button>
    </form>
  );
}

export function SettingsForm() {
  const { data: profile, isLoading, error: loadError } = useProfile();

  if (isLoading) {
    return <p className="text-muted">Loading settings...</p>;
  }

  if (loadError || !profile) {
    return (
      <Alert variant="error">
        {loadError instanceof Error
          ? loadError.message
          : "Failed to load settings."}
      </Alert>
    );
  }

  return <SettingsFormFields key={profile.updated_at} profile={profile} />;
}
