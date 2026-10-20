package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(originPatterns = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    // Register Request DTO
    public static class RegisterRequest {
        private String username;
        private String password;
        private String fullName;
        private String role; // "ROLE_JOB_SEEKER" or "ROLE_RECRUITER"

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
    }

    // Login Request DTO
    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    // Auth Response DTO
    public static class AuthResponse {
        private String token;
        private String type = "Bearer";
        private Long id;
        private String username;
        private String fullName;
        private String role;
        private String message;

        public AuthResponse(String token, Long id, String username, String fullName, String role, String message) {
            this.token = token;
            this.id = id;
            this.username = username;
            this.fullName = fullName;
            this.role = role;
            this.message = message;
        }

        public String getToken() { return token; }
        public String getType() { return type; }
        public Long getId() { return id; }
        public String getUsername() { return username; }
        public String getFullName() { return fullName; }
        public String getRole() { return role; }
        public String getMessage() { return message; }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username/email is required"));
        }
        if (request.getPassword() == null || request.getPassword().trim().length() < 4) {
            return ResponseEntity.badRequest().body(Map.of("error", "Password must be at least 4 characters"));
        }

        String normalizedUsername = request.getUsername().trim().toLowerCase();
        if (userRepository.existsByUsername(normalizedUsername)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "An account with this email/username already exists"));
        }

        User.Role role = User.Role.ROLE_JOB_SEEKER;
        if (request.getRole() != null && request.getRole().toUpperCase().contains("RECRUITER")) {
            role = User.Role.ROLE_RECRUITER;
        }

        String fullName = (request.getFullName() != null && !request.getFullName().trim().isEmpty())
                ? request.getFullName().trim()
                : normalizedUsername.split("@")[0];

        User user = new User(
                normalizedUsername,
                passwordEncoder.encode(request.getPassword()),
                fullName,
                role
        );
        user = userRepository.save(user);

        String token = jwtUtils.generateToken(user.getUsername(), user.getRole().name(), user.getFullName());

        return ResponseEntity.ok(new AuthResponse(
                token,
                user.getId(),
                user.getUsername(),
                user.getFullName(),
                user.getRole().name(),
                "Registration successful"
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (request.getUsername() == null || request.getPassword() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username and password required"));
        }

        String normalizedUsername = request.getUsername().trim().toLowerCase();
        Optional<User> optionalUser = userRepository.findByUsername(normalizedUsername);

        if (optionalUser.isEmpty() || !passwordEncoder.matches(request.getPassword(), optionalUser.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid credentials. Please check your username and password."));
        }

        User user = optionalUser.get();
        String token = jwtUtils.generateToken(user.getUsername(), user.getRole().name(), user.getFullName());

        return ResponseEntity.ok(new AuthResponse(
                token,
                user.getId(),
                user.getUsername(),
                user.getFullName(),
                user.getRole().name(),
                "Login successful"
        ));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
        }

        String username = (String) auth.getPrincipal();
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found"));
        }

        User user = optionalUser.get();
        Map<String, Object> resp = new HashMap<>();
        resp.put("id", user.getId());
        resp.put("username", user.getUsername());
        resp.put("fullName", user.getFullName());
        resp.put("role", user.getRole().name());

        return ResponseEntity.ok(resp);
    }

    @GetMapping("/demo-accounts")
    public ResponseEntity<?> getDemoAccounts() {
        return ResponseEntity.ok(Map.of(
                "jobSeeker", Map.of("username", "seeker@demo.com", "password", "seeker123", "role", "ROLE_JOB_SEEKER", "name", "Alex Seeker (Job Seeker)"),
                "recruiter", Map.of("username", "recruiter@demo.com", "password", "recruiter123", "role", "ROLE_RECRUITER", "name", "Sarah Recruiter (Hiring Lead)")
        ));
    }
}
