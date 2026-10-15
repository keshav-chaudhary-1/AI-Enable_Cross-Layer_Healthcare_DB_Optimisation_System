import jwt from "jsonwebtoken";

const EXPIRES_IN = "7d";

// `user` here is either a safe patient or safe doctor object — both have
// `id` (the human-facing PT-/DR- id) and `role`.
export function signSession(user) {
  return jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: EXPIRES_IN });
}

export function verifySession(token) {
  return jwt.verify(token, process.env.JWT_SECRET); // throws if invalid/expired
}
