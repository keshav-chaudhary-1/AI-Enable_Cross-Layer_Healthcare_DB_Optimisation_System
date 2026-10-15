import PulseMark from "../icons/PulseMark.jsx";
import PulseLine from "../icons/PulseLine.jsx";
import "./Hero.css";

export default function Hero() {
  return (
    <div className="mc-hero">
      <div className="mc-hero-top">
        <span className="mc-mark">
          <PulseMark />
        </span>
        <span className="mc-wordmark">MedChart</span>
      </div>

      <h1 className="mc-headline">
        One record.
        <br />
        Every heartbeat of care.
      </h1>
      <p className="mc-sub">
        Patients and doctors share one chart, read from opposite sides of the
        desk. Sign in to pick up where you left off, or set up your account
        to get started.
      </p>

      <div className="mc-pulse-wrap">
        <PulseLine />
      </div>
    </div>
  );
}
