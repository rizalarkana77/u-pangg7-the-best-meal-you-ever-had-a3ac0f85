import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "The best meal I ever had was my grandmother's rendang, eaten with my hands on her kitchen floor while rain hammered the zinc roof and she pretended not to notice my third helping.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outputDir, { recursive: true });
const outputPath = join(outputDir, "entry.txt");
writeFileSync(outputPath, ENTRY, "utf8");

const saved = readFileSync(outputPath, "utf8");

if (saved !== ENTRY) {
  throw new Error("Read-back mismatch: saved content does not match ENTRY byte-for-byte");
}
if (saved.includes("\n") || saved.includes("\r")) {
  throw new Error("Entry must be a single line without newline characters");
}
if (saved.length === 0 || saved.length > 200) {
  throw new Error(`Entry length must be 1-200 characters, got ${saved.length}`);
}
if (saved.includes("  ")) {
  throw new Error("Entry must not contain double spaces");
}
if (saved.trim().length === 0) {
  throw new Error("Entry must be non-empty after trimming");
}
if (!saved.endsWith(".")) {
  throw new Error("Entry must end with a period");
}
const periodCount = (saved.match(/\./g) ?? []).length;
if (periodCount !== 1) {
  throw new Error(`Entry must be a single sentence with exactly one period, got ${periodCount}`);
}
if (!saved.toLowerCase().includes("rendang")) {
  throw new Error("Entry must name a concrete food (expected 'rendang')");
}

console.log(`Verified entry (${saved.length} chars, single sentence, gate passed): ${saved}`);
