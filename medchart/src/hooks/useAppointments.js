import { useState, useEffect, useCallback } from "react";
import {
  getDoctorsRequest,
  getMyAppointmentsRequest,
  bookAppointmentRequest,
  updateAppointmentStatusRequest,
  updateTreatmentStatusRequest,
} from "../api/appointmentsApi.js";
import { getToken } from "../utils/session.js";

// Talks to /api/appointments. Works for both roles — the backend decides
// what "my appointments" means based on the signed-in user.
export function useAppointments(role) {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const refresh = useCallback(async () => {
    const token = getToken();
    if (!token) return;
    setLoading(true);
    try {
      const { appointments: rows } = await getMyAppointmentsRequest(token);
      setAppointments(rows);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Patients need the doctor list to populate the booking form.
  useEffect(() => {
    if (role !== "patient") return;
    const token = getToken();
    if (!token) return;
    getDoctorsRequest(token)
      .then(({ doctors: rows }) => setDoctors(rows))
      .catch((err) => setError(err.message));
  }, [role]);

  function clearError() {
    if (error) setError("");
  }

  async function book({ doctorId, scheduledAt, reason }) {
    const token = getToken();
    setActionLoading(true);
    try {
      await bookAppointmentRequest(token, { doctorId, scheduledAt, reason });
      await refresh();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setActionLoading(false);
    }
  }

  async function setStatus(appointmentId, status) {
    const token = getToken();
    setActionLoading(true);
    try {
      await updateAppointmentStatusRequest(token, appointmentId, status);
      await refresh();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setActionLoading(false);
    }
  }

  async function setTreatmentStatus(appointmentId, treatmentStatus) {
    const token = getToken();
    setActionLoading(true);
    try {
      await updateTreatmentStatusRequest(token, appointmentId, treatmentStatus);
      await refresh();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setActionLoading(false);
    }
  }

  return { appointments, doctors, loading, error, actionLoading, clearError, book, setStatus, setTreatmentStatus, refresh };
}
