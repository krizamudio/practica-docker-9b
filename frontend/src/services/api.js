import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export const getActivities = async () => {
  const response = await api.get("/activities");
  return response.data;
};

export const createActivity = async (activity) => {
  const response = await api.post("/activities", activity);
  return response.data;
};

export const updateActivity = async (id, activity) => {
  const response = await api.put(`/activities/${id}`, activity);
  return response.data;
};

export const updateActivityStatus = async (id, status) => {
  const response = await api.patch(`/activities/${id}/status`, {
    status,
  });

  return response.data;
};

export const deleteActivity = async (id) => {
  const response = await api.delete(`/activities/${id}`);
  return response.data;
};

export const getSystemHealth = async () => {
  const response = await api.get("/health");
  return response.data;
};

export default api;