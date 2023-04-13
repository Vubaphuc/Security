package com.example.lab1.security;


import com.example.lab1.exception.CustomAccessDeniedHandler;
import com.example.lab1.exception.CustomAuthenticationEntryPoint;
import com.example.lab1.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true
)
public class SecurityConfig {



    @Autowired
    private CustomFilter customFilter;

    @Autowired
    private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    @Autowired
    private CustomAccessDeniedHandler customAccessDeniedHandler;

    @Autowired
    AuthService authService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider () {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(authService);
        return provider;
    }


    // tạo ra đối tượng để xác thực
    @Bean
    public AuthenticationManager authenticationManager (AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // tạo 1 mảng danh sách quyền truy cập
        String [] PUBLIC = {
                "/",
                "/css/**",
                "/login-handle"
        };

        http
                .csrf().disable()
                .authorizeHttpRequests()
                // thêm mảng danh sách các quyền truy cập vào
                    .requestMatchers(PUBLIC).permitAll()
                    .requestMatchers("/users").hasAnyRole("USER", "ADMIN")
                    .requestMatchers("/admin").hasRole("ADMIN")
                    .requestMatchers("/author").hasAuthority("ROLE_AUTHOR")
                    .anyRequest().authenticated()
                .and()
                // thêm phần xử lý lỗi
                    .exceptionHandling()
                    .authenticationEntryPoint(customAuthenticationEntryPoint)
                    .accessDeniedHandler(customAccessDeniedHandler)
                .and()
                    .logout()
                    .logoutSuccessUrl("/")
                    .permitAll()
                .and()
                    .authenticationProvider(authenticationProvider())
                // thêm phần gán vị trí xử lý login
                    .addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);




        return http.build();
    }

}
