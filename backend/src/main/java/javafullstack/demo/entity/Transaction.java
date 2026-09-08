package javafullstack.demo.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "transactions")
public class Transaction {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) private UserAccount user;
    @Column(nullable = false) private String merchant;
    @Column(nullable = false) private String category;
    @Column(nullable = false, precision = 19, scale = 2) private BigDecimal amount;
    @Column(nullable = false) private String type;
    @Column(nullable = false) private LocalDate date;

    protected Transaction() { }
    public Transaction(UserAccount user, String merchant, String category, BigDecimal amount, String type, LocalDate date) { this.user = user; this.merchant = merchant; this.category = category; this.amount = amount; this.type = type; this.date = date; }
    public Long getId() { return id; }
    public UserAccount getUser() { return user; }
    public String getMerchant() { return merchant; }
    public String getCategory() { return category; }
    public BigDecimal getAmount() { return amount; }
    public String getType() { return type; }
    public LocalDate getDate() { return date; }
    public void update(String merchant, String category, BigDecimal amount, String type, LocalDate date) { this.merchant = merchant; this.category = category; this.amount = amount; this.type = type; this.date = date; }
}
