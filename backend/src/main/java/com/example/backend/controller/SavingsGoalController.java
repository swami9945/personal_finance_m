package com.example.backend.controller;

import com.example.backend.entity.SavingsGoal;
import com.example.backend.service.SavingsGoalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/savings-goals")
@CrossOrigin(origins = "http://localhost:5173")
public class SavingsGoalController {

    private final SavingsGoalService savingsGoalService;

    public SavingsGoalController(
            SavingsGoalService savingsGoalService) {

        this.savingsGoalService = savingsGoalService;
    }

    // =========================
    // GET ALL GOALS
    // =========================

    @GetMapping
    public ResponseEntity<List<SavingsGoal>> getAllGoals() {

        return ResponseEntity.ok(
                savingsGoalService.getAllGoals()
        );
    }

    // =========================
    // GET AVAILABLE MONEY
    // =========================

    @GetMapping("/available-money")
    public ResponseEntity<Map<String, Double>> getAvailableMoney() {

        double availableMoney =
                savingsGoalService.getAvailableMoney();

        return ResponseEntity.ok(
                Map.of(
                        "availableMoney",
                        availableMoney
                )
        );
    }

    // =========================
    // CREATE GOAL
    // =========================

    @PostMapping
    public ResponseEntity<?> createGoal(
            @RequestBody SavingsGoal goal) {

        try {

            SavingsGoal savedGoal =
                    savingsGoalService.createGoal(goal);

            return ResponseEntity.ok(savedGoal);

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest().body(
                    Map.of(
                            "message",
                            e.getMessage()
                    )
            );
        }
    }

    // =========================
    // ADD MONEY
    // =========================

    @PostMapping("/{id}/add-money")
    public ResponseEntity<?> addMoney(
            @PathVariable Long id,
            @RequestBody Map<String, Double> request) {

        try {

            Double amount =
                    request.get("amount");

            SavingsGoal updatedGoal =
                    savingsGoalService.addMoney(
                            id,
                            amount
                    );

            return ResponseEntity.ok(
                    updatedGoal
            );

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest().body(
                    Map.of(
                            "message",
                            e.getMessage()
                    )
            );
        }
    }

    // =========================
    // DELETE GOAL
    // =========================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGoal(
            @PathVariable Long id) {

        try {

            savingsGoalService.deleteGoal(id);

            return ResponseEntity.noContent()
                    .build();

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest().body(
                    Map.of(
                            "message",
                            e.getMessage()
                    )
            );
        }
    }
}