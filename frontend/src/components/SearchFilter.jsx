import React from "react";
import { useAuth } from "../context/AuthContext";

function SearchFilter({
    search,
    setSearch,
    status,
    setStatus,
    totalCount = 0,
    showForm,
    setShowForm
}) {
    const { isRecruiter } = useAuth();

    return (
        <div className="container mt-4">
            <div className="app-card p-3">
                <div className="row g-3 align-items-center">
                    {/* Search Bar */}
                    <div className="col-12 col-md-5">
                        <div className="input-group">
                            <span className="input-group-text border-end-0" style={{
                                backgroundColor: "var(--bg-elevated)",
                                borderColor: "var(--border-color)",
                                color: "var(--text-muted)",
                                borderRadius: "10px 0 0 10px"
                            }}>
                                🔍
                            </span>
                            <input
                                type="text"
                                className="form-control custom-input border-start-0"
                                style={{ borderRadius: "0 10px 10px 0" }}
                                placeholder="Search by company or role..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Status Dropdown */}
                    <div className="col-12 col-md-4">
                        <select
                            className="form-select custom-input"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">🎯 All Stages (Pipeline)</option>
                            <option value="APPLIED">📝 Applied</option>
                            <option value="SHORTLISTED">🌟 Shortlisted</option>
                            <option value="OA">⚡ Online Assessment (OA)</option>
                            <option value="INTERVIEW">🎯 Interview Round</option>
                            <option value="HR">🤝 HR Round</option>
                            <option value="OFFER">🏆 Offer Received</option>
                            <option value="REJECTED">❌ Rejected</option>
                        </select>
                    </div>

                    {/* Add Application / Post Opening Button */}
                    <div className="col-12 col-md-3 d-flex justify-content-md-end">
                        <button
                            type="button"
                            className="btn btn-gradient w-100 w-md-auto d-flex align-items-center justify-content-center gap-2"
                            onClick={() => setShowForm(!showForm)}
                        >
                            <span>
                                {showForm
                                    ? "✕ Close Form"
                                    : isRecruiter
                                    ? "💼 Post Job Opening"
                                    : "➕ Track Application"}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchFilter;