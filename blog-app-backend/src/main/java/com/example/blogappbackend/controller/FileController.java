package com.example.blogappbackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1")
public class FileController {


//    Upload image theo user (người thực hiện upload chính là user đang login)
//    POST : api/v1/files
    @PostMapping("files")
    public ResponseEntity<?>  uploadImageByUser() {
        return ResponseEntity.ok("");
    }
//    Xem ảnh
//    GET : api/v1/files/{id}
    @GetMapping("files/{id}")
    public ResponseEntity<?> findImageById(@PathVariable Integer id) {
        return ResponseEntity.ok("");
    }
//    Lấy danh sách ảnh của user đang login
//    GET : api/v1/users/{id}/files
    @GetMapping("users/{id}/files")
    public ResponseEntity<?> findListImageByUserLogin (@PathVariable Integer id) {
        return ResponseEntity.ok("");
    }


//    Xóa ảnh (nếu không phải ảnh của user upload -> không cho xóa)
//    DELETE : api/v1/files/{id}
    @DeleteMapping("files/{id}")
    public ResponseEntity<?> deleteImageByUserLogin(@PathVariable Integer id) {
        return ResponseEntity.ok("");
    }
//
}
