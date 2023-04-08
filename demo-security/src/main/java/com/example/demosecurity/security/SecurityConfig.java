package com.example.demosecurity.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(
        jsr250Enabled = true,
        securedEnabled = true
)
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests()
                    .requestMatchers("/swagger-ui.html").permitAll()
                    .requestMatchers("/").permitAll()
                    .requestMatchers("dashboard").hasAnyRole("ADMIN", "SALE")
                    .requestMatchers("user").hasRole("ADMIN")
                    .requestMatchers("category").hasAnyRole("ADMIN", "SALE")
                    .requestMatchers("course").hasAnyRole("ADMIN", "SALE")
                    .requestMatchers("brand").hasAnyRole("ADMIN", "SALE")
                    .requestMatchers("order").hasAnyRole("ADMIN", "SALE")
                    .requestMatchers("posts").hasAnyRole("ADMIN", "SALE", "AUTHOR")
                    .anyRequest().authenticated()
                .and()
                    .formLogin()
                    .defaultSuccessUrl("/swagger-ui.html", true)
                .and()
                    .logout()
                    .logoutSuccessUrl("/swagger-ui.html");

        return http.build();
    }


    @Bean
    public InMemoryUserDetailsManager userDetailsManager () {
        UserDetails dashboard = User.withDefaultPasswordEncoder()
                .username("dashboard")
                .password("111")
                .roles("ADMIN", "SALE")
                .build();


        UserDetails user = User.withDefaultPasswordEncoder()
                .username("user")
                .password("111")
                .roles("ADMIN")
                .build();


        UserDetails category = User.withDefaultPasswordEncoder()
                .username("category")
                .password("111")
                .roles("ADMIN", "SALE")
                .build();

        UserDetails courses = User.withDefaultPasswordEncoder()
                .username("courses")
                .password("111")
                .roles("ADMIN", "SALE")
                .build();

        UserDetails brand = User.withDefaultPasswordEncoder()
                .username("brand")
                .password("111")
                .roles("ADMIN", "SALE")
                .build();

        UserDetails order = User.withDefaultPasswordEncoder()
                .username("order")
                .password("111")
                .roles("ADMIN", "SALE")
                .build();

        UserDetails posts = User.withDefaultPasswordEncoder()
                .username("posts")
                .password("111")
                .roles("ADMIN", "SALE", "AUTHOR")
                .build();
        return new InMemoryUserDetailsManager(dashboard, user, category, courses, brand, order, posts);

    }

}
