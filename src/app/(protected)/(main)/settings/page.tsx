import { SettingsForm } from "@/components/settings/settings-form";

export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display text-3xl font-bold">Settings</h1>
      <p className="mt-2 mb-8 text-muted">
        Manage your profile, timezone, and reading defaults.
      </p>
      <SettingsForm />
    </main>
  );
}
