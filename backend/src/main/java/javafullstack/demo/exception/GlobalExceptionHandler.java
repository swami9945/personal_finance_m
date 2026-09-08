package javafullstack.demo.exception;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ApiException.class) ResponseEntity<?> api(ApiException ex) { return ResponseEntity.status(ex.getStatus()).body(Map.of("message", ex.getMessage())); }
    @ExceptionHandler(MethodArgumentNotValidException.class) ResponseEntity<?> validation(MethodArgumentNotValidException ex) { return ResponseEntity.badRequest().body(Map.of("message", "Please check the submitted fields.")); }
}
