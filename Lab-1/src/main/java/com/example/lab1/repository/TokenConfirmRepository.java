package com.example.lab1.repository;

import com.example.lab1.entity.TokenConfirm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenConfirmRepository extends JpaRepository<TokenConfirm, Integer> {

    Optional<TokenConfirm> findByToken(String Token);


}