package javafullstack.demo.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "app_users")
public class UserAccount {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private String name;
    @Column(nullable = false, unique = true) private String email;
    @Column(nullable = false) private String passwordHash;
    @Column(nullable = false, updatable = false) private Instant createdAt = Instant.now();

    protected UserAccount() { }
    public UserAccount(String name, String email, String passwordHash) { this.name = name; this.email = email; this.passwordHash = passwordHash; }
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPasswordHash() { return passwordHash; }
    public void updateProfile(String name, String email) { this.name = name; this.email = email; }
}
