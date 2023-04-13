package com.example.springsecurityjpa.controller;

import com.example.springsecurityjpa.request.LoginRequest;
import com.example.springsecurityjpa.service.CustomUserDetailService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AuthController {


    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("login-handle")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpSession session) {
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
}
