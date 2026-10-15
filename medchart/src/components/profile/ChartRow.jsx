import "./Profile.css";

export default function ChartRow({ label, value }) {
  return (
    <div className="mc-crow">
      <span className="mc-crow-label">{label}</span>
      <span className="mc-crow-value">{value || "—"}</span>
    </div>
  );
}
