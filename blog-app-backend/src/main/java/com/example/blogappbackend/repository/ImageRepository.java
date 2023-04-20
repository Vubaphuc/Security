package com.example.blogappbackend.repository;

import com.example.blogappbackend.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Integer> {
    List<Image> findAllByUser_Id(Integer id);
}