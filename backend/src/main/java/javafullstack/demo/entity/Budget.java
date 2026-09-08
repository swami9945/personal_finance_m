package javafullstack.demo.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "budgets")
public class Budget {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) private UserAccount user;
    @Column(nullable = false) private String name;
    @Column(nullable = false) private String category;
    @Column(nullable = false, precision = 19, scale = 2) private BigDecimal limitAmount;
    @Column(nullable = false, precision = 19, scale = 2) private BigDecimal spentAmount = BigDecimal.ZERO;
    @Column(nullable = false, updatable = false) private Instant createdAt = Instant.now();
    @Column(nullable = false) private Instant updatedAt = Instant.now();
    protected Budget() { }
    public Budget(UserAccount user, String name, String category, BigDecimal limitAmount) { this.user = user; this.name = name; this.category = category; this.limitAmount = limitAmount; }
    public Long getId() { return id; }
    public UserAccount getUser() { return user; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public BigDecimal getLimitAmount() { return limitAmount; }
    public BigDecimal getSpentAmount() { return spentAmount; }
    public void update(String name, String category, BigDecimal limitAmount) { this.name = name; this.category = category; this.limitAmount = limitAmount; this.updatedAt = Instant.now(); }
    @PrePersist @PreUpdate private void touch() { if (createdAt == null) createdAt = Instant.now(); updatedAt = Instant.now(); }
}
