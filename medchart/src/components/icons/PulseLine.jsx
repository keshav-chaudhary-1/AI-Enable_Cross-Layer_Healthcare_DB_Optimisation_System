import "./PulseLine.css";

export default function PulseLine() {
  return (
    <svg
      className="mc-pulse-svg"
      viewBox="0 0 600 120"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path
        className="mc-pulse-path"
        d="M0 60 H150 L175 60 L195 20 L215 100 L235 60 L260 60 L280 40 L300 60 H600"
        stroke="var(--mc-red)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
