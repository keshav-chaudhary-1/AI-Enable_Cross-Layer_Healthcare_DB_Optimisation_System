import { formatDateTime } from "../../utils/helpers.js";
import "./Appointments.css";

const STATUS_LABEL = {
  requested: "Requested",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
  completed: "Completed",
};

const TREATMENT_LABEL = {
  not_started: "Treatment not started",
  active: "Treatment active",
  completed: "Treatment completed",
};

export default function AppointmentRow({ appointment, role, onSetStatus, onSetTreatment, actionLoading }) {
  const other = role === "doctor" ? appointment.patient : appointment.doctor;
  const subtitle =
    role === "doctor"
      ? other?.id
      : [other?.specialization, other?.department].filter(Boolean).join(" · ") || other?.id;

  const canDoctorAct = role === "doctor" && appointment.status === "requested";
  const canStartTreatment = role === "doctor" && appointment.status === "confirmed" && appointment.treatmentStatus === "not_started";
  const canCompleteTreatment = role === "doctor" && appointment.status === "confirmed" && appointment.treatmentStatus === "active";
  const canPatientCancel =
    role === "patient" && (appointment.status === "requested" || appointment.status === "confirmed");

  return (
    <div className="mc-appt-row">
      <div className="mc-appt-main">
        <span className="mc-appt-who">{other?.name || "Unknown"}</span>
        <span className="mc-appt-when">{formatDateTime(appointment.scheduledAt)}</span>
        {appointment.reason && <span className="mc-appt-reason">{appointment.reason}</span>}
        {subtitle && role === "patient" && <span className="mc-appt-reason">{subtitle}</span>}
      </div>

      <div className="mc-appt-side">
        <div className="mc-appt-statuses">
          <span className={`mc-status mc-status-${appointment.status}`}>
            {STATUS_LABEL[appointment.status] || appointment.status}
          </span>
          {role === "doctor" && appointment.status === "confirmed" && (
            <span className={`mc-treatment mc-treatment-${appointment.treatmentStatus}`}>
              {TREATMENT_LABEL[appointment.treatmentStatus] || appointment.treatmentStatus}
            </span>
          )}
        </div>

        {(canDoctorAct || canStartTreatment || canCompleteTreatment || canPatientCancel) && (
          <div className="mc-appt-actions">
            {canDoctorAct && (
              <>
                <button
                  type="button"
                  className="mc-confirm"
                  disabled={actionLoading}
                  onClick={() => onSetStatus(appointment.id, "confirmed")}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="mc-cancel"
                  disabled={actionLoading}
                  onClick={() => onSetStatus(appointment.id, "cancelled")}
                >
                  Decline
                </button>
              </>
            )}
            {canStartTreatment && (
              <button
                type="button"
                disabled={actionLoading}
                className="mc-confirm"
                onClick={() => onSetTreatment(appointment.id, "active")}
              >
                Start treatment
              </button>
            )}
            {canCompleteTreatment && (
              <button
                type="button"
                disabled={actionLoading}
                onClick={() => onSetTreatment(appointment.id, "completed")}
              >
                Complete treatment
              </button>
            )}
            {canPatientCancel && (
              <button
                type="button"
                className="mc-cancel"
                disabled={actionLoading}
                onClick={() => onSetStatus(appointment.id, "cancelled")}
              >
                Cancel
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
