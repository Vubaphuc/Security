package com.example.springsecurityjpa.repository;

import com.example.springsecurityjpa.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {
}