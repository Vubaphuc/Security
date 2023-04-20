package com.example.blogappbackend.controller;

import com.example.blogappbackend.request.UpsertUserRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/admin")
public class UserController {

//    Lấy ds user (có phân trang, mặc định là pageSize = 10)
//    GET : api/v1/admin/users?page={page}&pageSize={pageSize}
    @GetMapping("users")
    public ResponseEntity<?> findListUserPage (@RequestParam Integer page, @RequestParam(defaultValue = "10") Integer pageSize) {
        return ResponseEntity.ok("");
    }
//    Tạo user mới
//    POST : api/v1/admin/users
    @PostMapping("users")
    public ResponseEntity<?> createNewUser (@RequestBody UpsertUserRequest request) {
        return ResponseEntity.ok("");
    }
//    Cập nhật thông tin user
//    PUT : api/v1/admin/users/{id}
    @PutMapping("users/{id}")
    public ResponseEntity<?> updateUserById(@RequestBody UpsertUserRequest request, @PathVariable Integer id) {
        return ResponseEntity.ok("");
    }
}
