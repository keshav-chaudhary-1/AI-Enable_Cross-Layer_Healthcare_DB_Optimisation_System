import { useCallback, useEffect, useState } from "react";
import { getToken } from "../utils/session.js";
import { getCurrentPatientsRequest } from "../api/appointmentsApi.js";
import { downloadReportRequest, getReportsRequest, uploadReportRequest } from "../api/reportsApi.js";

export function useReports(role) {
  const [reports, setReports] = useState([]);
  const [currentPatients, setCurrentPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    const token = getToken();
    if (!token) return;
    setLoading(true);
    try {
      const [{ reports: reportRows }, patientsResult] = await Promise.all([
        getReportsRequest(token),
        role === "doctor" ? getCurrentPatientsRequest(token) : Promise.resolve({ patients: [] }),
      ]);
      setReports(reportRows);
      setCurrentPatients(patientsResult.patients);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [role]);

  useEffect(() => { refresh(); }, [refresh]);

  async function upload({ appointmentId, fileName, mimeType, dataBase64, notes }) {
    setActionLoading(true);
    try {
      await uploadReportRequest(getToken(), { appointmentId, fileName, mimeType, dataBase64, notes });
      await refresh();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setActionLoading(false);
    }
  }

  async function openReport(report) {
    try {
      return await downloadReportRequest(getToken(), report.id, report.fileName);
    } catch (err) {
      setError(err.message);
      return null;
    }
  }

  return { reports, currentPatients, loading, actionLoading, error, setError, upload, openReport, refresh };
}
