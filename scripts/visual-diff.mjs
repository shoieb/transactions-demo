import { spawnSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
// Changes only runtime CSS in a test browser. Baseline and project files are untouched.
const result = spawnSync(
  "npx",
  [
    "playwright",
    "test",
    "visual.spec.ts",
    "-g",
    "desktop transaction table",
    "--reporter=json",
    "--output=reports/visual-diff",
  ],
  { encoding: "utf8", env: { ...process.env, DEMO_VISUAL_CHANGE: "1" } },
);
mkdirSync("reports", { recursive: true });
writeFileSync("reports/visual-diff-report.json", result.stdout);
let report;
try {
  report = JSON.parse(result.stdout);
} catch {
  console.error(result.stderr || result.stdout);
  process.exit(1);
}
const collect = (suites) =>
  suites.flatMap((s) => [...(s.specs ?? []), ...collect(s.suites ?? [])]);
const specs = collect(report.suites ?? []);
const runs = specs
  .flatMap((s) => s.tests ?? [])
  .flatMap((t) => t.results ?? []);
const attachments = runs.flatMap((r) => r.attachments ?? []);
const hasDiff = attachments.some((a) => a.name.endsWith("-diff.png"));
if (result.status === 1 && hasDiff) {
  console.log(
    "Confirmed: the intentional brand-color change failed screenshot comparison and produced a diff. See reports/visual-diff/.",
  );
} else {
  console.error(
    "Expected an actual screenshot mismatch with a diff. Inspect reports/visual-diff-report.json.",
  );
  process.exit(1);
}
