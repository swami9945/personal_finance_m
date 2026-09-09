package com.example.backend.service;

import com.example.backend.entity.Budget;
import com.example.backend.entity.Transaction;
import com.example.backend.repository.BudgetRepository;
import com.example.backend.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    private final TransactionRepository transactionRepository;
    private final BudgetRepository budgetRepository;

    public DashboardService(
            TransactionRepository transactionRepository,
            BudgetRepository budgetRepository) {

        this.transactionRepository = transactionRepository;
        this.budgetRepository = budgetRepository;
    }

    public Map<String, Object> getDashboard() {

        List<Transaction> transactions =
                transactionRepository.findAll();

        double totalIncome = 0;
        double totalExpenses = 0;

        for (Transaction transaction : transactions) {

            if ("INCOME".equalsIgnoreCase(transaction.getType())) {
                totalIncome += transaction.getAmount();
            }

            if ("EXPENSE".equalsIgnoreCase(transaction.getType())) {
                totalExpenses += transaction.getAmount();
            }
        }

        double totalSavings = totalIncome - totalExpenses;

        double budget = budgetRepository
                .findTopByOrderByIdDesc()
                .map(Budget::getAmount)
                .orElse(0.0);

        Map<String, Object> dashboard = new HashMap<>();

        dashboard.put("totalIncome", totalIncome);
        dashboard.put("totalExpenses", totalExpenses);
        dashboard.put("totalSavings", totalSavings);
        dashboard.put("budget", budget);

        return dashboard;
    }
}