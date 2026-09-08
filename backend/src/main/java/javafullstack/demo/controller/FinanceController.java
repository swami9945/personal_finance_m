package javafullstack.demo.controller;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import javafullstack.demo.dto.FinanceDtos;
import javafullstack.demo.entity.UserAccount;
import javafullstack.demo.exception.ApiException;
import javafullstack.demo.service.FinanceService;

@RestController
@RequestMapping("/api")
public class FinanceController {
    private final FinanceService finance;
    public FinanceController(FinanceService finance) { this.finance = finance; }
    @GetMapping("/dashboard") public FinanceDtos.DashboardResponse dashboard(@RequestAttribute(value = "authenticatedUser", required = false) UserAccount user) { return finance.dashboard(requiredUser(user)); }
    @GetMapping("/transactions") public List<FinanceDtos.TransactionResponse> transactions(@RequestAttribute(value = "authenticatedUser", required = false) UserAccount user) { return finance.transactions(requiredUser(user)); }
    @PostMapping("/transactions") @ResponseStatus(HttpStatus.CREATED) public FinanceDtos.TransactionResponse createTransaction(@RequestAttribute(value = "authenticatedUser", required = false) UserAccount user, @Valid @RequestBody FinanceDtos.TransactionRequest request) { return finance.createTransaction(requiredUser(user), request); }
    @PutMapping("/transactions/{id}") public FinanceDtos.TransactionResponse updateTransaction(@RequestAttribute(value = "authenticatedUser", required = false) UserAccount user, @PathVariable Long id, @Valid @RequestBody FinanceDtos.TransactionRequest request) { return finance.updateTransaction(requiredUser(user), id, request); }
    @DeleteMapping("/transactions/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void deleteTransaction(@RequestAttribute(value = "authenticatedUser", required = false) UserAccount user, @PathVariable Long id) { finance.deleteTransaction(requiredUser(user), id); }
    @GetMapping("/budgets") public List<FinanceDtos.BudgetResponse> budgets(@RequestAttribute(value = "authenticatedUser", required = false) UserAccount user) { return finance.budgets(requiredUser(user)); }
    @PostMapping("/budgets") @ResponseStatus(HttpStatus.CREATED) public FinanceDtos.BudgetResponse createBudget(@RequestAttribute(value = "authenticatedUser", required = false) UserAccount user, @Valid @RequestBody FinanceDtos.BudgetRequest request) { return finance.createBudget(requiredUser(user), request); }
    @PutMapping("/budgets/{id}") public FinanceDtos.BudgetResponse updateBudget(@RequestAttribute(value = "authenticatedUser", required = false) UserAccount user, @PathVariable Long id, @Valid @RequestBody FinanceDtos.BudgetRequest request) { return finance.updateBudget(requiredUser(user), id, request); }
    @DeleteMapping("/budgets/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void deleteBudget(@RequestAttribute(value = "authenticatedUser", required = false) UserAccount user, @PathVariable Long id) { finance.deleteBudget(requiredUser(user), id); }
    @GetMapping("/goals") public List<FinanceDtos.GoalResponse> goals(@RequestAttribute(value = "authenticatedUser", required = false) UserAccount user) { return finance.goals(requiredUser(user)); }
    @PostMapping("/goals") @ResponseStatus(HttpStatus.CREATED) public FinanceDtos.GoalResponse createGoal(@RequestAttribute(value = "authenticatedUser", required = false) UserAccount user, @Valid @RequestBody FinanceDtos.GoalRequest request) { return finance.createGoal(requiredUser(user), request); }
    @PutMapping("/goals/{id}") public FinanceDtos.GoalResponse updateGoal(@RequestAttribute(value = "authenticatedUser", required = false) UserAccount user, @PathVariable Long id, @Valid @RequestBody FinanceDtos.GoalRequest request) { return finance.updateGoal(requiredUser(user), id, request); }
    @DeleteMapping("/goals/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void deleteGoal(@RequestAttribute(value = "authenticatedUser", required = false) UserAccount user, @PathVariable Long id) { finance.deleteGoal(requiredUser(user), id); }
    @GetMapping("/recurring") public List<FinanceDtos.RecurringResponse> recurring(@RequestAttribute(value = "authenticatedUser", required = false) UserAccount user) { return finance.recurring(requiredUser(user)); }
    @PostMapping("/recurring") @ResponseStatus(HttpStatus.CREATED) public FinanceDtos.RecurringResponse createRecurring(@RequestAttribute(value = "authenticatedUser", required = false) UserAccount user, @Valid @RequestBody FinanceDtos.RecurringRequest request) { return finance.createRecurring(requiredUser(user), request); }
    @PutMapping("/recurring/{id}") public FinanceDtos.RecurringResponse updateRecurring(@RequestAttribute(value = "authenticatedUser", required = false) UserAccount user, @PathVariable Long id, @Valid @RequestBody FinanceDtos.RecurringRequest request) { return finance.updateRecurring(requiredUser(user), id, request); }
    @DeleteMapping("/recurring/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void deleteRecurring(@RequestAttribute(value = "authenticatedUser", required = false) UserAccount user, @PathVariable Long id) { finance.deleteRecurring(requiredUser(user), id); }
    @GetMapping("/analytics") public java.util.Map<String, Object> analytics(@RequestAttribute(value = "authenticatedUser", required = false) UserAccount user) { return finance.analytics(requiredUser(user)); }
    @GetMapping("/reports") public java.util.Map<String, Object> reports(@RequestAttribute(value = "authenticatedUser", required = false) UserAccount user) { return finance.analytics(requiredUser(user)); }
    @GetMapping("/notifications") public java.util.List<java.util.Map<String, String>> notifications(@RequestAttribute(value = "authenticatedUser", required = false) UserAccount user) { requiredUser(user); return List.of(java.util.Map.of("title", "Budget check-in", "message", "Review your current spending.")); }
    @GetMapping("/profile") public java.util.Map<String, Object> profile(@RequestAttribute(value = "authenticatedUser", required = false) UserAccount user) { return finance.profile(requiredUser(user)); }
    @PutMapping("/profile") public java.util.Map<String, Object> updateProfile(@RequestAttribute(value = "authenticatedUser", required = false) UserAccount user, @Valid @RequestBody FinanceDtos.ProfileRequest request) { return finance.updateProfile(requiredUser(user), request); }
    private UserAccount requiredUser(UserAccount user) { if (user == null) throw new ApiException("Authentication is required.", 401); return user; }
}
