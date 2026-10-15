import { useState } from "react";
import ChartCard from "../profile/ChartCard.jsx";
import AppointmentRow from "./AppointmentRow.jsx";
import BookAppointmentModal from "./BookAppointmentModal.jsx";
import { useAppointments } from "../../hooks/useAppointments.js";
import "./Appointments.css";

export default function AppointmentsCard({ role, title, emptyText }) {
  const { appointments, doctors, loading, error, actionLoading, clearError, book, setStatus, setTreatmentStatus } =
    useAppointments(role);
  const [showBooking, setShowBooking] = useState(false);

  return (
    <ChartCard title={title}>
      {role === "patient" && (
        <div className="mc-appt-header">
          <span />
          <button type="button" className="mc-book-btn" onClick={() => setShowBooking(true)}>
            Book appointment
          </button>
        </div>
      )}

      {loading ? (
        <p className="mc-empty">Loading…</p>
      ) : appointments.length === 0 ? (
        <p className="mc-empty">{emptyText}</p>
      ) : (
        <div className="mc-appt-list">
          {appointments.map((appt) => (
            <AppointmentRow
              key={appt.id}
              appointment={appt}
              role={role}
              onSetStatus={setStatus}
              onSetTreatment={setTreatmentStatus}
              actionLoading={actionLoading}
            />
          ))}
        </div>
      )}

      {!loading && error && <p className="mc-error">{error}</p>}

      {showBooking && (
        <BookAppointmentModal
          doctors={doctors}
          onBook={book}
          onClose={() => {
            setShowBooking(false);
            clearError();
          }}
          loading={actionLoading}
          error={error}
          clearError={clearError}
        />
      )}
    </ChartCard>
  );
}
