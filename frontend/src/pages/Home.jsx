import { useEffect, useState } from "react";
import { getJobs } from "../services/jobService";
import { useAuth } from "../context/AuthContext";

import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";
import SearchFilter from "../components/SearchFilter";
import AiAssistantModal from "../components/AiAssistantModal";

function Home() {
    const { user, isAuthenticated, isRecruiter, loginDemo, openAuthModal } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("jobs24_theme") === "dark";
    });
    const [showForm, setShowForm] = useState(false);
    const [selectedAiJob, setSelectedAiJob] = useState(null);

    // Sync data-theme attribute with document root
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
        localStorage.setItem("jobs24_theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const fetchJobs = () => {
        getJobs()
            .then((response) => {
                setJobs(response.data || []);
            })
            .catch((error) => {
                console.error("Fetch Jobs Error:", error);
            });
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter((job) => {
        const companyMatch = (job.company || "").toLowerCase().includes(search.toLowerCase());
        const roleMatch = (job.role || "").toLowerCase().includes(search.toLowerCase());
        const matchesSearch = companyMatch || roleMatch;
        const matchesStatus = status === "" || job.status === status;
        return matchesSearch && matchesStatus;
    });

    return (
        <div style={{ minHeight: "100vh" }}>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

            {/* Quick Demo & Role Bar */}
            <div
                style={{
                    backgroundColor: "var(--bg-elevated)",
                    borderBottom: "1px solid var(--border-color)",
                    padding: "0.55rem 0",
                    fontSize: "0.83rem",
                }}
            >
                <div className="container d-flex flex-wrap align-items-center justify-content-between gap-2">
                    {isAuthenticated ? (
                        <div className="d-flex align-items-center gap-2">
                            <span>{isRecruiter ? "💼" : "👤"}</span>
                            <span style={{ color: "var(--text-main)" }}>
                                Active Role: <strong>{user.fullName}</strong> ({isRecruiter ? "Recruiter / Hiring Lead" : "Job Seeker"})
                            </span>
                            <span className="text-muted">•</span>
                            <span className="text-muted" style={{ fontSize: "0.78rem" }}>
                                {isRecruiter
                                    ? "Full authority to post openings, review applicants & update candidate stages."
                                    : "Full access to track status, parse JDs & generate AI Cover Letters, Outreach & Interview prep."}
                            </span>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center gap-2">
                            <span>🚀</span>
                            <span style={{ color: "var(--text-main)", fontWeight: 500 }}>
                                Live ATS & AI Assistant Demo:
                            </span>
                            <span className="text-muted">
                                Test JWT authentication with roles or browse freely.
                            </span>
                        </div>
                    )}

                    <div className="d-flex align-items-center gap-2">
                        {isAuthenticated ? (
                            <button
                                className="btn btn-sm"
                                onClick={() => loginDemo(isRecruiter ? "seeker" : "recruiter")}
                                style={{
                                    backgroundColor: "var(--bg-surface)",
                                    border: "1px solid var(--border-color)",
                                    color: "var(--text-main)",
                                    borderRadius: "15px",
                                    padding: "0.2rem 0.65rem",
                                    fontSize: "0.78rem",
                                    fontWeight: 600,
                                }}
                            >
                                🔄 Switch to {isRecruiter ? "Job Seeker Role" : "Recruiter Role"}
                            </button>
                        ) : (
                            <>
                                <button
                                    className="btn btn-sm"
                                    onClick={() => loginDemo("seeker")}
                                    style={{
                                        backgroundColor: "#eff6ff",
                                        border: "1px solid #bfdbfe",
                                        color: "#1d4ed8",
                                        borderRadius: "15px",
                                        padding: "0.2rem 0.65rem",
                                        fontSize: "0.78rem",
                                        fontWeight: 600,
                                    }}
                                >
                                    ⚡ 1-Click Job Seeker
                                </button>
                                <button
                                    className="btn btn-sm"
                                    onClick={() => loginDemo("recruiter")}
                                    style={{
                                        backgroundColor: "#f0fdf4",
                                        border: "1px solid #bbf7d0",
                                        color: "#15803d",
                                        borderRadius: "15px",
                                        padding: "0.2rem 0.65rem",
                                        fontSize: "0.78rem",
                                        fontWeight: 600,
                                    }}
                                >
                                    ⚡ 1-Click Recruiter
                                </button>
                                <button
                                    className="btn btn-sm btn-link p-0 text-decoration-none"
                                    onClick={() => openAuthModal("register")}
                                    style={{ fontSize: "0.78rem", fontWeight: 600 }}
                                >
                                    Register Free
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <main className="pb-5">
                <Dashboard jobs={jobs} />

                <SearchFilter
                    search={search}
                    setSearch={setSearch}
                    status={status}
                    setStatus={setStatus}
                    totalCount={filteredJobs.length}
                    showForm={showForm}
                    setShowForm={setShowForm}
                />

                <JobForm
                    refreshJobs={fetchJobs}
                    selectedJob={selectedJob}
                    setSelectedJob={setSelectedJob}
                    showForm={showForm}
                    setShowForm={setShowForm}
                />

                <JobList
                    jobs={filteredJobs}
                    refreshJobs={fetchJobs}
                    setSelectedJob={setSelectedJob}
                    setShowForm={setShowForm}
                    onOpenAiModal={(job) => setSelectedAiJob(job)}
                />
            </main>

            {/* AI Assistant Modal */}
            {selectedAiJob && (
                <AiAssistantModal
                    job={selectedAiJob}
                    onClose={() => setSelectedAiJob(null)}
                />
            )}
        </div>
    );
}

export default Home;