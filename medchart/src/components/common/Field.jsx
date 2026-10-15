import "./Field.css";

export default function Field({ label, children }) {
  return (
    <label className="mc-field">
      <span>{label}</span>
      {children}
    </label>
  );
}
