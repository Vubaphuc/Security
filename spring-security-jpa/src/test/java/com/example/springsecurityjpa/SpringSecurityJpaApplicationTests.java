package com.example.springsecurityjpa;

import com.example.springsecurityjpa.entity.Role;
import com.example.springsecurityjpa.entity.User;
import com.example.springsecurityjpa.repository.UserRepository;
import com.github.javafaker.Faker;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
class SpringSecurityJpaApplicationTests {

    private final PasswordEncoder encoder = new BCryptPasswordEncoder();

    @Autowired
    private UserRepository userRepository;




    @Test
    void save_user() {
        Faker faker =new Faker();


        for (int i = 0; i < 5; i++) {
            User user = User.builder()
                    .name(faker.name().fullName())
                    .email(faker.internet().emailAddress())
                    .password(encoder.encode(faker.internet().password()))
                    .build();
            userRepository.save(user);

        }


    }

}
