package com.example.springsecurityjpa.request;


import jakarta.validation.constraints.NotNull;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterRequest {


    @NotNull(message = "name không được để trống")
    private String name;
    @NotNull(message = "email không được để trống")
    private String email;
    @NotNull(message = "password không được để trống")
    private String password;
}
