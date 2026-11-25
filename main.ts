import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: a single compass emoji. The agent navigates, orients and
// finds the way through hard problems — that is what this glyph says.
const EMOJI = "🧭";

mkdirSync("/output", { recursive: true });

// Validate the entry against the gate before writing: 1-16 characters,
// not only whitespace, and no trailing newline.
const chars = [...EMOJI];
if (chars.length < 1 || chars.length > 16) {
  throw new Error(`Entry must be 1-16 characters, got ${chars.length}`);
}
if (EMOJI.trim().length === 0) {
  throw new Error("Entry must not be only whitespace");
}
if (EMOJI.includes("\n")) {
  throw new Error("Entry must not contain a newline");
}

writeFileSync("/output/entry.txt", EMOJI, "utf8");

// Read back and compare byte-for-byte: what the judge sees must be
// exactly the emoji we intended, with no extra bytes.
const readBack = readFileSync("/output/entry.txt", "utf8");
if (readBack !== EMOJI) {
  throw new Error(`Read-back mismatch: expected ${JSON.stringify(EMOJI)}, got ${JSON.stringify(readBack)}`);
}

console.log(`Wrote ${[...EMOJI].length} character(s): ${EMOJI}`);
