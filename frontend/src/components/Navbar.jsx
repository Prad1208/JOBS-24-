function Navbar({ darkMode, setDarkMode }) {
    return (
        <nav className="navbar navbar-expand-lg border-bottom sticky-top" style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-color)",
            backdropFilter: "blur(10px)"
        }}>
            <div className="container py-1">
                <div className="d-flex align-items-center gap-3">
                    <div className="company-avatar" style={{ width: "36px", height: "36px", fontSize: "1.1rem" }}>
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
                                AI POWERED
                            </span>
                        </a>
                        <div className="small" style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginTop: "-3px" }}>
                            Applicant Tracking System
                        </div>
                    </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                    <button
                        className="btn btn-sm d-flex align-items-center gap-2"
                        onClick={() => setDarkMode(!darkMode)}
                        style={{
                            backgroundColor: "var(--bg-elevated)",
                            color: "var(--text-main)",
                            border: "1px solid var(--border-color)",
                            borderRadius: "20px",
                            padding: "0.4rem 0.9rem",
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