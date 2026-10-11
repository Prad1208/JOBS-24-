import { deleteJob } from "../services/jobService";
import StatusBadge from "./StatusBadge";

function JobList({
    jobs,
    refreshJobs,
    setSelectedJob,
    darkMode
}) {

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this job?"
        );

        if (!confirmDelete) return;

        try {

            await deleteJob(id);

            alert("Job deleted successfully!");

            refreshJobs();

        } catch (error) {

            console.error(error);

            alert("Failed to delete job.");
        }
    };

    return (

        <div className="container mt-4">

            <h2 className={`mb-3 ${darkMode ? "text-light" : ""}`}>
                All Applications
            </h2>

            <div className="table-responsive">

                <table
                    className={`table table-bordered table-hover ${
                        darkMode ? "table-dark" : ""
                    }`}
                >

                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Role</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Salary</th>
                            <th>Applied Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {jobs.length === 0 ? (

                            <tr>
                                <td
                                    colSpan="7"
                                    className="text-center"
                                >
                                    No Jobs Found
                                </td>
                            </tr>

                        ) : (

                            jobs.map((job) => (

                                <tr key={job.id}>

                                    <td>{job.company}</td>

                                    <td>{job.role}</td>

                                    <td>{job.location}</td>

                                    <td>
                                        <StatusBadge
                                            status={job.status}
                                        />
                                    </td>

                                    <td>{job.salary}</td>

                                    <td>{job.appliedDate}</td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() =>
                                                setSelectedJob(job)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                handleDelete(job.id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default JobList;