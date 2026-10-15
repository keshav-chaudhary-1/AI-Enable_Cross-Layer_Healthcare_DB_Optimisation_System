import ProfileShell from "./ProfileShell.jsx";
import ChartCard from "./ChartCard.jsx";
import ChartRow from "./ChartRow.jsx";
import AppointmentsCard from "../appointments/AppointmentsCard.jsx";
import ClinicalReportsCard from "../reports/ClinicalReportsCard.jsx";

export default function DoctorProfile({ user, onLogout }) {
  return (
    <ProfileShell user={user} roleLabel="Doctor" onLogout={onLogout}>
      <div className="mc-grid">
        <ChartCard title="Doctor details">
          <ChartRow label="Doctor ID" value={user.id} />
          <ChartRow label="Email" value={user.email} />
          <ChartRow label="Specialization" value={user.specialization} />
          <ChartRow label="Department" value={user.department} />
        </ChartCard>

        <AppointmentsCard
          role="doctor"
          title="Appointments"
          emptyText="No appointments yet. Requests from patients will show up here."
        />

        <ClinicalReportsCard role="doctor" />
      </div>
    </ProfileShell>
  );
}
