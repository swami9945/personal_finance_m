package javafullstack.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import javafullstack.demo.security.SessionFilter;
import javafullstack.demo.security.SessionService;
import java.util.List;

@Configuration
public class SecurityConfig {
    @Bean PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }
    @Bean SessionFilter sessionFilter(SessionService sessions) { return new SessionFilter(sessions); }
    @Bean SecurityFilterChain securityFilterChain(HttpSecurity http, SessionFilter filter) throws Exception {
        return http.csrf(csrf -> csrf.disable()).cors(cors -> { }).authorizeHttpRequests(auth -> auth.requestMatchers("/api/auth/**", "/error").permitAll().anyRequest().permitAll()).addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class).build();
    }
    @Bean CorsConfigurationSource corsConfigurationSource() { CorsConfiguration config = new CorsConfiguration(); config.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174")); config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); config.setAllowedHeaders(List.of("*")); config.setAllowCredentials(true); UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource(); source.registerCorsConfiguration("/**", config); return source; }
}
