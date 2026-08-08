import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const skillNamePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const fallbackSkill = resolve(
  ".agents",
  "skills",
  "create-repository-skill",
  "SKILL.md"
);

function unquote(value) {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function parseRequiredFrontmatter(frontmatter) {
  const values = new Map();
  const lines = frontmatter.split("\n");

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const match = /^(name|description):\s*(.*)$/.exec(line);

    if (!match) {
      continue;
    }

    const [, key, rawValue] = match;

    if (values.has(key)) {
      throw new Error(`Campo duplicato nel frontmatter: ${key}`);
    }

    const scalarStyle = rawValue.trim();

    if (["|", ">", "|-", ">-", "|+", ">+"].includes(scalarStyle)) {
      if (key !== "description") {
        throw new Error(`${key} deve usare un valore su una sola riga`);
      }

      const fragments = [];

      while (index + 1 < lines.length && /^\s+\S/.test(lines[index + 1])) {
        index += 1;
        fragments.push(lines[index].trim());
      }

      values.set(key, fragments.join(scalarStyle.startsWith(">") ? " " : "\n"));
      continue;
    }

    values.set(key, unquote(rawValue));
  }

  return values;
}

export function validateSkillFile(filePath) {
  const absolutePath = resolve(filePath);
  const errors = [];

  if (!existsSync(absolutePath)) {
    return { path: absolutePath, errors: ["File SKILL.md non trovato"] };
  }

  if (basename(absolutePath) !== "SKILL.md") {
    errors.push("Il file deve chiamarsi SKILL.md");
  }

  const content = readFileSync(absolutePath, "utf8").replace(/\r\n/g, "\n");
  const lines = content.split("\n");

  if (lines[0] !== "---") {
    errors.push("Il file deve iniziare con il delimitatore YAML ---");
    return { path: absolutePath, errors };
  }

  const closingIndex = lines.indexOf("---", 1);

  if (closingIndex === -1) {
    errors.push("Manca il delimitatore YAML di chiusura ---");
    return { path: absolutePath, errors };
  }

  let fields;

  try {
    fields = parseRequiredFrontmatter(lines.slice(1, closingIndex).join("\n"));
  } catch (error) {
    errors.push(error.message);
    return { path: absolutePath, errors };
  }

  const name = fields.get("name") ?? "";
  const description = fields.get("description") ?? "";
  const directoryName = basename(dirname(absolutePath));

  if (!name) {
    errors.push("Il frontmatter richiede name");
  } else {
    if (!skillNamePattern.test(name)) {
      errors.push("name deve usare lettere minuscole, numeri e trattini singoli");
    }

    if (name.length > 64) {
      errors.push("name non puo' superare 64 caratteri");
    }

    if (name !== directoryName) {
      errors.push(`name deve corrispondere alla directory: ${directoryName}`);
    }
  }

  if (!description) {
    errors.push("Il frontmatter richiede description");
  } else if (description.length > 1024) {
    errors.push("description non puo' superare 1024 caratteri");
  }

  const body = lines.slice(closingIndex + 1).join("\n").trim();

  if (!body) {
    errors.push("Il corpo Markdown della skill non puo' essere vuoto");
  }

  return { path: absolutePath, errors };
}

export function discoverCustomSkills() {
  const skillsRoot = resolve(".agents", "skills");

  if (!existsSync(skillsRoot)) {
    return [];
  }

  return readdirSync(skillsRoot)
    .map((name) => join(skillsRoot, name))
    .filter((path) => statSync(path).isDirectory())
    .map((path) => join(path, "SKILL.md"))
    .filter((path) => resolve(path) !== fallbackSkill)
    .sort();
}

function runCli() {
  const suppliedPaths = process.argv.slice(2).filter((argument) => argument !== "--");
  const paths = suppliedPaths.length > 0 ? suppliedPaths : discoverCustomSkills();

  if (paths.length === 0) {
    console.error(
      "Nessuna skill custom trovata. Crea .agents/skills/<nome>/SKILL.md e riprova."
    );
    process.exitCode = 1;
    return;
  }

  let failed = false;

  for (const path of paths) {
    const result = validateSkillFile(path);

    if (result.errors.length === 0) {
      console.log(`OK  ${result.path}`);
      continue;
    }

    failed = true;
    console.error(`ERRORE  ${result.path}`);

    for (const error of result.errors) {
      console.error(`- ${error}`);
    }
  }

  if (failed) {
    process.exitCode = 1;
  } else {
    console.log(`\n${paths.length} skill validate.`);
  }
}

const isMain =
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (isMain) {
  runCli();
}
