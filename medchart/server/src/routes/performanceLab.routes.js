import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { labHistory, labOverview, resetLab, runLab } from "../controllers/performanceLab.controller.js";
import { requireDeveloper } from "../controllers/developer.controller.js";

export const performanceLabRouter = Router();
performanceLabRouter.use(requireAuth, requireDeveloper);
performanceLabRouter.get("/", labOverview);
performanceLabRouter.get("/history", labHistory);
performanceLabRouter.post("/run", runLab);
performanceLabRouter.post("/reset", resetLab);
