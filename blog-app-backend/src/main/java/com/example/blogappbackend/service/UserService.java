package com.example.blogappbackend.service;

import com.example.blogappbackend.dto.UserDto;
import com.example.blogappbackend.entity.User;
import com.example.blogappbackend.exception.BadRequestException;
import com.example.blogappbackend.exception.NotFoundException;
import com.example.blogappbackend.mapper.UserMapper;
import com.example.blogappbackend.repository.RoleRepository;
import com.example.blogappbackend.repository.UserRepository;
import com.example.blogappbackend.request.UpsertUserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository repository;


    public Page<User> findListUserPage(Integer page, Integer pageSize) {
        return userRepository.findAll(PageRequest.of(page - 1, pageSize));
    }

    public UserDto createNewUser(UpsertUserRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("Email đã tồn tại");
        }
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword())
                .roles(repository.findAllById(request.getRoleIds()))
                .build();

        userRepository.save(user);

       return UserMapper.toUserDto(user);
    }

    public UserDto updateUserById(UpsertUserRequest request, Integer id) {
        User user = userRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found User");
        });

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRoles(repository.findAllById(request.getRoleIds()));


        userRepository.save(user);

        return UserMapper.toUserDto(user);
    }
}
