import { API_URL } from "../config.js";

async function reportRequest(path, token, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Something went wrong. Please try again.");
  return data;
}

export function getReportsRequest(token) {
  return reportRequest("/reports", token);
}

export function uploadReportRequest(token, payload) {
  return reportRequest("/reports", token, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function downloadReportRequest(token, reportId, fileName) {
  const res = await fetch(`${API_URL}/reports/${reportId}/document`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error("The report could not be opened.");
  }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  return { url, mimeType: blob.type || "application/octet-stream", fileName };
}
