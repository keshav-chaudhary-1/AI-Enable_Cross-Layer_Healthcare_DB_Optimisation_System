import ProfileShell from "./ProfileShell.jsx";
import ChartCard from "./ChartCard.jsx";
import ChartRow from "./ChartRow.jsx";
import AppointmentsCard from "../appointments/AppointmentsCard.jsx";
import { age } from "../../utils/helpers.js";
import ClinicalReportsCard from "../reports/ClinicalReportsCard.jsx";

export default function PatientProfile({ user, onLogout }) {
  const patientAge = age(user.dob);

  return (
    <ProfileShell user={user} roleLabel="Patient" onLogout={onLogout}>
      <div className="mc-grid">
        <ChartCard title="Patient details">
          <ChartRow label="Patient ID" value={user.id} />
          <ChartRow label="Email" value={user.email} />
          <ChartRow label="Date of birth" value={user.dob} />
          <ChartRow label="Age" value={patientAge !== null ? `${patientAge} yrs` : "—"} />
          <ChartRow label="Gender" value={user.gender} />
          <ChartRow label="Blood group" value={user.bloodGroup} />
          <ChartRow label="Phone" value={user.phone} />
        </ChartCard>

        <AppointmentsCard
          role="patient"
          title="Upcoming appointments"
          emptyText="No appointments scheduled yet. Use “Book appointment” to request a visit."
        />

        <ClinicalReportsCard role="patient" />
      </div>
    </ProfileShell>
  );
}
