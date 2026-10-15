import { API_URL } from "../config.js";

export async function getQueryDashboardRequest(token) {
  const response = await fetch(`${API_URL}/developer/queries`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Developer metrics could not be loaded.");
  return data;
}

export async function getOsDashboardRequest(token) {
  const response = await fetch(`${API_URL}/developer/os`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "OS metrics could not be loaded.");
  return data;
}

export async function applyIndexRecommendationRequest(token, recommendation) {
  const response = await fetch(`${API_URL}/developer/optimizer/indexes`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(recommendation),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "The index could not be applied.");
  return data;
}
