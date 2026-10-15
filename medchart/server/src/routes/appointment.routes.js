import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { getDoctors, bookAppointment, listMyAppointments, currentPatients, updateStatus, updateTreatment } from "../controllers/appointment.controller.js";

export const appointmentRouter = Router();

appointmentRouter.use(requireAuth);

appointmentRouter.get("/doctors", getDoctors);
appointmentRouter.get("/current-patients", currentPatients);
appointmentRouter.get("/", listMyAppointments);
appointmentRouter.post("/", bookAppointment);
appointmentRouter.patch("/:appointmentId/status", updateStatus);
appointmentRouter.patch("/:appointmentId/treatment", updateTreatment);
