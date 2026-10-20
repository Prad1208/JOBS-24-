import api from "./api";

export const login = async (username, password) => {
  const response = await api.post("/api/auth/login", { username, password });
  return response.data;
};

export const register = async (username, password, fullName, role) => {
  const response = await api.post("/api/auth/register", { username, password, fullName, role });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/api/auth/me");
  return response.data;
};

export const getDemoAccounts = async () => {
  const response = await api.get("/api/auth/demo-accounts");
  return response.data;
};
