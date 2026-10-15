import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.routes.js";
import { appointmentRouter } from "./routes/appointment.routes.js";
import { reportRouter } from "./routes/report.routes.js";
import { developerRouter } from "./routes/developer.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { runWithQueryContext } from "./utils/queryLogger.js";

dotenv.config();

const app = express();

app.use((req, res, next) => {
  runWithQueryContext({ route: `${req.method} ${req.originalUrl}`, actor: "anonymous" }, next);
});

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
// Report uploads are sent as base64 JSON. Keep the request limit above the
// 10 MB decoded-file limit to account for base64 expansion and metadata.
app.use(express.json({ limit: "14mb" }));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/reports", reportRouter);
app.use("/api/developer", developerRouter);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`MedChart API listening on http://localhost:${port}`);
});
