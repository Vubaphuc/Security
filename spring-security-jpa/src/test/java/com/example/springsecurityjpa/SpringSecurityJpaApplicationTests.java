package com.example.springsecurityjpa;

import com.example.springsecurityjpa.entity.User;
import com.example.springsecurityjpa.repository.UserRepository;
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

        List<User> users = new ArrayList<>(List.of(
                new User(1,"user","user@gmail.com",encoder.encode("111"), List.of("USER")),
                new User(2,"admin","admin@gmail.com",encoder.encode("111"), List.of("ADMIN")),
                new User(3,"author","author@gmail.com",encoder.encode("111"), List.of("AUTHOR")),
                new User(4,"all","all@gmail.com",encoder.encode("111"), List.of("USER","AUTHOR","ADMIN","USER"))
        ));

        userRepository.saveAll(users);
    }

}
