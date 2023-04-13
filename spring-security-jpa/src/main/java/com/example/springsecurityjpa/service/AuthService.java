package com.example.springsecurityjpa.service;

import com.example.springsecurityjpa.entity.Role;
import com.example.springsecurityjpa.entity.TokenConfirm;
import com.example.springsecurityjpa.entity.User;
import com.example.springsecurityjpa.repository.RoleRepository;
import com.example.springsecurityjpa.repository.TokenConfirmRepository;
import com.example.springsecurityjpa.repository.UserRepository;
import com.example.springsecurityjpa.request.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenConfirmRepository tokenConfirmRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String register(RegisterRequest request) {
        // tìm kiếm trong CSDL
        Optional<User> user = userRepository.findByEmail(request.getEmail());
        if (!user.isPresent()) {

            // lấy ngẫu nhiên 2 roles
            List<Role> roles = randomTwoRole();

            // tạo User mới
            User newUser = User.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .roles(roles)
                    .build();

            // lưu vào CSDL
            userRepository.save(newUser);


            // tạo token ngẫu nhiên
            String token = UUID.randomUUID().toString();

            // tạo TokenConfirm mới
            TokenConfirm tokenConfirm = new TokenConfirm();
            tokenConfirm.setToken(token);
            tokenConfirm.setUser(newUser);


            // lưu vào CSDL
            tokenConfirmRepository.save(tokenConfirm);


            // tạo link
            String tokenLink = "http://localhost:8080/api/auth/confirm?token=" + tokenConfirm.getToken();
            // có thể bổ sung gửi linh bằng email
            return tokenLink;

        } else {
            User newUser = user.get();
            if (newUser.isEnabled()) {
                return "Tài khoản đã được đăng ký";
            } else {
                String token = UUID.randomUUID().toString();

                TokenConfirm tokenConfirm = new TokenConfirm();
                tokenConfirm.setToken(token);
                tokenConfirm.setUser(newUser);

                tokenConfirmRepository.save(tokenConfirm);


                String tokenLink = "http://localhost:8080/api/auth/confirm?token=" + tokenConfirm.getToken();

                // có thể bổ sung gửi linh bằng email
                return tokenLink;
            }
        }
    }

    private List<Role> randomTwoRole () {
        List<Role> roles = roleRepository.findAll();
        Collections.shuffle(roles);
        return roles.subList(0,1);
    }

    public String confirm(String token) {
        TokenConfirm tokenConfirm = tokenConfirmRepository.findByToken(token).orElseThrow(() -> {
            throw new UsernameNotFoundException("Token không hợp lệ");
        });


        if (tokenConfirm.getConfirmedAt() != null) {
            return "Token đã được xác thực trước đó";
        }

        LocalDateTime now = LocalDateTime.now();

        if (tokenConfirm.getExpiresAt().isBefore(now)) {
            return "Token đã hết hạn";
        }

        tokenConfirm.setConfirmedAt(now);
        tokenConfirmRepository.save(tokenConfirm);


        User user = tokenConfirm.getUser();
        user.setEnable(true);
        userRepository.save(user);

        return "Xác thực thành công";
    }
}
