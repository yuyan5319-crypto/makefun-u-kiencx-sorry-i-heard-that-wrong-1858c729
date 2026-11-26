// Sorry, I Heard That Wrong — make.fun bounty entry.
//
// One job: write a single funny line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt): the apology a smart speaker gives its
// owner after mishearing them. Deterministic: the same line on every run.
//
// The joke: the speaker did not just mishear a word, it misheard a whole
// errand — "dim the lights" became "book a flight" — and instead of
// grovelling it tries to sell the mistake, like a device that has already
// moved on to the travel section.
// Revision: the first draft ended "looks lovely this time of year", which
// rambled past the punch. "Honestly gorgeous" lands the same sell in two
// words and lets the line end on the image, not the calendar.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Sorry — you said 'dim the lights', I heard 'book a flight', and the Lisbon sunset this time of year is honestly gorgeous.";

// The gate: /output/entry.txt must be UTF-8 text of 1-140 characters,
// not only whitespace, a single line. Refuse to write anything outside it.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 140) {
  throw new Error(`line must be 1-140 characters, got ${chars.length}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf-8");

// Read it back: the judge scores exactly what lands on disk.
const written = readFileSync(outPath, "utf-8");
if (written !== LINE) {
  throw new Error("read-back mismatch: entry.txt does not hold the line");
}
console.log(written);
