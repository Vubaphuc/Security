package com.example.blogappbackend.repository;

import com.example.blogappbackend.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findCommentByBlog_IdAndBlog_StatusTrue(Integer id);

}