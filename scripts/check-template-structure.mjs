/**
 * check-template-structure.mjs
 *
 * Enforces the architectural invariant: template directories are manifest-only.
 * No .tsx files may exist inside src/templates/<name>/ (at any depth).
 * Excluded from this check: _core/, _variants/, _shared/ — those intentionally
 * contain component implementations.
 *
 * Usage:  node scripts/check-template-structure.mjs
 * Exit:   0 = all clear, 1 = violations found
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.join(__dirname, "..", "src", "templates");

// Directories that are intentionally allowed to contain .tsx files
const EXCLUDED_DIRS = new Set(["_core", "_variants", "_shared"]);

/**
 * Recursively collect all .tsx files under a given directory.
 * @param {string} dir
 * @returns {string[]} absolute file paths
 */
function findTsxFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findTsxFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
      results.push(fullPath);
    }
  }
  return results;
}

// --- main ---

const entries = fs.readdirSync(TEMPLATES_DIR, { withFileTypes: true });
const templateDirs = entries.filter(
  (e) => e.isDirectory() && !EXCLUDED_DIRS.has(e.name)
);

let hasViolations = false;

for (const dir of templateDirs) {
  const templatePath = path.join(TEMPLATES_DIR, dir.name);
  const violations = findTsxFiles(templatePath);

  if (violations.length > 0) {
    hasViolations = true;
    console.error(`\n[FAIL] Template "${dir.name}" contains .tsx files:`);
    for (const file of violations) {
      // Print path relative to project root for readability
      const rel = path.relative(path.join(__dirname, ".."), file);
      console.error(`  ${rel}`);
    }
  }
}

if (hasViolations) {
  console.error(
    "\nArchitecture violation: template directories must be manifest-only."
  );
  console.error(
    "Move component implementations to src/templates/_core/ or src/templates/_variants/\n"
  );
  process.exit(1);
} else {
  console.log("check-template-structure: all clear (no .tsx files in template directories)");
  process.exit(0);
}
