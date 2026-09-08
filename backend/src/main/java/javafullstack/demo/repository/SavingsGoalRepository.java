package javafullstack.demo.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import javafullstack.demo.entity.SavingsGoal;
import javafullstack.demo.entity.UserAccount;
public interface SavingsGoalRepository extends JpaRepository<SavingsGoal, Long> { List<SavingsGoal> findAllByUser(UserAccount user); }
