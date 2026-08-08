---
name: generate-commit-message
description: Analyze Git diffs and produce a Conventional Commits message. Use when asked to write a commit message for repository changes present in the working tree or index.
---

# Generate a commit message

## Input

The agent reads the changes itself with Git. Do not ask the user to paste a diff.

## Procedure

1. Read the diff:
   - if there are staged changes, run `git diff --staged`;
   - otherwise run `git diff` (unstaged);
   - if both are empty, try `git diff HEAD~1` and stop with the message "nessun diff trovato" if there is still nothing.
2. Analyze which files changed and what the change does (new functionality, error fixing, maintenance/refactoring/build).
3. Choose the commit type: `feat` for new functionality, `fix` for error correction, `chore` for anything else.
4. Add `scope` in parentheses only if all changed files belong to one clearly identifiable module or area.
5. If the change breaks existing behavior or interfaces, add `!` before the `:` and a `BREAKING CHANGE:` note in the body.

## Output

Produce only the structured message.

Format:

```
type(scope): short description

optional body

BREAKING CHANGE: description
```

- `type`: as chosen above.
- `short description`: imperative, lowercase, no trailing period, up to ~50 chars.
- Body and breaking-change note only if needed. One message per set of changes.

## Boundaries

- Do NOT run `git commit`; only produce the message.
- Do NOT edit, stage, or move files.
- Do NOT read secrets, credentials, or environment files.
- Do NOT invoke git hooks or change Git configuration.

## Stop conditions

- Stop and report as in the message when there is nothing to read in the diff.
- Stop and report the message appears complete once done.