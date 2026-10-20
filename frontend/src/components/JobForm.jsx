import { useEffect, useState } from "react";
import { addJob, updateJob } from "../services/jobService";
import { parseJobDescription } from "../services/aiService";

function JobForm({
    refreshJobs,
    selectedJob,
    setSelectedJob,
    showForm,
    setShowForm
}) {
    const emptyJob = {
        company: "",
        role: "",
        location: "",
        salary: "",
        status: "APPLIED",
        appliedDate: "",
        notes: ""
    };

    const [job, setJob] = useState(emptyJob);
    const [loading, setLoading] = useState(false);
    const [rawJd, setRawJd] = useState("");
    const [parsingJd, setParsingJd] = useState(false);
    const [showAiBox, setShowAiBox] = useState(false);

    useEffect(() => {
        if (selectedJob) {
            setJob(selectedJob);
            if (setShowForm) setShowForm(true);
        } else {
            setJob(emptyJob);
        }
    }, [selectedJob]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJob((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (selectedJob) {
                await updateJob(selectedJob.id, job);
                alert("✨ Job application updated successfully!");
                setSelectedJob(null);
            } else {
                await addJob(job);
                alert("✨ Job application added successfully!");
            }

            setJob(emptyJob);
            if (setShowForm) setShowForm(false);
            refreshJobs();
        } catch (error) {
            console.error("Submission Error:", error);
            alert("Failed to save application. Please verify backend is running.");
        } finally {
            setLoading(false);
        }
    };

    const handleAutoFill = async () => {
        if (!rawJd.trim()) {
            alert("Please paste some job description or LinkedIn post text first.");
            return;
        }
        setParsingJd(true);
        try {
            const res = await parseJobDescription(rawJd);
            const data = res.data || {};
            setJob((prev) => ({
                ...prev,
                company: data.company || prev.company,
                role: data.role || prev.role,
                location: data.location || prev.location,
                salary: data.salary || prev.salary,
                notes: data.notes || prev.notes
            }));
            setShowAiBox(false);
            setRawJd("");
            alert("✨ Form auto-filled by AI! Please review details below.");
        } catch (err) {
            console.error("AI Auto-fill error:", err);
            alert("Failed to auto-fill. Please check if backend is running.");
        } finally {
            setParsingJd(false);
        }
    };

    if (!showForm && !selectedJob) {
        return null;
    }

    return (
        <div className="container mt-4">
            <div className="app-card overflow-hidden">
                <div className="p-3 px-4 d-flex justify-content-between align-items-center" style={{
                    background: "var(--primary-gradient)",
                    color: "#ffffff"
                }}>
                    <div className="d-flex align-items-center gap-2">
                        <span className="fs-5">{selectedJob ? "✏️" : "➕"}</span>
                        <h5 className="mb-0 fw-bold">
                            {selectedJob ? "Edit Application" : "New Application"}
                        </h5>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        {!selectedJob && (
                            <button
                                type="button"
                                className="btn btn-sm btn-light py-1 px-3 d-flex align-items-center gap-1"
                                style={{ borderRadius: "20px", fontWeight: "600", fontSize: "0.78rem" }}
                                onClick={() => setShowAiBox(!showAiBox)}
                            >
                                ✨ {showAiBox ? "Hide AI Paste" : "AI Auto-Fill"}
                            </button>
                        )}
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            aria-label="Close"
                            onClick={() => {
                                setSelectedJob(null);
                                setJob(emptyJob);
                                if (setShowForm) setShowForm(false);
                            }}
                        ></button>
                    </div>
                </div>

                <div className="p-4">
                    {/* Collapsible AI Auto-Fill Box */}
                    {showAiBox && !selectedJob && (
                        <div className="p-3 rounded-3 mb-4" style={{
                            backgroundColor: "var(--bg-elevated)",
                            border: "1px dashed var(--primary-accent)"
                        }}>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <label className="form-label small fw-bold mb-0 text-primary d-flex align-items-center gap-1">
                                    <span>🤖</span> Paste Job Description or LinkedIn Text to Auto-Fill:
                                </label>
                            </div>
                            <textarea
                                className="form-control custom-input mb-2"
                                rows="3"
                                placeholder="Paste raw text here... (e.g. 'Amazon is looking for a Software Development Engineer in Bangalore. Package 35 LPA...')"
                                value={rawJd}
                                onChange={(e) => setRawJd(e.target.value)}
                            ></textarea>
                            <div className="d-flex justify-content-end">
                                <button
                                    type="button"
                                    className="btn btn-gradient btn-sm d-flex align-items-center gap-2"
                                    onClick={handleAutoFill}
                                    disabled={parsingJd}
                                >
                                    {parsingJd ? "⚡ Extracting..." : "⚡ Auto-Fill Form with AI"}
                                </button>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label small fw-semibold" style={{ color: "var(--text-muted)" }}>
                                    Company Name *
                                </label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    name="company"
                                    placeholder="e.g. Google, Amazon, Microsoft"
                                    value={job.company}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label small fw-semibold" style={{ color: "var(--text-muted)" }}>
                                    Role / Title *
                                </label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    name="role"
                                    placeholder="e.g. Software Development Engineer (SDE)"
                                    value={job.role}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label small fw-semibold" style={{ color: "var(--text-muted)" }}>
                                    Location
                                </label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    name="location"
                                    placeholder="e.g. Bangalore, Remote, Hybrid"
                                    value={job.location}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label small fw-semibold" style={{ color: "var(--text-muted)" }}>
                                    Salary / Compensation
                                </label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    name="salary"
                                    placeholder="e.g. 24 LPA or $120,000"
                                    value={job.salary}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label small fw-semibold" style={{ color: "var(--text-muted)" }}>
                                    Application Stage
                                </label>
                                <select
                                    className="form-select custom-input"
                                    name="status"
                                    value={job.status}
                                    onChange={handleChange}
                                >
                                    <option value="APPLIED">📝 APPLIED</option>
                                    <option value="SHORTLISTED">🌟 SHORTLISTED</option>
                                    <option value="OA">⚡ OA (Online Assessment)</option>
                                    <option value="INTERVIEW">🎯 INTERVIEW ROUND</option>
                                    <option value="HR">🤝 HR ROUND</option>
                                    <option value="OFFER">🏆 OFFER RECEIVED</option>
                                    <option value="REJECTED">❌ REJECTED</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label small fw-semibold" style={{ color: "var(--text-muted)" }}>
                                    Date Applied
                                </label>
                                <input
                                    type="date"
                                    className="form-control custom-input"
                                    name="appliedDate"
                                    value={job.appliedDate || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label small fw-semibold" style={{ color: "var(--text-muted)" }}>
                                    Notes / Referral / Links
                                </label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    name="notes"
                                    placeholder="e.g. Referred by John Doe, portal link..."
                                    value={job.notes}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top" style={{ borderColor: "var(--border-color)" }}>
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                style={{ borderRadius: "10px", padding: "0.5rem 1.25rem", fontWeight: "600" }}
                                onClick={() => {
                                    setSelectedJob(null);
                                    setJob(emptyJob);
                                    if (setShowForm) setShowForm(false);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-gradient d-flex align-items-center gap-2"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : selectedJob ? "Update Application" : "Save Application"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default JobForm;