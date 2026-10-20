import React, { createContext, useContext, useState, useEffect } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("jobs24_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("jobs24_token") || null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState("login"); // "login" or "register"
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      authService
        .getCurrentUser()
        .then((userData) => {
          setUser(userData);
          localStorage.setItem("jobs24_user", JSON.stringify(userData));
        })
        .catch(() => {
          // Token expired or invalid
          logout();
        });
    }
  }, [token]);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const res = await authService.login(username, password);
      setToken(res.token);
      const userData = {
        id: res.id,
        username: res.username,
        fullName: res.fullName,
        role: res.role,
      };
      setUser(userData);
      localStorage.setItem("jobs24_token", res.token);
      localStorage.setItem("jobs24_user", JSON.stringify(userData));
      setAuthModalOpen(false);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || "Login failed. Check your credentials.";
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, password, fullName, role) => {
    setLoading(true);
    try {
      const res = await authService.register(username, password, fullName, role);
      setToken(res.token);
      const userData = {
        id: res.id,
        username: res.username,
        fullName: res.fullName,
        role: res.role,
      };
      setUser(userData);
      localStorage.setItem("jobs24_token", res.token);
      localStorage.setItem("jobs24_user", JSON.stringify(userData));
      setAuthModalOpen(false);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || "Registration failed.";
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  const loginDemo = async (roleType) => {
    const username = roleType === "recruiter" ? "recruiter@demo.com" : "seeker@demo.com";
    const password = roleType === "recruiter" ? "recruiter123" : "seeker123";
    return login(username, password);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("jobs24_token");
    localStorage.removeItem("jobs24_user");
  };

  const openAuthModal = (tab = "login") => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isRecruiter: user?.role === "ROLE_RECRUITER",
        isJobSeeker: user?.role === "ROLE_JOB_SEEKER",
        loading,
        authModalOpen,
        authModalTab,
        setAuthModalTab,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        loginDemo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
