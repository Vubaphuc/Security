package com.example.springsecurityjpa.security;



import com.example.springsecurityjpa.exception.CustomAccessDeniedHandler;
import com.example.springsecurityjpa.exception.CustomAuthenticationEntryPoint;
import com.example.springsecurityjpa.service.CustomUserDetailService;
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
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity

public class SecurityConfig {

    @Autowired
    private CustomUserDetailService customUserDetailService;

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
    public AuthenticationProvider authenticationProvider () {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(customUserDetailService);
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
                "/login-handle",
                "/api/auth/register",
                "/api/auth/confirm"
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


    @Bean
    public InMemoryUserDetailsManager userDetailsManager () {
        UserDetails user = User.withDefaultPasswordEncoder()
                .username("user")
                .password("111")
                .roles("USER")
                .build();


        UserDetails admin = User.withDefaultPasswordEncoder()
                .username("admin")
                .password("111")
                .roles("ADMIN", "USER")
                .build();


        UserDetails author = User.withDefaultPasswordEncoder()
                .username("author")
                .password("111")
                .roles("AUTHOR")
                .build();
        return new InMemoryUserDetailsManager(user,admin,author);

    }
}
