// patient/doctor/appointment tables use plain integer primary keys.
// The frontend shows friendlier ids like "PT-1001" / "DR-1002" / "APT-1003" —
// these helpers convert between the two without needing a display_id column.
const OFFSET = 1000;

export function encodeId(prefix, numericId) {
  return `${prefix}-${OFFSET + numericId}`;
}

// Returns the numeric id, or null if the string doesn't match the expected
// "PREFIX-<number>" shape (e.g. wrong prefix, or garbage input).
export function decodeId(prefix, displayId) {
  if (typeof displayId !== "string") return null;
  const match = displayId.match(/^([A-Z]+)-(\d+)$/);
  if (!match || match[1] !== prefix) return null;
  const numericId = Number(match[2]) - OFFSET;
  return Number.isInteger(numericId) && numericId > 0 ? numericId : null;
}
