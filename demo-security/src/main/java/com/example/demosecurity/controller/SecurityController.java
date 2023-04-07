package com.example.demosecurity.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecurityController {

    @GetMapping("/")
    public ResponseEntity<?> getHome () {
        return ResponseEntity.ok("home");
    }


    @GetMapping("dashboard")
    public ResponseEntity<?> getDashboard () {
        return ResponseEntity.ok("dashboard");
    }


    @GetMapping("user")
    public ResponseEntity<?> getUser () {
        return ResponseEntity.ok("user");
    }


    @GetMapping("category")
    public ResponseEntity<?> getCategory () {
        return ResponseEntity.ok("category");
    }


    @GetMapping("courses")
    public ResponseEntity<?> getCourses () {
        return ResponseEntity.ok("courses");
    }


    @GetMapping("brand")
    public ResponseEntity<?> getBrand () {
        return ResponseEntity.ok("brand");
    }


    @GetMapping("order")
    public ResponseEntity<?> getOrder () {
        return ResponseEntity.ok("order");
    }


    @GetMapping("posts")
    public ResponseEntity<?> getPost () {
        return ResponseEntity.ok("posts");
    }
}
