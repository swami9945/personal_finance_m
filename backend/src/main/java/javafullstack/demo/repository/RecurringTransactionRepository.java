package javafullstack.demo.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import javafullstack.demo.entity.RecurringTransaction;
import javafullstack.demo.entity.UserAccount;
public interface RecurringTransactionRepository extends JpaRepository<RecurringTransaction, Long> { List<RecurringTransaction> findAllByUser(UserAccount user); }
