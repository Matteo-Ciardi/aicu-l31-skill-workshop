---
name: create-repository-skill
description: Create one minimal repository-local Agent Skill from a recurring process described by the user. Use when the user wants to turn their own workflow into a reusable SKILL.md; do not copy a predefined classroom solution or create unrelated project files.
---

# Create a repository skill

## Goal

Turn one real recurring process into one small skill that another agent can discover, follow, and verify.

## Discover the process

Ask no more than three questions, one at a time, and only when the answer changes the skill. Establish:

- what starts the process;
- what input is required;
- what steps the user actually follows;
- what output is useful;
- what must remain out of scope;
- when the agent must stop or ask for help.

Do not choose the process for the user.

## Create the skill

1. Choose a short verb-led name using lowercase letters, numbers, and single hyphens.
2. Create `.agents/skills/<name>/SKILL.md`.
3. Add YAML frontmatter with a matching `name` and a one-line `description` that says what the skill does and when to use it.
4. Keep the body focused on objective, required inputs, procedure, output, boundaries, and stop condition.
5. Use direct instructions. Remove background theory the agent does not need to execute the process.
6. Do not add scripts, references, assets, metadata, or configuration unless the process genuinely requires them.

## Boundaries

- Create exactly one custom skill unless the user requests more.
- Do not overwrite this fallback skill.
- Do not copy the classroom review skill.
- Do not inspect or include secrets, credentials, environment files, or personal data.
- Do not modify files outside the new skill directory without explicit permission.
- Do not claim that the skill works before validating and trying it.

## Validate and try it

1. Run `pnpm validate:skill -- .agents/skills/<name>/SKILL.md`.
2. If validation fails, correct only the reported format problem and rerun it.
3. Ask the user for one small representative case, or use one they already supplied.
4. Invoke the new skill explicitly on that case.
5. Compare the result with the intended process.
6. Revise one ambiguous or ineffective instruction if needed.

## Final response

Report:

- the skill path and purpose;
- validation result;
- the case used for the trial;
- the single revision made after the trial, or why none was needed.
