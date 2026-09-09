package com.example.backend.service;

import com.example.backend.entity.SavingsGoal;
import com.example.backend.entity.Transaction;
import com.example.backend.repository.SavingsGoalRepository;
import com.example.backend.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SavingsGoalService {

    private final SavingsGoalRepository savingsGoalRepository;
    private final TransactionRepository transactionRepository;

    public SavingsGoalService(
            SavingsGoalRepository savingsGoalRepository,
            TransactionRepository transactionRepository) {

        this.savingsGoalRepository = savingsGoalRepository;
        this.transactionRepository = transactionRepository;
    }

    // =========================
    // GET ALL SAVINGS GOALS
    // =========================

    public List<SavingsGoal> getAllGoals() {

        return savingsGoalRepository
                .findAllByOrderByIdDesc();
    }

    // =========================
    // CALCULATE AVAILABLE MONEY
    // =========================

    public double getAvailableMoney() {

        List<Transaction> transactions =
                transactionRepository.findAll();

        // Calculate total income
        double totalIncome = transactions.stream()
                .filter(transaction ->
                        "INCOME".equalsIgnoreCase(
                                transaction.getType()))
                .mapToDouble(transaction ->
                        transaction.getAmount() == null
                                ? 0
                                : transaction.getAmount())
                .sum();

        // Calculate total expenses
        double totalExpenses = transactions.stream()
                .filter(transaction ->
                        "EXPENSE".equalsIgnoreCase(
                                transaction.getType()))
                .mapToDouble(transaction ->
                        transaction.getAmount() == null
                                ? 0
                                : transaction.getAmount())
                .sum();

        // Calculate money already allocated to goals
        double totalSavedInGoals =
                savingsGoalRepository.findAll()
                        .stream()
                        .mapToDouble(goal ->
                                goal.getSavedAmount() == null
                                        ? 0
                                        : goal.getSavedAmount())
                        .sum();

        // Available money
        return totalIncome
                - totalExpenses
                - totalSavedInGoals;
    }

    // =========================
    // CREATE SAVINGS GOAL
    // =========================

    public SavingsGoal createGoal(
            SavingsGoal goal) {

        if (goal.getName() == null ||
                goal.getName().trim().isEmpty()) {

            throw new RuntimeException(
                    "Goal name is required");
        }

        if (goal.getTargetAmount() == null ||
                goal.getTargetAmount() <= 0) {

            throw new RuntimeException(
                    "Target amount must be greater than 0");
        }

        goal.setName(
                goal.getName().trim()
        );

        // New goal starts with zero saved
        goal.setSavedAmount(0.0);

        return savingsGoalRepository.save(goal);
    }

    // =========================
    // ADD MONEY TO GOAL
    // =========================

    public SavingsGoal addMoney(
            Long id,
            Double amount) {

        if (amount == null || amount <= 0) {

            throw new RuntimeException(
                    "Amount must be greater than 0");
        }

        SavingsGoal goal =
                savingsGoalRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Savings goal not found"));

        // Check available money
        double availableMoney =
                getAvailableMoney();

        if (amount > availableMoney) {

            throw new RuntimeException(
                    "Not enough available money. Available: ₹"
                            + availableMoney);
        }

        // Calculate new saved amount
        double newSavedAmount =
                goal.getSavedAmount() + amount;

        // Don't allow saving more than target
        if (newSavedAmount >
                goal.getTargetAmount()) {

            throw new RuntimeException(
                    "Amount exceeds the goal target");
        }

        goal.setSavedAmount(
                newSavedAmount
        );

        return savingsGoalRepository.save(goal);
    }

    // =========================
    // DELETE SAVINGS GOAL
    // =========================

    public void deleteGoal(Long id) {

        if (!savingsGoalRepository.existsById(id)) {

            throw new RuntimeException(
                    "Savings goal not found");
        }

        savingsGoalRepository.deleteById(id);
    }
}