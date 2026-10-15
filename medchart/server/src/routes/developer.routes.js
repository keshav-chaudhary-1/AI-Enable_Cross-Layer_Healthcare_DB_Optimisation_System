import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { applyIndexRecommendation, osDashboard, queryAnalysis, queryDashboard, requireDeveloper } from "../controllers/developer.controller.js";

export const developerRouter = Router();
developerRouter.use(requireAuth, requireDeveloper);
developerRouter.get("/queries", queryDashboard);
developerRouter.get("/os", osDashboard);
developerRouter.get("/queries/:queryId", queryAnalysis);
developerRouter.post("/optimizer/indexes", applyIndexRecommendation);
