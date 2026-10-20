package com.example.demo.controller;
import com.example.demo.entity.Job;
import com.example.demo.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
@CrossOrigin(originPatterns = "*")
@RestController
@RequestMapping("/api/jobs")
public class JobController {
    @Autowired
    private JobService jobService;
    @PostMapping
    public Job createJob(@RequestBody Job job) {
        return jobService.createJob(job);
    }
    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }
    @GetMapping("/{id}")
    public Optional<Job> getJobById(@PathVariable Long id) {
        return jobService.getJobById(id);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Long id, @RequestBody Job job) {
        return ResponseEntity.ok(jobService.updateJob(id, job));
    }
    @PatchMapping("/{id}/status")
    public ResponseEntity<Job> updateJobStatus(@PathVariable Long id, @RequestParam Job.Status status) {
        return ResponseEntity.ok(jobService.updateJobStatus(id, status));
    }
    @GetMapping("/stats")
    public Map<String, Long> getJobStats() {
        return jobService.getJobStats();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }
}