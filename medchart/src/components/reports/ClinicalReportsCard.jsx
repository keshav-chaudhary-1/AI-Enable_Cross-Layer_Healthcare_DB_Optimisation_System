import { useEffect, useMemo, useState } from "react";
import ChartCard from "../profile/ChartCard.jsx";
import Field from "../common/Field.jsx";
import { useAppointments } from "../../hooks/useAppointments.js";
import { useReports } from "../../hooks/useReports.js";
import { formatDateTime } from "../../utils/helpers.js";
import "./ClinicalReports.css";

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

const MAX_REPORT_BYTES = 10 * 1024 * 1024;

function ReportLine({ report, onOpen }) {
  return (
    <div className="mc-report-line">
      <div>
        <strong>{report.fileName}</strong>
        <span>{formatBytes(report.fileSize)} · uploaded {formatDateTime(report.uploadedAt)}</span>
        {report.notes && <small>{report.notes}</small>}
      </div>
      <button type="button" className="mc-report-open" onClick={() => onOpen(report)}>Open</button>
    </div>
  );
}

function PatientReports({ reports, appointments, onUpload, onOpen, loading, actionLoading, error }) {
  const [showUpload, setShowUpload] = useState(false);
  const [appointmentId, setAppointmentId] = useState(appointments[0]?.id || "");
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");

  const eligibleAppointments = useMemo(
    () => appointments.filter((appt) => appt.status === "confirmed" && ["not_started", "active"].includes(appt.treatmentStatus)),
    [appointments]
  );

  function openUpload() {
    setAppointmentId(eligibleAppointments[0]?.id || "");
    setFile(null);
    setNotes("");
    setShowUpload(true);
  }

  async function submit(e) {
    e.preventDefault();
    if (!file || !appointmentId) return;
    if (file.size > MAX_REPORT_BYTES) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const success = await onUpload({
        appointmentId,
        fileName: file.name,
        mimeType: file.type || "application/octet-stream",
        dataBase64: reader.result,
        notes: notes.trim(),
      });
      if (success) setShowUpload(false);
    };
    reader.readAsDataURL(file);
  }

  return (
    <>
      <div className="mc-report-header">
        <span className="mc-report-help">PDF, image, DOC, or other report · max 10 MB</span>
        <button type="button" className="mc-book-btn" disabled={!eligibleAppointments.length} onClick={openUpload}>
          Add report
        </button>
      </div>
      {loading ? <p className="mc-empty">Loading reports…</p> : reports.length === 0 ? (
        <p className="mc-empty">No reports have been uploaded for your active appointments.</p>
      ) : (
        <div className="mc-report-list">{reports.map((report) => <ReportLine key={report.id} report={report} onOpen={onOpen} />)}</div>
      )}
      {!eligibleAppointments.length && <p className="mc-report-help">Reports become available after a doctor confirms an appointment.</p>}
      {error && <p className="mc-error">{error}</p>}

      {showUpload && (
        <div className="mc-modal-backdrop" onClick={() => setShowUpload(false)}>
          <div className="mc-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add a clinical report</h2>
            <form onSubmit={submit}>
              <Field label="Appointment">
                <select value={appointmentId} onChange={(e) => setAppointmentId(e.target.value)}>
                  {eligibleAppointments.map((appt) => <option key={appt.id} value={appt.id}>{formatDateTime(appt.scheduledAt)}</option>)}
                </select>
              </Field>
              <Field label="Report document">
                <input type="file" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.txt" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
              </Field>
              {file && (
                <p className={file.size > MAX_REPORT_BYTES ? "mc-error" : "mc-report-help"}>
                  {file.name} · {formatBytes(file.size)}
                  {file.size > MAX_REPORT_BYTES ? " · Maximum size is 10 MB" : ""}
                </p>
              )}
              <Field label="Notes (optional)">
                <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="What should the doctor know about this report?" />
              </Field>
              {error && <p className="mc-error">{error}</p>}
              <div className="mc-modal-actions">
                <button type="button" className="mc-modal-cancel" onClick={() => setShowUpload(false)}>Cancel</button>
                <button type="submit" className="mc-submit" disabled={actionLoading || !file || file.size > MAX_REPORT_BYTES}>{actionLoading ? "Uploading…" : "Upload report"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function DoctorReports({ currentPatients, reports, onOpen, loading, error }) {
  return (
    <>
      {loading ? <p className="mc-empty">Loading current patients…</p> : currentPatients.length === 0 ? (
        <p className="mc-empty">No current patients. Patients appear here after you confirm an appointment.</p>
      ) : (
        <div className="mc-patient-list">
          {currentPatients.map((patient) => {
            const patientReports = reports.filter((report) => report.patient?.id === patient.id);
            return (
              <div className="mc-patient-block" key={`${patient.id}-${patient.appointmentId}`}>
                <div className="mc-patient-heading">
                  <div><strong>{patient.name}</strong><span>{patient.id} · appointment {formatDateTime(patient.scheduledAt)}</span></div>
                  <span className={`mc-treatment mc-treatment-${patient.treatmentStatus}`}>{patient.treatmentStatus === "active" ? "Treatment active" : "Treatment not started"}</span>
                </div>
                {patientReports.length ? patientReports.map((report) => <ReportLine key={report.id} report={report} onOpen={onOpen} />) : <p className="mc-report-help">No report uploaded yet.</p>}
              </div>
            );
          })}
        </div>
      )}
      {error && <p className="mc-error">{error}</p>}
    </>
  );
}

export default function ClinicalReportsCard({ role }) {
  const reportsState = useReports(role);
  const appointmentsState = useAppointments(role);
  const [viewer, setViewer] = useState(null);

  async function openReport(report) {
    const result = await reportsState.openReport(report);
    if (result) setViewer(result);
  }

  useEffect(() => () => {
    if (viewer?.url) URL.revokeObjectURL(viewer.url);
  }, [viewer]);

  function closeViewer() {
    if (viewer?.url) URL.revokeObjectURL(viewer.url);
    setViewer(null);
  }

  return (
    <>
      <ChartCard title={role === "doctor" ? "Current patients & reports" : "My clinical reports"}>
      {role === "doctor" ? (
        <DoctorReports {...reportsState} onOpen={openReport} />
      ) : (
        <PatientReports
          reports={reportsState.reports}
          appointments={appointmentsState.appointments}
          onUpload={reportsState.upload}
          onOpen={openReport}
          loading={reportsState.loading || appointmentsState.loading}
          actionLoading={reportsState.actionLoading}
          error={reportsState.error || appointmentsState.error}
        />
      )}
      </ChartCard>
      {viewer && (
        <div className="mc-modal-backdrop" onClick={closeViewer}>
          <div className="mc-report-viewer" onClick={(e) => e.stopPropagation()}>
            <div className="mc-report-viewer-head">
              <strong>{viewer.fileName}</strong>
              <div className="mc-report-viewer-actions">
                <a className="mc-report-open" href={viewer.url} target="_blank" rel="noopener noreferrer">Open in new tab</a>
                <a className="mc-report-open" href={viewer.url} download={viewer.fileName}>Download</a>
                <button type="button" className="mc-modal-cancel" onClick={closeViewer}>Close</button>
              </div>
            </div>
            {viewer.mimeType.startsWith("image/") ? (
              <img src={viewer.url} alt={viewer.fileName} className="mc-report-image" />
            ) : (
              <iframe title={viewer.fileName} src={viewer.url} className="mc-report-frame" />
            )}
          </div>
        </div>
      )}
    </>
  );
}
