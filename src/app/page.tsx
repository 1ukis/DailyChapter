import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="font-display text-xl font-semibold tracking-tight">
            DailyChapter
          </span>
          <nav className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm text-muted transition hover:text-foreground"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-background transition hover:opacity-90"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto flex max-w-6xl flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <p className="mb-4 rounded-full border border-white/10 px-4 py-1 text-sm text-muted">
          Reading tracker &amp; habit formation
        </p>
        <h1 className="font-display max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Turn reading into a daily habit you never break
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Track your pages, build streaks, visualize consistency with a
          365-day heatmap, and customize your own reading curriculum from day
          one.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/signup"
            className="rounded-xl bg-accent px-6 py-3 font-medium text-background transition hover:opacity-90"
          >
            Start your reading journey
          </Link>
          <Link
            href="/login"
            className="rounded-xl border border-white/15 px-6 py-3 font-medium transition hover:border-white/30"
          >
            I already have an account
          </Link>
        </div>
      </section>

      <section className="border-t border-white/10 bg-card/40 px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
          {[
            {
              title: "Custom curriculum",
              body: "Start empty and build your list, or import a template via the setup wizard.",
            },
            {
              title: "Streaks & identity",
              body: "Dynamic page targets, customizable reading identity levels, and daily reinforcement.",
            },
            {
              title: "Your timezone",
              body: "Streaks follow your local timezone by default, with a settings override when you need it.",
            },
          ].map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-card p-6"
            >
              <h2 className="font-display text-lg font-semibold">
                {feature.title}
              </h2>
              <p className="mt-2 text-sm text-muted">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
