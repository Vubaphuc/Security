package com.example.blogappbackend.controller;

import com.example.blogappbackend.request.UpdateCommentRequest;
import com.example.blogappbackend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/admin")
public class CommentController {
    @Autowired
    private CommentService commentService;

    //    Hiển thị ds comment (có phân trang, mặc định là pageSize = 10)
    @GetMapping("comments")
    public ResponseEntity<?> findListCommentPage(@RequestParam Integer page, @RequestParam(defaultValue = "10") Integer pageSize) {
        return ResponseEntity.ok(commentService.findListCommentPage(page,pageSize));
    }



    //    Cập nhật thông tin comment
    @PutMapping("comments/{id}")
    public ResponseEntity<?> updateCommentById(@RequestBody UpdateCommentRequest request, @PathVariable Integer id) {
        return ResponseEntity.ok(commentService.updateCommentById(request,id));
    }



    //    Xóa comment
    @DeleteMapping("comments/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> deleteCommentById(@PathVariable Integer id) {
        return ResponseEntity.ok(commentService.deleteCommentById(id));
    }
}
