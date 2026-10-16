import { API_URL } from "../config.js";

async function request(path, token, options = {}) { const response = await fetch(`${API_URL}/performance-lab${path}`, { ...options, headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...(options.headers || {}) } }); const data = await response.json().catch(() => ({})); if (!response.ok) throw new Error(data.message || data.error || "Performance lab request failed."); return data; }
export const getLabOverviewRequest = (token) => request("", token);
export const getLabHistoryRequest = (token) => request("/history", token);
export const runLabRequest = (token, module, config = {}) => request("/run", token, { method: "POST", body: JSON.stringify({ module, config }) });
export const resetLabRequest = (token) => request("/reset", token, { method: "POST", body: "{}" });
