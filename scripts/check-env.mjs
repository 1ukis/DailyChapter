#!/usr/bin/env node
/**
 * Run: npm run env:check
 * Validates local .env.local before dev/build/deploy.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd());
const envLocal = resolve(root, ".env.local");
const envExample = resolve(root, ".env.example");

const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
];

const recommended = ["NEXT_PUBLIC_APP_URL"];

function parseEnvFile(path) {
  if (!existsSync(path)) return {};
  const vars = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    vars[key] = value;
  }
  return vars;
}

const local = parseEnvFile(envLocal);
let failed = false;

console.log("\n🔍 DailyChapter environment check\n");

if (!existsSync(envLocal)) {
  console.error("❌ .env.local not found");
  console.log(`   Run: cp .env.example .env.local`);
  console.log(`   Then add your Supabase credentials.\n`);
  failed = true;
} else {
  console.log("✓ .env.local exists");
}

if (!existsSync(resolve(root, "supabase/config.toml"))) {
  console.warn("⚠ supabase/config.toml not found");
} else {
  console.log("✓ supabase/config.toml exists");
}

for (const key of required) {
  const value = local[key] || process.env[key];
  if (!value) {
    console.error(`❌ Missing: ${key}`);
    failed = true;
  } else if (
    value.includes("your-project") ||
    value.includes("your-anon-key")
  ) {
    console.error(`❌ ${key} still has placeholder value`);
    failed = true;
  } else {
    const preview =
      key === "NEXT_PUBLIC_SUPABASE_ANON_KEY"
        ? `${value.slice(0, 8)}…`
        : value;
    console.log(`✓ ${key} = ${preview}`);
  }
}

for (const key of recommended) {
  const value = local[key] || process.env[key];
  if (!value) {
    console.warn(`⚠ Recommended: ${key} (needed for OAuth in some setups)`);
  } else {
    console.log(`✓ ${key} = ${value}`);
  }
}

if (existsSync(envExample)) {
  console.log("✓ .env.example exists (template for Vercel env vars)");
}

console.log("");
if (failed) {
  console.error("Environment check FAILED. Fix the issues above.\n");
  process.exit(1);
}

console.log("Environment check passed ✓\n");
console.log("Next steps:");
console.log("  1. supabase db push     # apply database schema");
console.log("  2. npm run dev          # run locally");
console.log("  3. git push origin main # trigger Vercel deploy\n");
