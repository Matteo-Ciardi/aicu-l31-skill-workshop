import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, test } from "node:test";
import { fileURLToPath } from "node:url";
import { validateSkillFile } from "../scripts/validate-skill.js";

const temporaryDirectories = [];
const validatorPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "scripts",
  "validate-skill.js"
);

afterEach(() => {
  while (temporaryDirectories.length > 0) {
    rmSync(temporaryDirectories.pop(), { recursive: true, force: true });
  }
});

function createSkill(directoryName, content) {
  const root = mkdtempSync(join(tmpdir(), "l31-skill-"));
  const skillDirectory = join(root, directoryName);
  const skillPath = join(skillDirectory, "SKILL.md");

  temporaryDirectories.push(root);
  mkdirSync(skillDirectory, { recursive: true });
  writeFileSync(skillPath, content, "utf8");

  return skillPath;
}

test("accetta una skill minima valida", () => {
  const skillPath = createSkill(
    "prepare-demo",
    `---
name: prepare-demo
description: Prepare a repeatable demo when the user needs to present a feature.
---

# Prepare a demo

Verify the main flow and report observable evidence.
`
  );

  assert.deepEqual(validateSkillFile(skillPath).errors, []);
});

test("accetta una description YAML multilinea", () => {
  const skillPath = createSkill(
    "prepare-demo",
    `---
name: prepare-demo
description: >-
  Prepare a repeatable demo when the user needs to present a feature.
  Use it to verify the main flow and collect observable evidence.
---

# Prepare a demo

Verify the main flow and report observable evidence.
`
  );

  assert.deepEqual(validateSkillFile(skillPath).errors, []);
});

test("rifiuta un nome che non corrisponde alla directory", () => {
  const skillPath = createSkill(
    "prepare-demo",
    `---
name: different-name
description: Prepare a repeatable demo when requested.
---

# Prepare a demo
`
  );

  assert.match(
    validateSkillFile(skillPath).errors.join("\n"),
    /corrispondere alla directory/
  );
});

test("rifiuta frontmatter senza description", () => {
  const skillPath = createSkill(
    "prepare-demo",
    `---
name: prepare-demo
---

# Prepare a demo
`
  );

  assert.match(
    validateSkillFile(skillPath).errors.join("\n"),
    /richiede description/
  );
});

test("scopre e valida una skill custom senza richiedere il percorso", () => {
  const root = mkdtempSync(join(tmpdir(), "l31-workshop-"));
  const skillDirectory = join(
    root,
    ".agents",
    "skills",
    "prepare-demo"
  );

  temporaryDirectories.push(root);
  mkdirSync(skillDirectory, { recursive: true });
  writeFileSync(
    join(skillDirectory, "SKILL.md"),
    `---
name: prepare-demo
description: Prepare a repeatable demo when the user needs to present a feature.
---

# Prepare a demo

Verify the main flow and report observable evidence.
`,
    "utf8"
  );

  const result = spawnSync(process.execPath, [validatorPath], {
    cwd: root,
    encoding: "utf8"
  });

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /1 skill validate/);
});
