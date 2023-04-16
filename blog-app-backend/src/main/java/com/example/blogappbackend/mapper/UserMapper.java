package com.example.blogappbackend.mapper;

import com.example.blogappbackend.dto.UserDto;
import com.example.blogappbackend.entity.Role;
import com.example.blogappbackend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


public class UserMapper {
    public static UserDto toUserDto(User user) {
        UserDto userDto = new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRoles()
        );
        return userDto;
    }
}
