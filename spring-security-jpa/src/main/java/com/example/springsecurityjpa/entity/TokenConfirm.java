package com.example.springsecurityjpa.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "token_confirm")
public class TokenConfirm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "token", unique = true, nullable = false)
    private String token;
    @Column(name = "Thời gian tạo")
    private LocalDateTime createdAt;
    @Column(name = "Thời gian hết hạn")
    private LocalDateTime expiresAt;
    @Column(name = "Ngày xác thực")
    private LocalDateTime confirmedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.expiresAt = createdAt.plusDays(3);
    }

}