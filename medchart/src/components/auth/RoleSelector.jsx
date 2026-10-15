import "./RoleSelector.css";

export default function RoleSelector({ role, onChange }) {
  return (
    <fieldset className="mc-role">
      <legend>I am a</legend>
      <div className="mc-role-options">
        <button
          type="button"
          className={`mc-badge ${role === "patient" ? "is-active" : ""}`}
          onClick={() => onChange("patient")}
        >
          Patient
        </button>
        <button
          type="button"
          className={`mc-badge ${role === "doctor" ? "is-active" : ""}`}
          onClick={() => onChange("doctor")}
        >
          Doctor
        </button>
      </div>
    </fieldset>
  );
}
