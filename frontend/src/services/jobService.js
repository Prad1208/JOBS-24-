import api from "./api";

export const getJobs = () => {
    return api.get("/api/jobs");
};

export const getJobById = (id) => {
    return api.get(`/api/jobs/${id}`);
};

export const addJob = (job) => {
    return api.post("/api/jobs", job);
};

export const updateJob = (id, job) => {
    return api.put(`/api/jobs/${id}`, job);
};

export const deleteJob = (id) => {
    return api.delete(`/api/jobs/${id}`);
};

export const updateJobStatus = (id, status) => {
    return api.patch(`/api/jobs/${id}/status?status=${status}`);
};

export const getJobStats = () => {
    return api.get("/api/jobs/stats");
};