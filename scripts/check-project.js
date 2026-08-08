import { spawnSync } from "node:child_process";

const commands = [
  ["--check", "scripts/validate-skill.js"],
  ["--check", "scripts/check-project.js"],
  [
    "scripts/validate-skill.js",
    ".agents/skills/create-repository-skill/SKILL.md"
  ],
  ["--test"]
];

for (const args of commands) {
  const result = spawnSync(process.execPath, args, { stdio: "inherit" });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log("\nStarter verificato: fallback e validatore funzionano.");
