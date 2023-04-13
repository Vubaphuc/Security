package com.example.springsecurityjpa.controller;

import com.example.springsecurityjpa.request.LoginRequest;
import com.example.springsecurityjpa.request.RegisterRequest;
import com.example.springsecurityjpa.service.AuthService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/auth")
public class AuthController {


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @PostMapping("login-handle")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, HttpSession session) {
        // tạo đối tượng xác thực
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
        );
        try {
            // tiến hành xác thực
            Authentication authentication = authenticationManager.authenticate(token);

            // lưu dữ liệu vào context holder
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // tạo session
            session.setAttribute("MY_SESSION", authentication.getName());

            return ResponseEntity.ok("Login thành công");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }


    }

    @PostMapping("register")
    public String register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @GetMapping("confirm")
    public String confirm(@RequestParam String token) {
        return authService.confirm(token);
    }
}
