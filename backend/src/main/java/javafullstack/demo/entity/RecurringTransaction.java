package javafullstack.demo.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "recurring_transactions")
public class RecurringTransaction {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) private UserAccount user;
    @Column(nullable = false) private String name;
    @Column(nullable = false, precision = 19, scale = 2) private BigDecimal amount;
    @Column(nullable = false) private String frequency;
    @Column(nullable = false, updatable = false) private Instant createdAt = Instant.now();
    @Column(nullable = false) private Instant updatedAt = Instant.now();
    protected RecurringTransaction() { }
    public RecurringTransaction(UserAccount user, String name, BigDecimal amount, String frequency) { this.user = user; this.name = name; this.amount = amount; this.frequency = frequency; }
    public Long getId() { return id; }
    public UserAccount getUser() { return user; }
    public String getName() { return name; }
    public BigDecimal getAmount() { return amount; }
    public String getFrequency() { return frequency; }
    public void update(String name, BigDecimal amount, String frequency) { this.name = name; this.amount = amount; this.frequency = frequency; this.updatedAt = Instant.now(); }
    @PrePersist @PreUpdate private void touch() { if (createdAt == null) createdAt = Instant.now(); updatedAt = Instant.now(); }
}
