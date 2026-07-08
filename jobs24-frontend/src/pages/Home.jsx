import { useEffect, useState } from "react";

import { getJobs } from "../services/jobService";

import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";
import SearchFilter from "../components/SearchFilter";


function Home() {


    const [jobs,setJobs] = useState([]);

    const [selectedJob,setSelectedJob] = useState(null);

    const [search,setSearch] = useState("");

    const [status,setStatus] = useState("");



    const fetchJobs = () => {

        getJobs()
        .then((response)=>{

            setJobs(response.data);

        })
        .catch((error)=>{

            console.log(error);

        });

    };



    useEffect(()=>{

        fetchJobs();

    },[]);




    const filteredJobs = jobs.filter((job)=>{


        const matchesSearch =
        job.company.toLowerCase()
        .includes(search.toLowerCase())

        ||
        job.role.toLowerCase()
        .includes(search.toLowerCase());



        const matchesStatus =
        status === "" || job.status === status;



        return matchesSearch && matchesStatus;


    });



    return (

        <>


        <Navbar/>


        <Dashboard jobs={jobs}/>


        <SearchFilter

        search={search}

        setSearch={setSearch}

        status={status}

        setStatus={setStatus}

        />



        <JobForm

        refreshJobs={fetchJobs}

        selectedJob={selectedJob}

        setSelectedJob={setSelectedJob}

        />



        <JobList

        jobs={filteredJobs}

        refreshJobs={fetchJobs}

        setSelectedJob={setSelectedJob}

        />


        </>


    );


}


export default Home;