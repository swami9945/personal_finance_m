package com.example.backend.service;

import com.example.backend.entity.Budget;
import com.example.backend.repository.BudgetRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BudgetService {

    private final BudgetRepository budgetRepository;

    public BudgetService(BudgetRepository budgetRepository) {
        this.budgetRepository = budgetRepository;
    }

    // Get latest budget
    public Optional<Budget> getBudget() {
        return budgetRepository.findTopByOrderByIdDesc();
    }

    // Create budget
    public Budget createBudget(Budget budget) {
        return budgetRepository.save(budget);
    }
}