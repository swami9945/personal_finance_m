package javafullstack.demo.security;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;
import javafullstack.demo.entity.UserAccount;

@Service
public class SessionService {
    private final Map<String, UserAccount> sessions = new ConcurrentHashMap<>();
    public String create(UserAccount user) { String token = UUID.randomUUID().toString(); sessions.put(token, user); return token; }
    public UserAccount resolve(String token) { return token == null ? null : sessions.get(token); }
    public void remove(String token) { if (token != null) sessions.remove(token); }
}
