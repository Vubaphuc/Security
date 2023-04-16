package com.example.blogappbackend.dto;

import com.example.blogappbackend.entity.Role;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private Integer id;
    private String name;
    private String email;
    private List<Role> roles;
}
