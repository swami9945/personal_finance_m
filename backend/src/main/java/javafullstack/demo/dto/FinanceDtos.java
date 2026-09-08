package javafullstack.demo.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

public final class FinanceDtos {
    private FinanceDtos() { }
    public record TransactionRequest(@NotBlank String merchant, @NotBlank String category, @NotNull @Positive BigDecimal amount, @Pattern(regexp = "income|expense") String type, @NotNull LocalDate date) { }
    public record TransactionResponse(Long id, String merchant, String category, BigDecimal amount, String type, LocalDate date) { }
    public record BudgetRequest(@NotBlank String name, @NotBlank String category, @NotNull @Positive BigDecimal limitAmount) { }
    public record BudgetResponse(Long id, String name, String category, BigDecimal limitAmount, BigDecimal spentAmount) { }
    public record GoalRequest(@NotBlank String name, @NotNull @Positive BigDecimal targetAmount, LocalDate deadline) { }
    public record GoalResponse(Long id, String name, BigDecimal targetAmount, BigDecimal savedAmount, LocalDate deadline) { }
    public record RecurringRequest(@NotBlank String name, @NotNull @Positive BigDecimal amount, @NotBlank String frequency) { }
    public record RecurringResponse(Long id, String name, BigDecimal amount, String frequency) { }
    public record MonthlySummary(String month, BigDecimal income, BigDecimal expenses) { }
    public record DashboardResponse(BigDecimal balance, BigDecimal income, BigDecimal expenses, BigDecimal savings, BigDecimal savingsRate, java.util.List<TransactionResponse> recentTransactions, java.util.List<BudgetResponse> budgets, java.util.List<GoalResponse> goals, Map<String, BigDecimal> expenseCategories, java.util.List<MonthlySummary> monthlyCashFlow) { }
    public record ProfileRequest(@NotBlank String name, @Email @NotBlank String email) { }
}
