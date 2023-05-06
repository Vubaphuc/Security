package com.example.blogappbackend.service;

import com.example.blogappbackend.dto.UserDto;
import com.example.blogappbackend.dto.request.UpdateUserRequest;
import com.example.blogappbackend.entity.Role;
import com.example.blogappbackend.entity.User;
import com.example.blogappbackend.exception.BadRequestException;
import com.example.blogappbackend.exception.NotFoundException;
import com.example.blogappbackend.mapper.UserMapper;
import com.example.blogappbackend.repository.RoleRepository;
import com.example.blogappbackend.repository.UserRepository;
import com.example.blogappbackend.dto.request.UpsertUserRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public Page<UserDto> findListUserPage(Integer page, Integer pageSize) {
        Page<User> userPage = userRepository.findAll(PageRequest.of(page - 1, pageSize));
        List<UserDto> userDtos = userPage.getContent().stream().map(UserMapper::toUserDto).collect(Collectors.toList());
        return new PageImpl<>(userDtos, userPage.getPageable(),userPage.getTotalPages());
    }

    public UserDto createNewUser(UpsertUserRequest request) {
        log.info("request {}", request.getRoleIds());


        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("Email đã tồn tại");
        }
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(repository.findAllById(request.getRoleIds()))
                .build();


        userRepository.save(user);

       return UserMapper.toUserDto(user);
    }




    public UserDto updateUserById(UpdateUserRequest request, Integer id) {
        User user = userRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found User");
        });

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setRoles(repository.findAllById(request.getRoleIds()));

        userRepository.save(user);

        return UserMapper.toUserDto(user);
    }

    public UserDto findUserById(Integer id) {
        User user = userRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found User");
        });

        return UserMapper.toUserDto(user);
    }

    public List<Role> findAllRoles() {
        return repository.findAll();
    }
}
