package com.example.blogappbackend.controller;


import com.example.blogappbackend.entity.User;
import com.example.blogappbackend.mapper.UserMapper;
import com.example.blogappbackend.repository.UserRepository;
import com.example.blogappbackend.dto.request.LoginRequest;
import com.example.blogappbackend.dto.response.AuthResponse;
import com.example.blogappbackend.security.JwtUtils;
import com.example.blogappbackend.service.CustomUserDetailsService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/v1")
@Slf4j
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("login-handle")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpSession session) {
        // Tạo đối tượng xác thực
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
        );
        log.info("token : {} ", token);

        try {
            // Tiến hành xác thực
            Authentication authentication = authenticationManager.authenticate(token);
            log.info("authentication : {} ", authentication);

            // Lưu dữ liệu vào context
            SecurityContextHolder.getContext().setAuthentication(authentication);

            log.info("SecurityContextHolder : {} ",  SecurityContextHolder.getContext().getAuthentication().getName());


            // Lấy ra thông tin của user
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(authentication.getName());
            log.info("userDetails : {} ", userDetails);

            // Tạo ra token
            String jwtToken = jwtUtils.generateToken(userDetails);
            log.info("jwtToken : {} ", jwtToken);

            // Tìm kiếm user
            User user = userRepository.findByEmail(authentication.getName()).orElse(null);
            log.info("user : {} ", user);

            return ResponseEntity.ok(new AuthResponse(
                    UserMapper.toUserDto(user),
                    jwtToken,
                    true
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
