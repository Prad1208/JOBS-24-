import { useEffect, useState } from "react";
import { getJobs } from "../services/jobService";

import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";
import SearchFilter from "../components/SearchFilter";

function Home() {
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

            {/* AI Assistant Modal Placeholder */}
            {selectedAiJob && (
                <div
                    className="modal show d-block"
                    tabIndex="-1"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content app-card border-0" style={{ backgroundColor: "var(--bg-surface)", color: "var(--text-main)" }}>
                            <div className="modal-header border-bottom" style={{ borderColor: "var(--border-color)" }}>
                                <div className="d-flex align-items-center gap-2">
                                    <span className="fs-5">✨</span>
                                    <h5 className="modal-title fw-bold">
                                        AI Assistant for {selectedAiJob.company}
                                    </h5>
                                </div>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setSelectedAiJob(null)}
                                ></button>
                            </div>
                            <div className="modal-body p-4">
                                <p className="small mb-3" style={{ color: "var(--text-muted)" }}>
                                    Role: <strong>{selectedAiJob.role}</strong> | Status: <strong>{selectedAiJob.status}</strong>
                                </p>
                                <div className="p-3 rounded-3 mb-3" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-color)" }}>
                                    <h6 className="fw-bold mb-2">🚀 Coming Up in Phase 2:</h6>
                                    <ul className="small mb-0 ps-3" style={{ color: "var(--text-muted)" }}>
                                        <li>Generate customized Cover Letter for {selectedAiJob.company}</li>
                                        <li>Generate cold LinkedIn Referral message</li>
                                        <li>Predict top interview questions for {selectedAiJob.role}</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="modal-footer border-top" style={{ borderColor: "var(--border-color)" }}>
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => setSelectedAiJob(null)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;