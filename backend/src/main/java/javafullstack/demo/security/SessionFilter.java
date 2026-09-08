package javafullstack.demo.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.web.filter.OncePerRequestFilter;
import javafullstack.demo.entity.UserAccount;

public class SessionFilter extends OncePerRequestFilter {
    private final SessionService sessions;
    public SessionFilter(SessionService sessions) { this.sessions = sessions; }
    @Override protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        UserAccount user = header != null && header.startsWith("Bearer ") ? sessions.resolve(header.substring(7)) : null;
        request.setAttribute("authenticatedUser", user);
        chain.doFilter(request, response);
    }
}
