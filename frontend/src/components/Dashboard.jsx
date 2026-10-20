function Dashboard({ jobs = [] }) {
    const total = jobs.length;
    const applied = jobs.filter(j => j.status === "APPLIED").length;
    const interview = jobs.filter(j => j.status === "INTERVIEW" || j.status === "OA" || j.status === "HR" || j.status === "SHORTLISTED").length;
    const offers = jobs.filter(j => j.status === "OFFER").length;

    const cards = [
        {
            title: "Total Applied",
            count: total,
            icon: "💼",
            accentBg: "rgba(79, 70, 229, 0.12)",
            textColor: "var(--primary-accent)",
            subtitle: "All Tracked Applications"
        },
        {
            title: "Under Review",
            count: applied,
            icon: "📝",
            accentBg: "rgba(6, 182, 212, 0.12)",
            textColor: "#0891b2",
            subtitle: "Initial Stage / Resume Screening"
        },
        {
            title: "In Pipeline",
            count: interview,
            icon: "🎯",
            accentBg: "rgba(245, 158, 11, 0.14)",
            textColor: "#d97706",
            subtitle: "Shortlisted / OA / Tech & HR Rounds"
        },
        {
            title: "Offers Received",
            count: offers,
            icon: "🏆",
            accentBg: "rgba(16, 185, 129, 0.14)",
            textColor: "#059669",
            subtitle: "Congratulations!"
        }
    ];

    return (
        <div className="container mt-4">
            <div className="row g-3">
                {cards.map((card, idx) => (
                    <div className="col-12 col-sm-6 col-lg-3" key={idx}>
                        <div className="stat-card h-100 d-flex flex-column justify-content-between">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                    <div className="text-uppercase fw-semibold" style={{ fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.05em" }}>
                                        {card.title}
                                    </div>
                                    <div className="fw-bold mt-1" style={{ fontSize: "1.85rem", color: "var(--text-main)", lineHeight: "1.2" }}>
                                        {card.count}
                                    </div>
                                </div>
                                <div className="stat-icon-wrap" style={{ backgroundColor: card.accentBg }}>
                                    <span>{card.icon}</span>
                                </div>
                            </div>
                            <div className="small" style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                                {card.subtitle}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;