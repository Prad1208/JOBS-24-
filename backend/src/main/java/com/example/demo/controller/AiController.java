package com.example.demo.controller;

import com.example.demo.service.AiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(originPatterns = "*")
@RestController
@RequestMapping("/api/ai")
public class AiController {

    @Autowired
    private AiService aiService;

    @PostMapping("/parse-jd")
    public ResponseEntity<Map<String, String>> parseJobDescription(@RequestBody Map<String, String> payload) {
        String description = payload.get("description");
        return ResponseEntity.ok(aiService.parseJobDescription(description));
    }

    @PostMapping("/cover-letter")
    public ResponseEntity<Map<String, String>> generateCoverLetter(@RequestBody Map<String, String> payload) {
        String company = payload.getOrDefault("company", "Company");
        String role = payload.getOrDefault("role", "Software Engineer");
        String notes = payload.getOrDefault("notes", "");
        String profile = payload.getOrDefault("candidateProfile", "");
        return ResponseEntity.ok(aiService.generateCoverLetter(company, role, notes, profile));
    }

    @PostMapping("/outreach")
    public ResponseEntity<Map<String, String>> generateOutreach(@RequestBody Map<String, String> payload) {
        String company = payload.getOrDefault("company", "Company");
        String role = payload.getOrDefault("role", "Software Engineer");
        String profile = payload.getOrDefault("candidateProfile", "");
        return ResponseEntity.ok(aiService.generateOutreach(company, role, profile));
    }

    @PostMapping("/interview-prep")
    public ResponseEntity<Map<String, Object>> generateInterviewPrep(@RequestBody Map<String, String> payload) {
        String company = payload.getOrDefault("company", "Company");
        String role = payload.getOrDefault("role", "Software Engineer");
        String notes = payload.getOrDefault("notes", "");
        return ResponseEntity.ok(aiService.generateInterviewPrep(company, role, notes));
    }

    @PostMapping("/match-score")
    public ResponseEntity<Map<String, Object>> analyzeMatch(@RequestBody Map<String, String> payload) {
        String skills = payload.getOrDefault("skills", "");
        String description = payload.getOrDefault("description", "");
        return ResponseEntity.ok(aiService.analyzeMatch(skills, description));
    }
}
