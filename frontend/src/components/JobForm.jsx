import { useEffect, useState } from "react";
import { addJob, updateJob } from "../services/jobService";

function JobForm({
    refreshJobs,
    selectedJob,
    setSelectedJob,
    darkMode
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

            let response;

            if (selectedJob) {

                response = await updateJob(selectedJob.id, job);

                console.log("Update Response:", response.data);

                alert("Job Updated Successfully!");

                setSelectedJob(null);

            } else {

                response = await addJob(job);

                console.log("Add Response:", response.data);

                alert("Job Added Successfully!");
            }

            setJob(emptyJob);

            refreshJobs();

        } catch (error) {

            console.error("FULL ERROR:", error);

            if (error.response) {

                console.log("Status:", error.response.status);
                console.log("Data:", error.response.data);

                alert(
                    `Backend Error ${error.response.status}\n\n${JSON.stringify(error.response.data)}`
                );

            } else if (error.request) {

                console.log("No response received:", error.request);

                alert("Frontend reached backend URL, but no response was received.");

            } else {

                console.log("Error Message:", error.message);

                alert(error.message);
            }
        }
    };

    return (
        <div className="container mt-4">

            <div
                className={`card shadow ${
                    darkMode ? "bg-dark text-light" : ""
                }`}
            >

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
                                    className={`form-control ${
                                        darkMode
                                            ? "bg-secondary text-light border-light"
                                            : ""
                                    }`}
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
                                    className={`form-control ${
                                        darkMode
                                            ? "bg-secondary text-light border-light"
                                            : ""
                                    }`}
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
                                    className={`form-control ${
                                        darkMode
                                            ? "bg-secondary text-light border-light"
                                            : ""
                                    }`}
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
                                    className={`form-control ${
                                        darkMode
                                            ? "bg-secondary text-light border-light"
                                            : ""
                                    }`}
                                    name="salary"
                                    value={job.salary}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Status</label>

                                <select
                                    className={`form-select ${
                                        darkMode
                                            ? "bg-secondary text-light border-light"
                                            : ""
                                    }`}
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
                                    className={`form-control ${
                                        darkMode
                                            ? "bg-secondary text-light border-light"
                                            : ""
                                    }`}
                                    name="appliedDate"
                                    value={job.appliedDate || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-12 mb-3">
                                <label>Notes</label>

                                <textarea
                                    className={`form-control ${
                                        darkMode
                                            ? "bg-secondary text-light border-light"
                                            : ""
                                    }`}
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