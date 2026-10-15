import { API_URL } from "../config.js";

async function authedRequest(path, token, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }

  return data;
}

export function getDoctorsRequest(token) {
  return authedRequest("/appointments/doctors", token);
}

export function getMyAppointmentsRequest(token) {
  return authedRequest("/appointments", token);
}

export function getCurrentPatientsRequest(token) {
  return authedRequest("/appointments/current-patients", token);
}

export function bookAppointmentRequest(token, { doctorId, scheduledAt, reason }) {
  return authedRequest("/appointments", token, {
    method: "POST",
    body: JSON.stringify({ doctorId, scheduledAt, reason }),
  });
}

export function updateAppointmentStatusRequest(token, appointmentId, status) {
  return authedRequest(`/appointments/${appointmentId}/status`, token, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function updateTreatmentStatusRequest(token, appointmentId, treatmentStatus) {
  return authedRequest(`/appointments/${appointmentId}/treatment`, token, {
    method: "PATCH",
    body: JSON.stringify({ treatmentStatus }),
  });
}
