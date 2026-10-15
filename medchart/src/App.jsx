import { useAuth } from "./hooks/useAuth.js";
import GetStarted from "./components/auth/GetStarted.jsx";
import PatientProfile from "./components/profile/PatientProfile.jsx";
import DoctorProfile from "./components/profile/DoctorProfile.jsx";
import SessionLoading from "./components/common/SessionLoading.jsx";
import DeveloperDashboard from "./components/developer/DeveloperDashboard.jsx";

export default function App() {
  const { currentUser, error, loading, initializing, signup, login, logout, clearError } = useAuth();

  if (initializing) {
    return <SessionLoading />;
  }

  if (!currentUser) {
    return (
      <GetStarted onLogin={login} onSignup={signup} error={error} clearError={clearError} loading={loading} />
    );
  }

  if (currentUser.role === "developer") {
    return <DeveloperDashboard user={currentUser} onLogout={logout} />;
  }

  if (currentUser.role === "doctor") {
    return <DoctorProfile user={currentUser} onLogout={logout} />;
  }

  return <PatientProfile user={currentUser} onLogout={logout} />;
}
