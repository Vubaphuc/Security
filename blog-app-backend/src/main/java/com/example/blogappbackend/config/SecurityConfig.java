package com.example.blogappbackend.config;

import com.example.blogappbackend.exception.CustomAccessDeniedHandler;
import com.example.blogappbackend.exception.CustomAuthenticationEntryPoint;
import com.example.blogappbackend.security.CustomFilter;
import com.example.blogappbackend.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private CustomFilter customFilter;

    @Autowired
    private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    @Autowired
    private CustomAccessDeniedHandler customAccessDeniedHandler;



    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(customUserDetailsService);
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain (HttpSecurity http) throws Exception {

        String [] PUBLIC = {
                "/api/v1/public/**",
                "/",
                "/api/v1/login-handle"
        };

        String [] ADMIN = {
                "/api/v1/admin/**",
                "/api/v1/**"
        };

        String [] AUTHOR = {
                "/api/v1/admin/**"
        };

        String [] USER = {
                "/api/v1/admin/**"
        };


        http
                .cors()
                .and()
                .csrf().disable()
                .authorizeHttpRequests()
                    .requestMatchers(PUBLIC).permitAll()
                    .requestMatchers(USER).hasRole("USER")
                    .requestMatchers(ADMIN).hasRole("ADMIN")
                    .requestMatchers(AUTHOR).hasAuthority("ROLE_AUTHOR")
                    .anyRequest().authenticated()
                .and()
                    .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .exceptionHandling()
                    .authenticationEntryPoint(customAuthenticationEntryPoint)
                    .accessDeniedHandler(customAccessDeniedHandler)
                .and()
                    .authenticationProvider(authenticationProvider())
                    .addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


}
