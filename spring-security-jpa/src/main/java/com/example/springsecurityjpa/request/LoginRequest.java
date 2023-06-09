package com.example.springsecurityjpa.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginRequest {

    @NotNull(message = "email không được để trống")
    private String email;
    @NotNull(message = "password không được để trống")
    private String password;
}
