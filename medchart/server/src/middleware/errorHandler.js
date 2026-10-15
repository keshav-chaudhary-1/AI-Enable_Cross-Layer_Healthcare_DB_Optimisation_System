export function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.type === "entity.too.large") {
    return res.status(413).json({ message: "The report is too large. Please choose a file smaller than 10 MB." });
  }

  // Postgres unique-violation, in case a race slips past the app-level check
  if (err.code === "23505") {
    return res.status(409).json({ message: "An account already exists with that email." });
  }

  res.status(500).json({ message: "Something went wrong on the server." });
}
