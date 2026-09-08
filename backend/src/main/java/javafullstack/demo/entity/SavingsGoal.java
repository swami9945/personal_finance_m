package javafullstack.demo.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Instant;

@Entity
@Table(name = "savings_goals")
public class SavingsGoal {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) private UserAccount user;
    @Column(nullable = false) private String name;
    @Column(nullable = false, precision = 19, scale = 2) private BigDecimal targetAmount;
    @Column(nullable = false, precision = 19, scale = 2) private BigDecimal savedAmount = BigDecimal.ZERO;
    @Column(nullable = false) private boolean completed = false;
    private LocalDate deadline;
    @Column(nullable = false, updatable = false) private Instant createdAt = Instant.now();
    @Column(nullable = false) private Instant updatedAt = Instant.now();
    protected SavingsGoal() { }
    public SavingsGoal(UserAccount user, String name, BigDecimal targetAmount, LocalDate deadline) { this.user = user; this.name = name; this.targetAmount = targetAmount; this.deadline = deadline; }
    public Long getId() { return id; }
    public UserAccount getUser() { return user; }
    public String getName() { return name; }
    public BigDecimal getTargetAmount() { return targetAmount; }
    public BigDecimal getSavedAmount() { return savedAmount; }
    public LocalDate getDeadline() { return deadline; }
    public void update(String name, BigDecimal targetAmount, LocalDate deadline) { this.name = name; this.targetAmount = targetAmount; this.deadline = deadline; this.updatedAt = Instant.now(); }
    @PrePersist @PreUpdate private void touch() { if (createdAt == null) createdAt = Instant.now(); updatedAt = Instant.now(); }
}
