import { useState, useEffect } from "react";
import { signupRequest, loginRequest, meRequest } from "../api/authApi.js";
import { getToken, setToken, clearToken } from "../utils/session.js";

// Talks to the Express + PostgreSQL backend in /server. On mount, if a
// session token is saved in localStorage, it's verified against the
// backend so a page refresh doesn't log the person out.
export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setInitializing(false);
      return;
    }

    meRequest(token)
      .then(({ user }) => setCurrentUser(user))
      .catch(() => clearToken())
      .finally(() => setInitializing(false));
  }, []);

  function clearError() {
    if (error) setError("");
  }

  async function signup(payload) {
    setLoading(true);
    try {
      const { user, token } = await signupRequest(payload);
      setToken(token);
      setCurrentUser(user);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function login(credentials) {
    setLoading(true);
    try {
      const { user, token } = await loginRequest(credentials);
      setToken(token);
      setCurrentUser(user);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    clearToken();
    setCurrentUser(null);
    setError("");
  }

  return { currentUser, error, loading, initializing, signup, login, logout, clearError };
}
