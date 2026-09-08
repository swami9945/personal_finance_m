package javafullstack.demo.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import javafullstack.demo.entity.Transaction;
import javafullstack.demo.entity.UserAccount;
public interface TransactionRepository extends JpaRepository<Transaction, Long> { List<Transaction> findAllByUserOrderByDateDesc(UserAccount user); }
