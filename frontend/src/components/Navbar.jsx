import React from "react";
import { useAuth } from "../context/AuthContext";

function Navbar({ darkMode, setDarkMode }) {
    const { user, isAuthenticated, isRecruiter, logout, openAuthModal } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg border-bottom sticky-top" style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-color)",
            backdropFilter: "blur(10px)"
        }}>
            <div className="container py-1">
                <div className="d-flex align-items-center gap-3">
                    <div className="company-avatar" style={{ width: "38px", height: "38px", fontSize: "1.2rem" }}>
                        💼
                    </div>
                    <div>
                        <a className="navbar-brand fw-bold mb-0 p-0 fs-5 d-flex align-items-center gap-2" href="#" style={{ color: "var(--text-main)" }}>
                            JOBS 24
                            <span className="badge rounded-pill" style={{
                                background: "var(--primary-gradient)",
                                fontSize: "0.65rem",
                                fontWeight: "600",
                                letterSpacing: "0.05em"
                            }}>
                                AI POWERED ATS
                            </span>
                        </a>
                        <div className="small" style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginTop: "-3px" }}>
                            Applicant Tracking & AI Prep Platform
                        </div>
                    </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                    {/* User Auth Section */}
                    {isAuthenticated ? (
                        <div className="d-flex align-items-center gap-2">
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    padding: "0.35rem 0.75rem",
                                    borderRadius: "20px",
                                    background: "var(--bg-elevated)",
                                    border: "1px solid var(--border-color)",
                                    fontSize: "0.85rem",
                                    color: "var(--text-main)",
                                }}
                            >
                                <span style={{ fontSize: "1rem" }}>{isRecruiter ? "💼" : "👤"}</span>
                                <span style={{ fontWeight: 600 }}>{user.fullName || user.username}</span>
                                <span
                                    className="badge rounded-pill"
                                    style={{
                                        backgroundColor: isRecruiter ? "rgba(22, 163, 74, 0.15)" : "rgba(37, 99, 235, 0.15)",
                                        color: isRecruiter ? "#16a34a" : "#2563eb",
                                        fontWeight: 600,
                                        fontSize: "0.7rem",
                                        padding: "0.25rem 0.5rem",
                                    }}
                                >
                                    {isRecruiter ? "Recruiter" : "Job Seeker"}
                                </span>
                            </div>
                            <button
                                className="btn btn-sm"
                                onClick={logout}
                                title="Sign Out"
                                style={{
                                    backgroundColor: "transparent",
                                    color: "var(--text-muted)",
                                    border: "1px solid var(--border-color)",
                                    borderRadius: "20px",
                                    padding: "0.38rem 0.75rem",
                                    fontSize: "0.8rem",
                                    fontWeight: 500,
                                }}
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center gap-2">
                            <button
                                className="btn btn-sm btn-primary d-flex align-items-center gap-1"
                                onClick={() => openAuthModal("login")}
                                style={{
                                    borderRadius: "20px",
                                    padding: "0.4rem 0.95rem",
                                    fontSize: "0.85rem",
                                    fontWeight: 600,
                                    background: "var(--primary-gradient)",
                                    border: "none",
                                }}
                            >
                                <span>🔐</span> Sign In / Roles
                            </button>
                        </div>
                    )}

                    {/* Dark/Light mode toggle */}
                    <button
                        className="btn btn-sm d-flex align-items-center gap-2"
                        onClick={() => setDarkMode(!darkMode)}
                        style={{
                            backgroundColor: "var(--bg-elevated)",
                            color: "var(--text-main)",
                            border: "1px solid var(--border-color)",
                            borderRadius: "20px",
                            padding: "0.4rem 0.85rem",
                            fontWeight: "500",
                            fontSize: "0.85rem"
                        }}
                    >
                        {darkMode ? "☀️ Light" : "🌙 Dark"}
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;