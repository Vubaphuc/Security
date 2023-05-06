package com.example.blogappbackend.controller;

import com.example.blogappbackend.dto.request.UpdateUserRequest;
import com.example.blogappbackend.dto.request.UpsertUserRequest;
import com.example.blogappbackend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/admin")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;


//    Lấy ds user (có phân trang, mặc định là pageSize = 10)
    @GetMapping("users")
    public ResponseEntity<?> findListUserPage (@RequestParam Integer page, @RequestParam(defaultValue = "10") Integer pageSize) {
        return ResponseEntity.ok(userService.findListUserPage(page,pageSize));
    }


    // lấy user theo id
    @GetMapping("users/{id}")
    public ResponseEntity<?> findUserById(@PathVariable Integer id) {
        return ResponseEntity.ok(userService.findUserById(id));
    }

    // lấy danh sách roles
    @GetMapping("roles")
    public ResponseEntity<?> findAllRoles() {
        return ResponseEntity.ok(userService.findAllRoles());
    }


//    Tạo user mới
    @PostMapping("users")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> createNewUser (@RequestBody UpsertUserRequest request) {
        log.info("name {}", request.getName());
        log.info("password {}", request.getPassword());
        log.info("email {}", request.getEmail());
        log.info("request {}", request.getRoleIds());
        return ResponseEntity.ok(userService.createNewUser(request));
    }


//    Cập nhật thông tin user
    @PutMapping("users/{id}")
    public ResponseEntity<?> updateUserById(@RequestBody UpdateUserRequest request, @PathVariable Integer id) {
        return ResponseEntity.ok(userService.updateUserById(request,id));
    }
}
