import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { listReports, uploadReport, downloadReport } from "../controllers/report.controller.js";

export const reportRouter = Router();
reportRouter.use(requireAuth);
reportRouter.get("/", listReports);
reportRouter.post("/", uploadReport);
reportRouter.get("/:reportId/document", downloadReport);
