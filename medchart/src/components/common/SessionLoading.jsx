import "./SessionLoading.css";

export default function SessionLoading() {
  return (
    <div className="mc-session-loading" role="status" aria-live="polite">
      <span className="mc-session-pulse" aria-hidden="true" />
      <p>Checking your session…</p>
    </div>
  );
}
