package com.example.demosecurity.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecurityMethodController {

    @PreAuthorize("hasAnyRole('ADMIN','SALE')")
    @GetMapping("dashboard-method")
    public ResponseEntity<?> getDashboard () {
        return ResponseEntity.ok("dashboard");
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("user-method")
    public ResponseEntity<?> getUser () {
        return ResponseEntity.ok("user");
    }


    @PreAuthorize("hasAnyRole('ADMIN','SALE')")
    @GetMapping("category-method")
    public ResponseEntity<?> getCategory () {
        return ResponseEntity.ok("category");
    }


    @PreAuthorize("hasAnyRole('ADMIN','SALE')")
    @GetMapping("courses-method")
    public ResponseEntity<?> getCourses () {
        return ResponseEntity.ok("courses");
    }


    @PreAuthorize("hasAnyRole('ADMIN','SALE')")
    @GetMapping("brand-method")
    public ResponseEntity<?> getBrand () {
        return ResponseEntity.ok("brand");
    }


    @PreAuthorize("hasAnyRole('ADMIN','SALE')")
    @GetMapping("order-method")
    public ResponseEntity<?> getOrder () {
        return ResponseEntity.ok("order");
    }


    @PreAuthorize("hasAnyRole('ADMIN','SALE', 'AUTHOR')")
    @GetMapping("posts-method")
    public ResponseEntity<?> getPost () {
        return ResponseEntity.ok("posts");
    }
}
