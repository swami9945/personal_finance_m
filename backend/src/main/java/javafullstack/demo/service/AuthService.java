package javafullstack.demo.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import javafullstack.demo.dto.AuthDtos;
import javafullstack.demo.entity.UserAccount;
import javafullstack.demo.exception.ApiException;
import javafullstack.demo.repository.UserAccountRepository;
import javafullstack.demo.security.SessionService;

@Service
public class AuthService {
    private final UserAccountRepository users; private final PasswordEncoder encoder; private final SessionService sessions;
    public AuthService(UserAccountRepository users, PasswordEncoder encoder, SessionService sessions) { this.users = users; this.encoder = encoder; this.sessions = sessions; }
    public AuthDtos.AuthResponse register(AuthDtos.RegisterRequest request) { if (users.findByEmailIgnoreCase(request.email()).isPresent()) throw new ApiException("Email is already registered.", 409); UserAccount user = users.save(new UserAccount(request.name(), request.email().toLowerCase(), encoder.encode(request.password()))); return response(user); }
    public AuthDtos.AuthResponse login(AuthDtos.LoginRequest request) { UserAccount user = users.findByEmailIgnoreCase(request.email()).orElseThrow(() -> new ApiException("Invalid email or password.", 401)); if (!encoder.matches(request.password(), user.getPasswordHash())) throw new ApiException("Invalid email or password.", 401); return response(user); }
    private AuthDtos.AuthResponse response(UserAccount user) { return new AuthDtos.AuthResponse(user.getId(), user.getName(), user.getEmail(), sessions.create(user)); }
}
