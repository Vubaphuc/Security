package com.example.blogappbackend.repository;

import com.example.blogappbackend.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
}