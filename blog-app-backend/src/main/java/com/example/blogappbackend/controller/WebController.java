package com.example.blogappbackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("admin")
public class WebController {

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("getHome")
    public ResponseEntity<?> getHome () {
        return ResponseEntity.ok("Home");
    }

    @GetMapping("user")
    public ResponseEntity<?> getUser () {
        return ResponseEntity.ok("User");
    }

    @GetMapping("admin")
    public ResponseEntity<?> getAdmin () {
        return ResponseEntity.ok("Admin");
    }

    @GetMapping("author")
    public ResponseEntity<?> getAuthor () {
        return ResponseEntity.ok("Author");
    }
}
