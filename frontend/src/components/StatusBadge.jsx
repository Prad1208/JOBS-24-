function StatusBadge({ status }) {
    const s = (status || "").toUpperCase();
    let badgeClass = "status-applied";

    if (s === "SHORTLISTED") badgeClass = "status-shortlisted";
    else if (s === "OA") badgeClass = "status-oa";
    else if (s === "INTERVIEW") badgeClass = "status-interview";
    else if (s === "HR") badgeClass = "status-hr";
    else if (s === "OFFER") badgeClass = "status-offer";
    else if (s === "REJECTED") badgeClass = "status-rejected";

    return (
        <span className={`status-pill ${badgeClass}`}>
            {status}
        </span>
    );
}

export default StatusBadge;