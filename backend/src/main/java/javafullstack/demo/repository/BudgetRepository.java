package javafullstack.demo.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import javafullstack.demo.entity.Budget;
import javafullstack.demo.entity.UserAccount;
public interface BudgetRepository extends JpaRepository<Budget, Long> { List<Budget> findAllByUser(UserAccount user); }
