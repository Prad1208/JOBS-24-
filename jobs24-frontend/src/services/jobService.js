import axios from "axios";


const API_URL = "http://localhost:8080/api/jobs";



// GET ALL JOBS
export const getJobs = () => {

    return axios.get(API_URL);

};



// GET JOB BY ID
export const getJobById = (id) => {

    return axios.get(`${API_URL}/${id}`);

};



// ADD JOB
export const addJob = (job) => {

    return axios.post(API_URL,job);

};



// UPDATE JOB
export const updateJob = (id,job) => {

    return axios.put(`${API_URL}/${id}`,job);

};



// DELETE JOB
export const deleteJob = (id) => {

    return axios.delete(`${API_URL}/${id}`);

};