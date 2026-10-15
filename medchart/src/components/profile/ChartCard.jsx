import "./Profile.css";

export default function ChartCard({ title, children }) {
  return (
    <section className="mc-card">
      <h2>{title}</h2>
      <div className="mc-card-body">{children}</div>
    </section>
  );
}
