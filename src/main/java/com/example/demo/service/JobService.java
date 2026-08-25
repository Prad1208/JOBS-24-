package com.example.demo.service;

import com.example.demo.entity.Job;
import com.example.demo.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    // CREATE job
    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    // GET all jobs
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    // GET job by id
    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    // DELETE job
    public void deleteJob(Long id) {
        if (!jobRepository.existsById(id)) {
            throw new RuntimeException("Job not found with id: " + id);
        }
        jobRepository.deleteById(id);
    }
}