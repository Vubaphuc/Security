package com.example.blogappbackend.security;

import com.example.blogappbackend.entity.User;
import com.example.blogappbackend.exception.NotFoundException;
import com.example.blogappbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class ICurrentUserImpl implements ICurrentUser{
    private final UserRepository userRepository;
    @Override
    public User getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("authentication: {}",authentication);
        return userRepository.findByEmail(authentication.getName()).orElseThrow(() -> {
            throw new NotFoundException("Not Found User");
        });
    }
}
