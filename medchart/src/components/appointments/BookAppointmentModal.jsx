import { useState } from "react";
import Field from "../common/Field.jsx";
import "./Appointments.css";

function defaultDateTimeLocal() {
  // Suggest tomorrow at 10:00 as a sane starting point.
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(10, 0, 0, 0);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(
    d.getMinutes()
  )}`;
}

export default function BookAppointmentModal({ doctors, onBook, onClose, loading, error, clearError }) {
  const [doctorId, setDoctorId] = useState(doctors[0]?.id || "");
  const [scheduledAt, setScheduledAt] = useState(defaultDateTimeLocal());
  const [reason, setReason] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!doctorId || !scheduledAt) return;
    const success = await onBook({
      doctorId,
      scheduledAt: new Date(scheduledAt).toISOString(),
      reason: reason.trim(),
    });
    if (success) onClose();
  }

  return (
    <div className="mc-modal-backdrop" onClick={onClose}>
      <div className="mc-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Book an appointment</h2>

        {doctors.length === 0 ? (
          <p className="mc-empty">No doctors are available to book with yet.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <Field label="Doctor">
              <select
                value={doctorId}
                onChange={(e) => {
                  setDoctorId(e.target.value);
                  clearError();
                }}
              >
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                    {d.specialization ? ` — ${d.specialization}` : ""}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Date & time">
              <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => {
                  setScheduledAt(e.target.value);
                  clearError();
                }}
              />
            </Field>

            <Field label="Reason for visit (optional)">
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Briefly describe what this is about"
              />
            </Field>

            {error && <p className="mc-error">{error}</p>}

            <div className="mc-modal-actions">
              <button type="button" className="mc-modal-cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="mc-submit" disabled={loading}>
                {loading ? "Booking…" : "Request appointment"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
