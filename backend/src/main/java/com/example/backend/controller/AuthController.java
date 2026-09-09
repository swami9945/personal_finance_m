package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Register
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User savedUser = authService.register(user);

            return ResponseEntity.ok(
                    Map.of(
                            "message", "Registration successful",
                            "userId", savedUser.getId(),
                            "name", savedUser.getName(),
                            "email", savedUser.getEmail()
                    )
            );

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage())
            );
        }
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            User loggedInUser =
                    authService.login(user.getEmail(), user.getPassword());

            return ResponseEntity.ok(
                    Map.of(
                            "message", "Login successful",
                            "userId", loggedInUser.getId(),
                            "name", loggedInUser.getName(),
                            "email", loggedInUser.getEmail()
                    )
            );

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage())
            );
        }
    }
}