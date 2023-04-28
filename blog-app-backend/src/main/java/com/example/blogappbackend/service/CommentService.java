package com.example.blogappbackend.service;

import com.example.blogappbackend.entity.Comment;
import com.example.blogappbackend.exception.NotFoundException;
import com.example.blogappbackend.repository.CommentRepository;
import com.example.blogappbackend.dto.request.UpdateCommentRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;
    public Page<Comment> findListCommentPage(Integer page, Integer pageSize) {
        return commentRepository.findAll(PageRequest.of(page - 1, pageSize));
    }

    public Comment updateCommentById(UpdateCommentRequest request, Integer id) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found Comment with id = " + id);
        });

        comment.setContent(request.getContent());

        commentRepository.save(comment);

        return comment;
    }

    public Comment deleteCommentById(Integer id) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found Comment with id = " + id);
        });

        commentRepository.deleteById(comment.getId());

        return comment;
    }
}
