function StatusBadge({ status }) {

    let color = "secondary";


    if(status === "APPLIED")
        color="primary";

    else if(status==="INTERVIEW")
        color="warning";

    else if(status==="OFFER")
        color="success";

    else if(status==="REJECTED")
        color="danger";


    return (

        <span className={`badge bg-${color}`}>
            {status}
        </span>

    );
}

export default StatusBadge;