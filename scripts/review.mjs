// Headless email review. Usage: node scripts/review.mjs <campaign-folder>
// Runs Claude Code in print mode, saves review/findings.json, exits 1 if any finding is high severity.
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const folder = process.argv[2];
if (!folder) {
  console.error("Usage: node scripts/review.mjs <campaign-folder>");
  process.exit(2);
}

const schemaPath = join(root, "review", "findings.schema.json");
const schemaText = JSON.stringify(JSON.parse(readFileSync(schemaPath, "utf8")));

const normFolder = (f) => String(f).replace(/\\/g, "/").replace(/\/+$/, "");
const folderName = normFolder(folder);

// If the last review was for this same folder, hand its findings back to Claude.
let previous = null;
const findingsPath = join(root, "review", "findings.json");
if (existsSync(findingsPath)) {
  try {
    const prev = JSON.parse(readFileSync(findingsPath, "utf8"));
    if (prev?.folder && normFolder(prev.folder) === folderName && Array.isArray(prev.findings)) {
      previous = prev.findings;
    }
  } catch {}
}

let prompt =
  `Review every email in ${folder} against brand/voice.md and .claude/rules/emails.md. ` +
  `Treat any guarantee of a full bond back, anything that reads as legal advice, fake urgency, ` +
  `a missing unsubscribe link or a missing 'not legal advice' line as high severity. ` +
  `Report only real problems.`;
if (previous) {
  prompt +=
    `\n\nLast review's findings:\n${JSON.stringify(previous, null, 2)}\n\n` +
    `These are findings from the last review. Report only problems that are new or still not fixed. ` +
    `Don't repeat ones that have been fixed.`;
}

// On Windows the npm shim is claude.cmd, which mangles quotes in arguments.
// Call the real claude.exe next to it so the JSON schema reaches Claude intact.
function claudeCommand() {
  if (process.platform === "win32") {
    const found = spawnSync("where", ["claude"], { encoding: "utf8" });
    for (const p of (found.stdout || "").split(/\r?\n/).filter(Boolean)) {
      const exe = join(dirname(p), "node_modules", "@anthropic-ai", "claude-code", "bin", "claude.exe");
      if (existsSync(exe)) return exe;
    }
  }
  return "claude";
}

const run = spawnSync(
  claudeCommand(),
  [
    "-p", prompt,
    "--output-format", "json",
    "--json-schema", schemaText,
    "--allowedTools", "Read,Glob,Grep",
  ],
  { cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
);

if (run.error || run.status !== 0) {
  let reason = run.error?.message || run.stderr;
  try {
    const o = JSON.parse(run.stdout);
    const last = Array.isArray(o) ? o[o.length - 1] : o;
    if (last?.is_error && last.result) reason = last.result;
  } catch {}
  console.error("Claude run failed:", reason || run.stdout);
  process.exit(2);
}

let out;
try {
  out = JSON.parse(run.stdout);
} catch {
  console.error("Could not parse Claude output as JSON:\n" + run.stdout.slice(0, 500));
  process.exit(2);
}

// Output may be one object, or a list whose last item is the result.
const result = Array.isArray(out) ? out[out.length - 1] : out;
const structured = result?.structured_output;
if (!structured || !Array.isArray(structured.findings)) {
  console.error("No structured_output in result:\n" + JSON.stringify(result, null, 2).slice(0, 800));
  process.exit(2);
}

mkdirSync(join(root, "review"), { recursive: true });
writeFileSync(
  findingsPath,
  JSON.stringify({ folder: folderName, findings: structured.findings }, null, 2) + "\n",
);

const counts = { high: 0, medium: 0, low: 0 };
for (const f of structured.findings) counts[f.severity] = (counts[f.severity] ?? 0) + 1;
console.log(
  `${folder}: ${structured.findings.length} findings (${counts.high} high, ${counts.medium} medium, ${counts.low} low)`,
);
process.exit(counts.high > 0 ? 1 : 0);
