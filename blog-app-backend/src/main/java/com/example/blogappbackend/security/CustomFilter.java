package com.example.blogappbackend.security;

import com.example.blogappbackend.service.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Slf4j
public class CustomFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // TODO : Lấy thông tin header
        String authHeader = request.getHeader("Authorization");
        log.info("authHeader : {}", authHeader);

        // TODO: Kiểm tra xem header có "Authorization" hoặc header có chứa "Bearer" token hay không
        if (authHeader == null || !authHeader.contains("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // TODO: Lấy token từ trong header
        String jwtToken = authHeader.substring(7);
        log.info("jwtToken : {}", jwtToken);

        // TODO: Lấy ra userEmail từ trong token
        String userEmail = jwtUtils.extractUsername(jwtToken);
        log.info("userEmail : {}", userEmail);

        // TODO: Kiểm tra userEmail -> Tạo đối tượng xác thực
        if (userEmail != null) {
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(userEmail);
            log.info("userDetails : {}", userDetails);

            if (jwtUtils.isTokenValid(jwtToken, userDetails)) {
                log.info("Vào đây");
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails.getUsername(),
                        null,
                        userDetails.getAuthorities()
                );

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }

        filterChain.doFilter(request, response);
    }

}
