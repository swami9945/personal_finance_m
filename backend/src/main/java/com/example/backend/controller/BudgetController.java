package com.example.backend.controller;

import com.example.backend.entity.Budget;
import com.example.backend.service.BudgetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = "http://localhost:5173")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @GetMapping
    public ResponseEntity<?> getBudget() {

        return budgetService.getBudget()
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.ok(null));
    }

    @PostMapping
    public ResponseEntity<Budget> createBudget(
            @RequestBody Budget budget) {

        return ResponseEntity.ok(
                budgetService.createBudget(budget)
        );
    }
}