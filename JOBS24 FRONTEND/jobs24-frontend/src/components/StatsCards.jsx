function StatsCards({ jobs }) {
  const total = jobs.length;
  const applied = jobs.filter(job => job.status === "APPLIED").length;
  const interviews = jobs.filter(job => job.status === "INTERVIEW").length;
  const offers = jobs.filter(job => job.status === "OFFER").length;

  return (
    <div className="row mb-4">
      <div className="col">
        <div className="card p-3">
          <h5>Total Jobs</h5>
          <h3>{total}</h3>
        </div>
      </div>

      <div className="col">
        <div className="card p-3">
          <h5>Applied</h5>
          <h3>{applied}</h3>
        </div>
      </div>

      <div className="col">
        <div className="card p-3">
          <h5>Interviews</h5>
          <h3>{interviews}</h3>
        </div>
      </div>

      <div className="col">
        <div className="card p-3">
          <h5>Offers</h5>
          <h3>{offers}</h3>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;