package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String company;
    private String role;
    private String location;
    private String salary;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDate appliedDate;

    private String notes;

    public enum Status {
        APPLIED,
        SHORTLISTED,
        OA,
        INTERVIEW,
        HR,
        OFFER,
        REJECTED
    }

    public Job() {}

    public Job(String role, String company, String location, String notes, String salary, Status status) {
        this.role = role;
        this.company = company;
        this.location = location;
        this.notes = notes;
        this.salary = salary;
        this.status = status;
        this.appliedDate = LocalDate.now();
    }

    @PrePersist
    public void prePersist() {
        if (this.appliedDate == null) {
            this.appliedDate = LocalDate.now();
        }
        if (this.status == null) {
            this.status = Status.APPLIED;
        }
    }
    public Long getId() {
        return id;
    }

    public String getCompany() {
        return company;
    }

    public String getRole() {
        return role;
    }

    public String getLocation() {
        return location;
    }

    public String getSalary() {
        return salary;
    }

    public Status getStatus() {
        return status;
    }

    public LocalDate getAppliedDate() {
        return appliedDate;
    }

    public String getNotes() {
        return notes;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public void setAppliedDate(LocalDate appliedDate) {
        this.appliedDate = appliedDate;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}