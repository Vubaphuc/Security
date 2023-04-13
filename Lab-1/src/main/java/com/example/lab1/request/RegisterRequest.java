package com.example.lab1.request;


import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterRequest {


    private String name;

    private String email;

    private String password;
}
