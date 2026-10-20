package com.example.demo.config;

import com.example.demo.entity.Job;
import com.example.demo.entity.User;
import com.example.demo.repository.JobRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // 1. Seed demo users if none exist
        if (userRepository.count() == 0) {
            User seeker = new User(
                    "seeker@demo.com",
                    passwordEncoder.encode("seeker123"),
                    "Alex JobSeeker",
                    User.Role.ROLE_JOB_SEEKER
            );

            User recruiter = new User(
                    "recruiter@demo.com",
                    passwordEncoder.encode("recruiter123"),
                    "Sarah Recruiter",
                    User.Role.ROLE_RECRUITER
            );

            userRepository.saveAll(List.of(seeker, recruiter));
            System.out.println(">>> Demo users initialized: seeker@demo.com (seeker123), recruiter@demo.com (recruiter123)");
        }

        // 2. Seed realistic sample job tracking pipeline if empty
        if (jobRepository.count() == 0) {
            Job j1 = new Job(
                    "Software Development Engineer II",
                    "Google",
                    "Sunnyvale, CA (Hybrid)",
                    "Building high-throughput distributed microservices for Google Cloud. Requires Java, Spring Boot, Kubernetes, and gRPC.",
                    "$165,000 - $195,000",
                    Job.Status.INTERVIEW
            );

            Job j2 = new Job(
                    "Full Stack Java & React Engineer",
                    "Amazon",
                    "Seattle, WA (On-site)",
                    "Scale customer checkout pipelines handling millions of TPS. Tech stack: Java 17, AWS DynamoDB, React 19.",
                    "$145,000 - $175,000",
                    Job.Status.OA
            );

            Job j3 = new Job(
                    "Senior Frontend Engineer",
                    "Stripe",
                    "Remote (US)",
                    "Build next-gen developer billing dashboards with React, TypeScript, and modern design systems.",
                    "$160,000 - $190,000",
                    Job.Status.SHORTLISTED
            );

            Job j4 = new Job(
                    "Distributed Systems Engineer",
                    "Netflix",
                    "Los Gatos, CA (Hybrid)",
                    "Architect video stream caching layers and real-time telemetry pipelines. Microservices, Java, Kafka.",
                    "$180,000 - $220,000",
                    Job.Status.APPLIED
            );

            Job j5 = new Job(
                    "Platform & Infrastructure Lead",
                    "Uber",
                    "San Francisco, CA",
                    "Core platform engineering for driver allocation algorithms. Distributed backend services, Go/Java, MySQL.",
                    "$175,000 - $210,000",
                    Job.Status.OFFER
            );

            jobRepository.saveAll(List.of(j1, j2, j3, j4, j5));
            System.out.println(">>> Demo application pipeline seeded with 5 multi-stage job records.");
        }
    }
}
