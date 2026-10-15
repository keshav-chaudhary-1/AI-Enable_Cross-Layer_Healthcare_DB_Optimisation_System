import { useState } from "react";
import Field from "../common/Field.jsx";
import RoleSelector from "./RoleSelector.jsx";
import "./AuthForm.css";

const emptyForm = {
  name: "",
  email: "",
  password: "",
  dob: "",
  gender: "",
  bloodGroup: "",
  phone: "",
  specialization: "",
  department: "",
};

export default function AuthForm({ onLogin, onSignup, error, clearError, loading }) {
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [role, setRole] = useState("patient");
  const [form, setForm] = useState(emptyForm);

  function switchMode(nextMode) {
    setMode(nextMode);
    clearError();
  }

  function updateField(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
    clearError();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const success =
      mode === "login"
        ? await onLogin({ email: form.email, password: form.password })
        : await onSignup({ ...form, role });

    if (success) setForm(emptyForm);
  }

  return (
    <div className="mc-panel">
      <div className="mc-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "login"}
          className={`mc-tab ${mode === "login" ? "is-active" : ""}`}
          onClick={() => switchMode("login")}
        >
          Sign in
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "signup"}
          className={`mc-tab ${mode === "signup" ? "is-active" : ""}`}
          onClick={() => switchMode("signup")}
        >
          Create account
        </button>
      </div>

      <form className="mc-form" onSubmit={handleSubmit}>
        {mode === "signup" && (
          <>
            <RoleSelector role={role} onChange={setRole} />

            <Field label="Full name">
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder={role === "doctor" ? "Dr. Asha Verma" : "Ravi Kumar"}
                autoComplete="name"
              />
            </Field>
          </>
        )}

        <Field label="Email">
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </Field>

        <Field label="Password">
          <input
            type="password"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
            placeholder="••••••••"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />
        </Field>

        {mode === "signup" && role === "patient" && (
          <>
            <div className="mc-row">
              <Field label="Date of birth">
                <input type="date" value={form.dob} onChange={(e) => updateField("dob", e.target.value)} />
              </Field>
              <Field label="Gender">
                <select value={form.gender} onChange={(e) => updateField("gender", e.target.value)}>
                  <option value="">Select…</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </Field>
            </div>
            <div className="mc-row">
              <Field label="Blood group">
                <select value={form.bloodGroup} onChange={(e) => updateField("bloodGroup", e.target.value)}>
                  <option value="">Select…</option>
                  {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Phone">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="98765 43210"
                  autoComplete="tel"
                />
              </Field>
            </div>
          </>
        )}

        {mode === "signup" && role === "doctor" && (
          <div className="mc-row">
            <Field label="Specialization">
              <input
                type="text"
                value={form.specialization}
                onChange={(e) => updateField("specialization", e.target.value)}
                placeholder="Cardiology"
              />
            </Field>
            <Field label="Department">
              <input
                type="text"
                value={form.department}
                onChange={(e) => updateField("department", e.target.value)}
                placeholder="Internal Medicine"
              />
            </Field>
          </div>
        )}

        {error && <p className="mc-error">{error}</p>}

        <button type="submit" className="mc-submit" disabled={loading}>
          {loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
        </button>
      </form>

      <p className="mc-switch">
        {mode === "login" ? (
          <>
            New here? <button type="button" onClick={() => switchMode("signup")}>Create an account</button>
          </>
        ) : (
          <>
            Already have an account? <button type="button" onClick={() => switchMode("login")}>Sign in</button>
          </>
        )}
      </p>
    </div>
  );
}
