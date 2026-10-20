import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const AuthModal = () => {
  const {
    authModalOpen,
    authModalTab,
    setAuthModalTab,
    closeAuthModal,
    login,
    register,
    loginDemo,
    loading,
  } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("ROLE_JOB_SEEKER");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!authModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (authModalTab === "login") {
      const res = await login(username, password);
      if (!res.success) {
        setErrorMsg(res.error);
      }
    } else {
      if (!username || !password) {
        setErrorMsg("Username and password are required.");
        return;
      }
      const res = await register(username, password, fullName, role);
      if (!res.success) {
        setErrorMsg(res.error);
      }
    }
  };

  const handleQuickDemo = async (roleType) => {
    setErrorMsg("");
    setSuccessMsg(`Signing in as demo ${roleType}...`);
    const res = await loginDemo(roleType);
    if (!res.success) {
      setErrorMsg(res.error);
      setSuccessMsg("");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.65)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
        animation: "fadeIn 0.2s ease-out",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
    >
      <div
        style={{
          background: "var(--card-bg, #ffffff)",
          border: "1px solid var(--border-color, #e2e8f0)",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "460px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          overflow: "hidden",
          color: "var(--text-main, #0f172a)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--border-color, #e2e8f0)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.3rem" }}>🔐</span>
            <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>
              {authModalTab === "login" ? "Sign In to Jobs 24" : "Create Jobs 24 Account"}
            </h3>
          </div>
          <button
            onClick={closeAuthModal}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "1.25rem",
              cursor: "pointer",
              color: "var(--text-muted, #64748b)",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Tab switch */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid var(--border-color, #e2e8f0)",
            background: "var(--bg-subtle, #f8fafc)",
          }}
        >
          <button
            onClick={() => {
              setAuthModalTab("login");
              setErrorMsg("");
              setSuccessMsg("");
            }}
            style={{
              flex: 1,
              padding: "0.75rem",
              background: "transparent",
              border: "none",
              borderBottom: authModalTab === "login" ? "3px solid #2563eb" : "3px solid transparent",
              fontWeight: authModalTab === "login" ? 700 : 500,
              color: authModalTab === "login" ? "#2563eb" : "var(--text-muted, #64748b)",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setAuthModalTab("register");
              setErrorMsg("");
              setSuccessMsg("");
            }}
            style={{
              flex: 1,
              padding: "0.75rem",
              background: "transparent",
              border: "none",
              borderBottom: authModalTab === "register" ? "3px solid #2563eb" : "3px solid transparent",
              fontWeight: authModalTab === "register" ? 700 : 500,
              color: authModalTab === "register" ? "#2563eb" : "var(--text-muted, #64748b)",
              cursor: "pointer",
            }}
          >
            Create Account
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "1.5rem" }}>
          {/* Quick Demo Test Buttons */}
          <div
            style={{
              marginBottom: "1.25rem",
              padding: "0.85rem",
              background: "rgba(37, 99, 235, 0.06)",
              borderRadius: "10px",
              border: "1px dashed rgba(37, 99, 235, 0.35)",
            }}
          >
            <div
              style={{
                fontSize: "0.78rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#2563eb",
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <span>⚡</span> Fast Demo Access (No Typing Required)
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              <button
                type="button"
                onClick={() => handleQuickDemo("seeker")}
                disabled={loading}
                style={{
                  padding: "0.5rem 0.6rem",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  borderRadius: "8px",
                  background: "#eff6ff",
                  border: "1px solid #bfdbfe",
                  color: "#1d4ed8",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.3rem",
                }}
              >
                👤 Job Seeker Demo
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("recruiter")}
                disabled={loading}
                style={{
                  padding: "0.5rem 0.6rem",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  borderRadius: "8px",
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  color: "#15803d",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.3rem",
                }}
              >
                💼 Recruiter Demo
              </button>
            </div>
          </div>

          {errorMsg && (
            <div
              style={{
                padding: "0.65rem 0.85rem",
                marginBottom: "1rem",
                borderRadius: "8px",
                background: "#fef2f2",
                color: "#b91c1c",
                fontSize: "0.85rem",
                border: "1px solid #fecaca",
              }}
            >
              ⚠️ {errorMsg}
            </div>
          )}

          {successMsg && (
            <div
              style={{
                padding: "0.65rem 0.85rem",
                marginBottom: "1rem",
                borderRadius: "8px",
                background: "#f0fdf4",
                color: "#15803d",
                fontSize: "0.85rem",
                border: "1px solid #bbf7d0",
              }}
            >
              ✓ {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {authModalTab === "register" && (
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "8px",
                    border: "1px solid var(--border-color, #cbd5e1)",
                    fontSize: "0.9rem",
                    background: "var(--input-bg, #ffffff)",
                    color: "inherit",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            )}

            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                Username / Email
              </label>
              <input
                type="text"
                required
                placeholder="name@example.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.65rem 0.85rem",
                  borderRadius: "8px",
                  border: "1px solid var(--border-color, #cbd5e1)",
                  fontSize: "0.9rem",
                  background: "var(--input-bg, #ffffff)",
                  color: "inherit",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.65rem 0.85rem",
                  borderRadius: "8px",
                  border: "1px solid var(--border-color, #cbd5e1)",
                  fontSize: "0.9rem",
                  background: "var(--input-bg, #ffffff)",
                  color: "inherit",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {authModalTab === "register" && (
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                  Select Account Role
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  <label
                    style={{
                      border: role === "ROLE_JOB_SEEKER" ? "2px solid #2563eb" : "1px solid var(--border-color, #cbd5e1)",
                      borderRadius: "10px",
                      padding: "0.65rem 0.75rem",
                      cursor: "pointer",
                      background: role === "ROLE_JOB_SEEKER" ? "rgba(37, 99, 235, 0.06)" : "transparent",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.2rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <input
                        type="radio"
                        name="userRole"
                        checked={role === "ROLE_JOB_SEEKER"}
                        onChange={() => setRole("ROLE_JOB_SEEKER")}
                      />
                      <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>Job Seeker</span>
                    </div>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted, #64748b)" }}>
                      Track applications & AI prep
                    </span>
                  </label>

                  <label
                    style={{
                      border: role === "ROLE_RECRUITER" ? "2px solid #16a34a" : "1px solid var(--border-color, #cbd5e1)",
                      borderRadius: "10px",
                      padding: "0.65rem 0.75rem",
                      cursor: "pointer",
                      background: role === "ROLE_RECRUITER" ? "rgba(22, 163, 74, 0.06)" : "transparent",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.2rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <input
                        type="radio"
                        name="userRole"
                        checked={role === "ROLE_RECRUITER"}
                        onChange={() => setRole("ROLE_RECRUITER")}
                      />
                      <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>Recruiter</span>
                    </div>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted, #64748b)" }}>
                      Post jobs & manage pipeline
                    </span>
                  </label>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "0.5rem",
                padding: "0.75rem",
                background: "#2563eb",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "0.95rem",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.25)",
              }}
            >
              {loading
                ? "Processing..."
                : authModalTab === "login"
                ? "Sign In with JWT"
                : "Create Account with Role"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
