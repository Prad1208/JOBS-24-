package com.example.demo.service;

import com.example.demo.entity.Job;
import com.example.demo.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

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

    // UPDATE job
    public Job updateJob(Long id, Job updatedJob) {
        Job existingJob = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));

        existingJob.setCompany(updatedJob.getCompany());
        existingJob.setRole(updatedJob.getRole());
        existingJob.setLocation(updatedJob.getLocation());
        existingJob.setSalary(updatedJob.getSalary());
        existingJob.setStatus(updatedJob.getStatus());
        existingJob.setAppliedDate(updatedJob.getAppliedDate());
        existingJob.setNotes(updatedJob.getNotes());

        return jobRepository.save(existingJob);
    }

    // DELETE job
    public void deleteJob(Long id) {
        if (!jobRepository.existsById(id)) {
            throw new RuntimeException("Job not found with id: " + id);
        }

        jobRepository.deleteById(id);
    }

    // GET job statistics
    public Map<String, Long> getJobStats() {

        List<Job> jobs = jobRepository.findAll();

        Map<String, Long> stats = new HashMap<>();

        stats.put("total", (long) jobs.size());

        for (Job.Status status : Job.Status.values()) {

            long count = jobs.stream()
                    .filter(job -> job.getStatus() == status)
                    .count();

            stats.put(status.name().toLowerCase(), count);
        }

        return stats;
    }
}