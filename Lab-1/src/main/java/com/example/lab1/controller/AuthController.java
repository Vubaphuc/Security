package com.example.lab1.controller;

import com.example.lab1.request.RegisterRequest;
import com.example.lab1.service.AuthService;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
public class AuthController {


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;



    @PostMapping("login-handle")
    public ResponseEntity<?> login( @RequestBody RegisterRequest request, HttpSession session) {

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

            return ResponseEntity.ok("Đăng ký thành công");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }


    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @GetMapping("confirm")
    public String confirm(@RequestParam String token) {
        return authService.confirm(token);
    }
}
