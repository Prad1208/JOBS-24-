import { useState } from "react";
import {
    generateCoverLetter,
    generateOutreach,
    generateInterviewPrep,
    analyzeMatch
} from "../services/aiService";

function AiAssistantModal({ job, onClose }) {
    const [activeTab, setActiveTab] = useState("coverLetter");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    // AI Responses State
    const [coverLetter, setCoverLetter] = useState("");
    const [outreach, setOutreach] = useState(null);
    const [prepData, setPrepData] = useState(null);
    const [matchData, setMatchData] = useState(null);

    // Optional user candidate input
    const [candidateProfile, setCandidateProfile] = useState("Java, Spring Boot, MySQL, React, REST APIs, Docker");

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleGenerateCoverLetter = async () => {
        setLoading(true);
        try {
            const res = await generateCoverLetter(job.company, job.role, job.notes || "", candidateProfile);
            setCoverLetter(res.data.coverLetter || "");
        } catch (err) {
            console.error(err);
            alert("Failed to generate cover letter. Please ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateOutreach = async () => {
        setLoading(true);
        try {
            const res = await generateOutreach(job.company, job.role, candidateProfile);
            setOutreach(res.data || null);
        } catch (err) {
            console.error(err);
            alert("Failed to generate outreach. Please ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateInterviewPrep = async () => {
        setLoading(true);
        try {
            const res = await generateInterviewPrep(job.company, job.role, job.notes || "");
            setPrepData(res.data || null);
        } catch (err) {
            console.error(err);
            alert("Failed to generate interview prep. Please ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    const handleAnalyzeMatch = async () => {
        setLoading(true);
        try {
            const res = await analyzeMatch(candidateProfile, job.notes || `${job.company} ${job.role}`);
            setMatchData(res.data || null);
        } catch (err) {
            console.error(err);
            alert("Failed to analyze match. Please ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
        >
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content app-card border-0" style={{ backgroundColor: "var(--bg-surface)", color: "var(--text-main)" }}>
                    {/* Modal Header */}
                    <div className="modal-header border-bottom p-3 px-4 d-flex justify-content-between align-items-center" style={{ borderColor: "var(--border-color)", background: "var(--primary-gradient)", color: "#fff" }}>
                        <div className="d-flex align-items-center gap-2">
                            <span className="fs-4">✨</span>
                            <div>
                                <h5 className="modal-title fw-bold mb-0">
                                    AI Career Assistant • {job.company}
                                </h5>
                                <div style={{ fontSize: "0.8rem", opacity: 0.9 }}>
                                    Role: <strong>{job.role}</strong> | Pipeline Stage: <strong>{job.status}</strong>
                                </div>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="d-flex border-bottom p-2 px-3 gap-2 flex-wrap" style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--border-color)" }}>
                        <button
                            className={`btn btn-sm ${activeTab === "coverLetter" ? "btn-gradient" : "btn-outline-secondary"}`}
                            style={{ borderRadius: "8px", fontWeight: "600" }}
                            onClick={() => { setActiveTab("coverLetter"); if (!coverLetter) handleGenerateCoverLetter(); }}
                        >
                            ✉️ Cover Letter
                        </button>
                        <button
                            className={`btn btn-sm ${activeTab === "outreach" ? "btn-gradient" : "btn-outline-secondary"}`}
                            style={{ borderRadius: "8px", fontWeight: "600" }}
                            onClick={() => { setActiveTab("outreach"); if (!outreach) handleGenerateOutreach(); }}
                        >
                            💼 LinkedIn Outreach
                        </button>
                        <button
                            className={`btn btn-sm ${activeTab === "interviewPrep" ? "btn-gradient" : "btn-outline-secondary"}`}
                            style={{ borderRadius: "8px", fontWeight: "600" }}
                            onClick={() => { setActiveTab("interviewPrep"); if (!prepData) handleGenerateInterviewPrep(); }}
                        >
                            🎯 Interview Prep
                        </button>
                        <button
                            className={`btn btn-sm ${activeTab === "matchScore" ? "btn-gradient" : "btn-outline-secondary"}`}
                            style={{ borderRadius: "8px", fontWeight: "600" }}
                            onClick={() => { setActiveTab("matchScore"); if (!matchData) handleAnalyzeMatch(); }}
                        >
                            📈 Match & Skill Gap
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="modal-body p-4">
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary mb-3" role="status"></div>
                                <h6 className="fw-bold">AI is thinking...</h6>
                                <p className="small text-muted">Analyzing {job.company} & {job.role} context</p>
                            </div>
                        ) : (
                            <>
                                {/* TAB 1: COVER LETTER */}
                                {activeTab === "coverLetter" && (
                                    <div>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="fw-bold mb-0">Tailored Cover Letter for {job.company}</h6>
                                            <div className="d-flex gap-2">
                                                <button className="btn btn-sm btn-outline-secondary" onClick={handleGenerateCoverLetter}>
                                                    🔄 Regenerate
                                                </button>
                                                {coverLetter && (
                                                    <button className="btn btn-sm btn-success" onClick={() => copyToClipboard(coverLetter)}>
                                                        {copied ? "✓ Copied!" : "📋 Copy"}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        {coverLetter ? (
                                            <div
                                                className="p-3 rounded-3"
                                                style={{
                                                    backgroundColor: "var(--bg-elevated)",
                                                    border: "1px solid var(--border-color)",
                                                    whiteSpace: "pre-line",
                                                    lineHeight: "1.6",
                                                    fontSize: "0.92rem"
                                                }}
                                            >
                                                {coverLetter}
                                            </div>
                                        ) : (
                                            <div className="text-center py-4">
                                                <button className="btn btn-gradient" onClick={handleGenerateCoverLetter}>
                                                    Generate Cover Letter
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* TAB 2: LINKEDIN OUTREACH */}
                                {activeTab === "outreach" && (
                                    <div>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="fw-bold mb-0">LinkedIn Referral & Recruiter Messages</h6>
                                            <button className="btn btn-sm btn-outline-secondary" onClick={handleGenerateOutreach}>
                                                🔄 Regenerate
                                            </button>
                                        </div>
                                        {outreach ? (
                                            <div className="d-flex flex-column gap-3">
                                                <div className="p-3 rounded-3" style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-color)" }}>
                                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                                        <span className="fw-bold small text-primary">👨‍💻 1. Cold Referral Message (To an Engineer / Peer)</span>
                                                        <button className="btn btn-sm btn-outline-primary py-0" onClick={() => copyToClipboard(outreach.engineerMessage)}>
                                                            📋 Copy
                                                        </button>
                                                    </div>
                                                    <p className="small mb-0" style={{ lineHeight: "1.5" }}>{outreach.engineerMessage}</p>
                                                </div>

                                                <div className="p-3 rounded-3" style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-color)" }}>
                                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                                        <span className="fw-bold small text-success">🏢 2. Direct Outreach (To a Recruiter / Talent Acquisition)</span>
                                                        <button className="btn btn-sm btn-outline-success py-0" onClick={() => copyToClipboard(outreach.recruiterMessage)}>
                                                            📋 Copy
                                                        </button>
                                                    </div>
                                                    <p className="small mb-0" style={{ lineHeight: "1.5" }}>{outreach.recruiterMessage}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-4">
                                                <button className="btn btn-gradient" onClick={handleGenerateOutreach}>
                                                    Generate Outreach Templates
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* TAB 3: INTERVIEW PREP */}
                                {activeTab === "interviewPrep" && (
                                    <div>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="fw-bold mb-0">Interview Prediction Sheet for {job.company}</h6>
                                            <button className="btn btn-sm btn-outline-secondary" onClick={handleGenerateInterviewPrep}>
                                                🔄 Refresh Questions
                                            </button>
                                        </div>
                                        {prepData ? (
                                            <div className="d-flex flex-column gap-3">
                                                <div className="p-3 rounded-3" style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-color)" }}>
                                                    <h6 className="fw-bold text-primary mb-2">⚡ Top 5 Predicted Technical Questions</h6>
                                                    <ol className="small ps-3 mb-0" style={{ lineHeight: "1.7" }}>
                                                        {prepData.technicalQuestions?.map((q, i) => (
                                                            <li key={i} className="mb-1">{q}</li>
                                                        ))}
                                                    </ol>
                                                </div>

                                                <div className="p-3 rounded-3" style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-color)" }}>
                                                    <h6 className="fw-bold text-warning mb-2">🤝 Behavioral (STAR) Prompts</h6>
                                                    <ul className="small ps-3 mb-0" style={{ lineHeight: "1.7" }}>
                                                        {prepData.behavioralQuestions?.map((q, i) => (
                                                            <li key={i} className="mb-1">{q}</li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="p-3 rounded-3" style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-color)" }}>
                                                    <h6 className="fw-bold text-info mb-2">💡 Company Culture & Revision Tips</h6>
                                                    <ul className="small ps-3 mb-0" style={{ lineHeight: "1.7" }}>
                                                        {prepData.cultureTips?.map((tip, i) => (
                                                            <li key={i} className="mb-1">{tip}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-4">
                                                <button className="btn btn-gradient" onClick={handleGenerateInterviewPrep}>
                                                    Generate Prep Sheet
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* TAB 4: MATCH SCORE */}
                                {activeTab === "matchScore" && (
                                    <div>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="fw-bold mb-0">Resume & Job Fit Analysis</h6>
                                            <button className="btn btn-sm btn-outline-secondary" onClick={handleAnalyzeMatch}>
                                                🔄 Recalculate
                                            </button>
                                        </div>
                                        {matchData ? (
                                            <div>
                                                <div className="d-flex align-items-center gap-3 p-3 rounded-3 mb-3" style={{ backgroundColor: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.25)" }}>
                                                    <div className="display-6 fw-bold text-success mb-0">{matchData.matchScore}%</div>
                                                    <div>
                                                        <div className="fw-bold text-success">Strong Profile Match</div>
                                                        <div className="small text-muted">{matchData.advice}</div>
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <h6 className="fw-bold small text-muted mb-2">✅ Matched Core Competencies:</h6>
                                                    <div className="d-flex gap-2 flex-wrap">
                                                        {matchData.matchedSkills?.map((s, i) => (
                                                            <span key={i} className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
                                                                ✓ {s}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <h6 className="fw-bold small text-muted mb-2">⚠️ Recommended Skills to Mention/Study:</h6>
                                                    <div className="d-flex gap-2 flex-wrap">
                                                        {matchData.missingSkills?.map((s, i) => (
                                                            <span key={i} className="badge bg-warning-subtle text-warning border border-warning-subtle px-2 py-1">
                                                                + {s}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-4">
                                                <button className="btn btn-gradient" onClick={handleAnalyzeMatch}>
                                                    Analyze Job Match
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Modal Footer */}
                    <div className="modal-footer border-top p-2 px-3" style={{ borderColor: "var(--border-color)" }}>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
                            Close Assistant
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AiAssistantModal;
