package com.example.springsecurityjpa.security;

import com.example.springsecurityjpa.service.CustomUserDetailService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class CustomFilter extends OncePerRequestFilter {

    @Autowired
    private CustomUserDetailService customUserDetailService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // lấy ra email trong session
        String email = (String) request.getSession().getAttribute("MY_SESSION");

        if (email == null) {
            // chuyển bộ lọc tiếp theo
            filterChain.doFilter(request,response);
            return;
        }

        // lấy ra thông tin user dựa vào email
        UserDetails userDetails = customUserDetailService.loadUserByUsername(email);

        // tạo ra đối tượng để phân quyền
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                userDetails.getUsername(),
                null,
                userDetails.getAuthorities()
        );

        // lưu dữ liệu vào context holder
        SecurityContextHolder.getContext().setAuthentication(token);

        // chuyển bộ lọc tiếp theo
        filterChain.doFilter(request,response);

    }
}
