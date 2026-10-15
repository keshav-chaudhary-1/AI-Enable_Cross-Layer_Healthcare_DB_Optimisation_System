import { verifySession } from "../utils/jwt.js";
import { getQueryContext } from "../utils/queryLogger.js";

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Not signed in." });
  }

  try {
    const payload = verifySession(token);
    // payload.sub is the human-facing display id (e.g. "PT-1001" / "DR-1002");
    // payload.role tells controllers which table it belongs to.
    req.userId = payload.sub;
    req.userRole = payload.role;
    const context = getQueryContext();
    if (context) context.actor = `${payload.role}:${payload.sub}`;
    next();
  } catch {
    res.status(401).json({ message: "Session expired. Please sign in again." });
  }
}
