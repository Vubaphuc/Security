package com.example.blogappbackend.repository;

import com.example.blogappbackend.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Integer> {
}