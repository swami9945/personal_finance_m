package javafullstack.demo.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Objects;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import javafullstack.demo.dto.FinanceDtos;
import javafullstack.demo.entity.Budget;
import javafullstack.demo.entity.SavingsGoal;
import javafullstack.demo.entity.Transaction;
import javafullstack.demo.entity.UserAccount;
import javafullstack.demo.entity.RecurringTransaction;
import javafullstack.demo.exception.ApiException;
import javafullstack.demo.repository.BudgetRepository;
import javafullstack.demo.repository.SavingsGoalRepository;
import javafullstack.demo.repository.TransactionRepository;

@Service
public class FinanceService {
    private final TransactionRepository transactions;
    private final BudgetRepository budgets;
    private final SavingsGoalRepository goals;
    private final javafullstack.demo.repository.RecurringTransactionRepository recurring;

    public FinanceService(TransactionRepository transactions, BudgetRepository budgets, SavingsGoalRepository goals, javafullstack.demo.repository.RecurringTransactionRepository recurring) {
        this.transactions = transactions;
        this.budgets = budgets;
        this.goals = goals;
        this.recurring = recurring;
    }

    public List<FinanceDtos.TransactionResponse> transactions(UserAccount user) {
        return transactions.findAllByUserOrderByDateDesc(user).stream().map(this::transaction).toList();
    }

    public FinanceDtos.TransactionResponse createTransaction(UserAccount user, FinanceDtos.TransactionRequest request) {
        BigDecimal signed = signedAmount(request);
        return transaction(transactions.save(new Transaction(user, request.merchant(), request.category(), signed, request.type(), request.date())));
    }

    public FinanceDtos.TransactionResponse updateTransaction(UserAccount user, Long id, FinanceDtos.TransactionRequest request) {
        Transaction item = owned(transactions.findById(id).orElseThrow(() -> new ApiException("Transaction not found.", 404)), user);
        item.update(request.merchant(), request.category(), signedAmount(request), request.type(), request.date());
        return transaction(transactions.save(item));
    }

    public void deleteTransaction(UserAccount user, Long id) {
        transactions.delete(owned(transactions.findById(id).orElseThrow(() -> new ApiException("Transaction not found.", 404)), user));
    }

    public List<FinanceDtos.BudgetResponse> budgets(UserAccount user) {
        return budgets.findAllByUser(user).stream().map(this::budget).toList();
    }

    public FinanceDtos.BudgetResponse createBudget(UserAccount user, FinanceDtos.BudgetRequest request) {
        return budget(budgets.save(new Budget(user, request.name(), request.category(), request.limitAmount())));
    }
    public FinanceDtos.BudgetResponse updateBudget(UserAccount user, Long id, FinanceDtos.BudgetRequest request) { Budget item = ownedBudget(id, user); item.update(request.name(), request.category(), request.limitAmount()); return budget(budgets.save(item)); }
    public void deleteBudget(UserAccount user, Long id) { budgets.delete(ownedBudget(id, user)); }

    public List<FinanceDtos.GoalResponse> goals(UserAccount user) {
        return goals.findAllByUser(user).stream().map(this::goal).toList();
    }

    public FinanceDtos.GoalResponse createGoal(UserAccount user, FinanceDtos.GoalRequest request) {
        return goal(goals.save(new SavingsGoal(user, request.name(), request.targetAmount(), request.deadline())));
    }
    public FinanceDtos.GoalResponse updateGoal(UserAccount user, Long id, FinanceDtos.GoalRequest request) { SavingsGoal item = ownedGoal(id, user); item.update(request.name(), request.targetAmount(), request.deadline()); return goal(goals.save(item)); }
    public void deleteGoal(UserAccount user, Long id) { goals.delete(ownedGoal(id, user)); }

