import Hero from "./Hero.jsx";
import AuthForm from "./AuthForm.jsx";
import "./GetStarted.css";

export default function GetStarted({ onLogin, onSignup, error, clearError, loading }) {
  return (
    <div className="mc-landing">
      <Hero />
      <AuthForm onLogin={onLogin} onSignup={onSignup} error={error} clearError={clearError} loading={loading} />
    </div>
  );
}
