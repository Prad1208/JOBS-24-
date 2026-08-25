function Dashboard({ jobs }) {

    const total = jobs.length;

    const applied = jobs.filter(
        job => job.status === "APPLIED"
    ).length;

    const interview = jobs.filter(
        job => job.status === "INTERVIEW"
    ).length;

    const offers = jobs.filter(
        job => job.status === "OFFER"
    ).length;


    return (

        <div className="container mt-4">

            <h2>Dashboard</h2>

            <div className="row">

                <div className="col-md-3">
                    <div className="card p-3">
                        <h5>Total Jobs</h5>
                        <h2>{total}</h2>
                    </div>
                </div>


                <div className="col-md-3">
                    <div className="card p-3">
                        <h5>Applied</h5>
                        <h2>{applied}</h2>
                    </div>
                </div>


                <div className="col-md-3">
                    <div className="card p-3">
                        <h5>Interview</h5>
                        <h2>{interview}</h2>
                    </div>
                </div>


                <div className="col-md-3">
                    <div className="card p-3">
                        <h5>Offers</h5>
                        <h2>{offers}</h2>
                    </div>
                </div>


            </div>

        </div>
    );
}

export default Dashboard;