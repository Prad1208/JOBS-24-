import { deleteJob, updateJobStatus } from "../services/jobService";
import StatusBadge from "./StatusBadge";

function JobList({
    jobs = [],
    refreshJobs,
    setSelectedJob,
    setShowForm,
    onOpenAiModal
}) {
    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateJobStatus(id, newStatus);
            refreshJobs();
        } catch (error) {
            console.error("Status Update Error:", error);
            alert("Failed to update status.");
        }
    };

    const handleDelete = async (id, company) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete the application for "${company}"?`
        );
        if (!confirmDelete) return;

        try {
            await deleteJob(id);
            refreshJobs();
        } catch (error) {
            console.error("Delete Error:", error);
            alert("Failed to delete application.");
        }
    };

    return (
        <div className="container mt-4 mb-5">
            <div className="app-card overflow-hidden">
                <div className="p-3 px-4 d-flex justify-content-between align-items-center border-bottom" style={{ borderColor: "var(--border-color)" }}>
                    <div className="d-flex align-items-center gap-2">
                        <span className="fs-5">📋</span>
                        <h5 className="mb-0 fw-bold" style={{ color: "var(--text-main)" }}>
                            Applications Pipeline
                        </h5>
                        <span className="badge rounded-pill ms-2" style={{
                            backgroundColor: "var(--bg-elevated)",
                            color: "var(--text-muted)",
                            border: "1px solid var(--border-color)",
                            fontSize: "0.75rem",
                            fontWeight: "600"
                        }}>
                            {jobs.length} Total
                        </span>
                    </div>
                </div>

                {jobs.length === 0 ? (
                    <div className="text-center py-5 px-3">
                        <div className="fs-1 mb-2">🔍</div>
                        <h6 className="fw-bold mb-1" style={{ color: "var(--text-main)" }}>
                            No Applications Found
                        </h6>
                        <p className="small mb-3" style={{ color: "var(--text-muted)" }}>
                            Try adjusting your search filters or add a new job application.
                        </p>
                        {setShowForm && (
                            <button
                                className="btn btn-gradient btn-sm"
                                onClick={() => setShowForm(true)}
                            >
                                ➕ Add Application
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>Company & Role</th>
                                    <th>Location</th>
                                    <th>Compensation</th>
                                    <th>Stage</th>
                                    <th>Date Applied</th>
                                    <th>Notes</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job) => {
                                    const initial = (job.company || "?").charAt(0).toUpperCase();
                                    return (
                                        <tr key={job.id}>
                                            {/* Company & Role with Avatar */}
                                            <td>
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="company-avatar">
                                                        {initial}
                                                    </div>
                                                    <div>
                                                        <div className="fw-bold" style={{ color: "var(--text-main)" }}>
                                                            {job.company}
                                                        </div>
                                                        <div className="small" style={{ color: "var(--text-muted)" }}>
                                                            {job.role}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Location */}
                                            <td>
                                                <span style={{ color: "var(--text-main)", fontSize: "0.9rem" }}>
                                                    {job.location || "—"}
                                                </span>
                                            </td>

                                            {/* Salary */}
                                            <td>
                                                <span className="badge" style={{
                                                    backgroundColor: "var(--bg-elevated)",
                                                    color: "var(--text-main)",
                                                    border: "1px solid var(--border-color)",
                                                    fontWeight: "600",
                                                    fontSize: "0.8rem",
                                                    padding: "0.35rem 0.6rem"
                                                }}>
                                                    {job.salary || "Not Specified"}
                                                </span>
                                            </td>

                                            {/* Status Badge & Quick Transition */}
                                            <td>
                                                <div className="d-flex align-items-center gap-2">
                                                    <StatusBadge status={job.status} />
                                                    <select
                                                        className="form-select form-select-sm border-0 py-0 px-1"
                                                        style={{
                                                            width: "auto",
                                                            fontSize: "0.75rem",
                                                            backgroundColor: "var(--bg-elevated)",
                                                            color: "var(--text-muted)",
                                                            borderRadius: "6px",
                                                            cursor: "pointer",
                                                            height: "26px"
                                                        }}
                                                        value={job.status}
                                                        onChange={(e) => handleStatusChange(job.id, e.target.value)}
                                                        title="Advance or change application stage"
                                                    >
                                                        <option value="APPLIED">📝 Applied</option>
                                                        <option value="SHORTLISTED">🌟 Shortlisted</option>
                                                        <option value="OA">⚡ OA</option>
                                                        <option value="INTERVIEW">🎯 Interview</option>
                                                        <option value="HR">🤝 HR Round</option>
                                                        <option value="OFFER">🏆 Offer</option>
                                                        <option value="REJECTED">❌ Rejected</option>
                                                    </select>
                                                </div>
                                            </td>

                                            {/* Date Applied */}
                                            <td>
                                                <span className="small" style={{ color: "var(--text-muted)" }}>
                                                    {job.appliedDate || "—"}
                                                </span>
                                            </td>

                                            {/* Notes */}
                                            <td style={{ maxWidth: "180px" }}>
                                                <span
                                                    className="small text-truncate d-inline-block"
                                                    style={{ maxWidth: "160px", color: "var(--text-muted)" }}
                                                    title={job.notes}
                                                >
                                                    {job.notes || "—"}
                                                </span>
                                            </td>

                                            {/* Action Buttons */}
                                            <td className="text-end">
                                                <div className="d-flex justify-content-end gap-1">
                                                    {onOpenAiModal && (
                                                        <button
                                                            className="btn btn-sm d-flex align-items-center gap-1"
                                                            style={{
                                                                background: "rgba(124, 58, 237, 0.1)",
                                                                color: "#7c3aed",
                                                                border: "1px solid rgba(124, 58, 237, 0.2)",
                                                                borderRadius: "8px",
                                                                fontSize: "0.78rem",
                                                                fontWeight: "600"
                                                            }}
                                                            title="AI Assistant for this job"
                                                            onClick={() => onOpenAiModal(job)}
                                                        >
                                                            ✨ AI
                                                        </button>
                                                    )}
                                                    <button
                                                        className="btn btn-sm"
                                                        style={{
                                                            backgroundColor: "var(--bg-elevated)",
                                                            color: "var(--text-main)",
                                                            border: "1px solid var(--border-color)",
                                                            borderRadius: "8px",
                                                            fontSize: "0.8rem"
                                                        }}
                                                        title="Edit Job"
                                                        onClick={() => {
                                                            setSelectedJob(job);
                                                            if (setShowForm) setShowForm(true);
                                                        }}
                                                    >
                                                        ✏️
                                                    </button>
                                                    <button
                                                        className="btn btn-sm"
                                                        style={{
                                                            backgroundColor: "rgba(239, 68, 68, 0.08)",
                                                            color: "#ef4444",
                                                            border: "1px solid rgba(239, 68, 68, 0.2)",
                                                            borderRadius: "8px",
                                                            fontSize: "0.8rem"
                                                        }}
                                                        title="Delete Job"
                                                        onClick={() => handleDelete(job.id, job.company)}
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default JobList;