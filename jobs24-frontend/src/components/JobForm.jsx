import { useEffect, useState } from "react";
import { addJob, updateJob } from "../services/jobService";

function JobForm({ refreshJobs, selectedJob, setSelectedJob }) {

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

    useEffect(() => {
        if (selectedJob) {
            setJob(selectedJob);
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

        console.log("Submitting Job:", job);

        try {

            if (selectedJob) {

                await updateJob(selectedJob.id, job);

                alert("Job Updated Successfully!");

                setSelectedJob(null);

            } else {

                await addJob(job);

                alert("Job Added Successfully!");

            }

            setJob(emptyJob);

            refreshJobs();

        } catch (error) {

            console.error(error);

            alert("Failed to save job.");

        }
    };

    return (
        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">
                    <h4>
                        {selectedJob ? "Edit Job" : "Add Job"}
                    </h4>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label>Company</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="company"
                                    value={job.company}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Role</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="role"
                                    value={job.role}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Location</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="location"
                                    value={job.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Salary</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="salary"
                                    value={job.salary}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Status</label>

                                <select
                                    className="form-select"
                                    name="status"
                                    value={job.status}
                                    onChange={handleChange}
                                >
                                    <option value="APPLIED">APPLIED</option>
                                    <option value="OA">OA</option>
                                    <option value="INTERVIEW">INTERVIEW</option>
                                    <option value="HR">HR</option>
                                    <option value="OFFER">OFFER</option>
                                    <option value="REJECTED">REJECTED</option>
                                </select>

                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Applied Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="appliedDate"
                                    value={job.appliedDate || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-12 mb-3">
                                <label>Notes</label>

                                <textarea
                                    className="form-control"
                                    rows="3"
                                    name="notes"
                                    value={job.notes}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                        </div>

                        <button
                            type="submit"
                            className="btn btn-success"
                        >
                            {selectedJob ? "Update Job" : "Add Job"}
                        </button>

                        {selectedJob && (
                            <button
                                type="button"
                                className="btn btn-secondary ms-2"
                                onClick={() => {
                                    setSelectedJob(null);
                                    setJob(emptyJob);
                                }}
                            >
                                Cancel
                            </button>
                        )}

                    </form>

                </div>

            </div>

        </div>
    );
}

export default JobForm;