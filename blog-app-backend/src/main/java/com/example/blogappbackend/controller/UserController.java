package com.example.blogappbackend.controller;

import com.example.blogappbackend.dto.request.UpsertUserRequest;
import com.example.blogappbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/admin")
public class UserController {

    @Autowired
    private UserService userService;


//    Lấy ds user (có phân trang, mặc định là pageSize = 10)
    @GetMapping("users")
    public ResponseEntity<?> findListUserPage (@RequestParam Integer page, @RequestParam(defaultValue = "10") Integer pageSize) {
        return ResponseEntity.ok(userService.findListUserPage(page,pageSize));
    }


//    Tạo user mới
    @PostMapping("users")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> createNewUser (@RequestBody UpsertUserRequest request) {
        return ResponseEntity.ok(userService.createNewUser(request));
    }


//    Cập nhật thông tin user
    @PutMapping("users/{id}")
    public ResponseEntity<?> updateUserById(@RequestBody UpsertUserRequest request, @PathVariable Integer id) {
        return ResponseEntity.ok(userService.updateUserById(request,id));
    }
}
