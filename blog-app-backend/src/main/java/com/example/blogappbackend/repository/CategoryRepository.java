package com.example.blogappbackend.repository;

import com.example.blogappbackend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Optional<Category> findById(Integer integer);

    Optional<Category> findByNameContainsIgnoreCase(String name);
}