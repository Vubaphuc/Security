package com.example.springsecurityjpa.request;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginRequest {

    private String email;
    // dữ liệu cần gửi lên thì cần vadi cho nó.
    private String password;
}