    public List<FinanceDtos.RecurringResponse> recurring(UserAccount user) { return recurring.findAllByUser(user).stream().map(item -> new FinanceDtos.RecurringResponse(item.getId(), item.getName(), item.getAmount(), item.getFrequency())).toList(); }
    public FinanceDtos.RecurringResponse createRecurring(UserAccount user, FinanceDtos.RecurringRequest request) { RecurringTransaction item = recurring.save(new RecurringTransaction(user, request.name(), request.amount(), request.frequency())); return new FinanceDtos.RecurringResponse(item.getId(), item.getName(), item.getAmount(), item.getFrequency()); }
    public FinanceDtos.RecurringResponse updateRecurring(UserAccount user, Long id, FinanceDtos.RecurringRequest request) { RecurringTransaction item = ownedRecurring(id, user); item.update(request.name(), request.amount(), request.frequency()); recurring.save(item); return new FinanceDtos.RecurringResponse(item.getId(), item.getName(), item.getAmount(), item.getFrequency()); }
    public void deleteRecurring(UserAccount user, Long id) { recurring.delete(ownedRecurring(id, user)); }
    public java.util.Map<String, Object> analytics(UserAccount user) { FinanceDtos.DashboardResponse data = dashboard(user); return java.util.Map.of("income", data.income(), "expenses", data.expenses(), "savingsRate", data.savingsRate(), "message", "Your latest spending data is ready to review."); }
    public java.util.Map<String, Object> profile(UserAccount user) { return java.util.Map.of("id", user.getId(), "name", user.getName(), "email", user.getEmail()); }
    public java.util.Map<String, Object> updateProfile(UserAccount user, FinanceDtos.ProfileRequest request) { user.updateProfile(request.name(), request.email().toLowerCase()); return profile(user); }

    public FinanceDtos.DashboardResponse dashboard(UserAccount user) {
        List<Transaction> items = transactions.findAllByUserOrderByDateDesc(user);
        BigDecimal income = items.stream().filter(item -> item.getAmount().signum() > 0).map(Transaction::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal expenses = items.stream().filter(item -> item.getAmount().signum() < 0).map(item -> item.getAmount().abs()).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal savings = income.subtract(expenses);
        BigDecimal rate = income.signum() == 0 ? BigDecimal.ZERO : savings.multiply(BigDecimal.valueOf(100)).divide(income, 2, RoundingMode.HALF_UP);
        Map<String, BigDecimal> categories = items.stream().filter(item -> item.getAmount().signum() < 0).collect(Collectors.groupingBy(Transaction::getCategory, LinkedHashMap::new, Collectors.reducing(BigDecimal.ZERO, item -> item.getAmount().abs(), BigDecimal::add)));
        List<FinanceDtos.MonthlySummary> monthly = items.stream().collect(Collectors.groupingBy(item -> item.getDate().withDayOfMonth(1))).entrySet().stream().sorted(java.util.Map.Entry.comparingByKey()).map(entry -> new FinanceDtos.MonthlySummary(entry.getKey().toString(), entry.getValue().stream().filter(item -> item.getAmount().signum() > 0).map(Transaction::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add), entry.getValue().stream().filter(item -> item.getAmount().signum() < 0).map(item -> item.getAmount().abs()).reduce(BigDecimal.ZERO, BigDecimal::add))).toList();
        return new FinanceDtos.DashboardResponse(savings, income, expenses, savings, rate, items.stream().limit(5).map(this::transaction).toList(), budgets(user), goals(user), categories, monthly);
    }

    private BigDecimal signedAmount(FinanceDtos.TransactionRequest request) {
        return "expense".equals(request.type()) ? request.amount().negate() : request.amount();
    }

    private Transaction owned(Transaction item, UserAccount user) {
        if (!Objects.equals(item.getUser().getId(), user.getId())) throw new ApiException("Resource not found.", 404);
        return item;
    }
    private Budget ownedBudget(Long id, UserAccount user) { Budget item = budgets.findById(id).orElseThrow(() -> new ApiException("Budget not found.", 404)); if (!Objects.equals(item.getUser().getId(), user.getId())) throw new ApiException("Resource not found.", 404); return item; }
    private SavingsGoal ownedGoal(Long id, UserAccount user) { SavingsGoal item = goals.findById(id).orElseThrow(() -> new ApiException("Savings goal not found.", 404)); if (!Objects.equals(item.getUser().getId(), user.getId())) throw new ApiException("Resource not found.", 404); return item; }
    private RecurringTransaction ownedRecurring(Long id, UserAccount user) { RecurringTransaction item = recurring.findById(id).orElseThrow(() -> new ApiException("Recurring transaction not found.", 404)); if (!Objects.equals(item.getUser().getId(), user.getId())) throw new ApiException("Resource not found.", 404); return item; }

    private FinanceDtos.TransactionResponse transaction(Transaction item) { return new FinanceDtos.TransactionResponse(item.getId(), item.getMerchant(), item.getCategory(), item.getAmount(), item.getType(), item.getDate()); }
    private FinanceDtos.BudgetResponse budget(Budget item) { return new FinanceDtos.BudgetResponse(item.getId(), item.getName(), item.getCategory(), item.getLimitAmount(), item.getSpentAmount()); }
    private FinanceDtos.GoalResponse goal(SavingsGoal item) { return new FinanceDtos.GoalResponse(item.getId(), item.getName(), item.getTargetAmount(), item.getSavedAmount(), item.getDeadline()); }
}
