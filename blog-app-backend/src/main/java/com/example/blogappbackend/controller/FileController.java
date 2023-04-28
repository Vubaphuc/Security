package com.example.blogappbackend.controller;

import com.example.blogappbackend.entity.Image;
import com.example.blogappbackend.dto.response.FileResponse;
import com.example.blogappbackend.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/v1")
public class FileController {

    @Autowired
    private FileService fileService;


//    Upload image theo user (người thực hiện upload chính là user đang login)
    @PostMapping("files")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?>  uploadImageByUser(@ModelAttribute("file")MultipartFile file) {
        FileResponse fileResponse = fileService.uploadFile(file);
        return ResponseEntity.ok(fileResponse);
    }


//    Xem ảnh
    @GetMapping("files/{id}")
    public ResponseEntity<?> findImageById(@PathVariable Integer id) {
        Image image = fileService.readFile(id);
        return ResponseEntity
                .ok()
                .contentType(MediaType.parseMediaType(image.getType()))
                .body(image.getData());
    }
//    Lấy danh sách ảnh của user đang login
    @GetMapping("users/{id}/files")
    public ResponseEntity<?> findListImageByUserLogin (@PathVariable Integer id) {
        return ResponseEntity.ok(fileService.findListImageByUserLogin(id));
    }


//    DELETE : api/v1/files/{id}
    @DeleteMapping("files/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> deleteImageByUserLogin(@PathVariable Integer id) {
        Image image = fileService.deleteImageByUserLogin(id);

        return ResponseEntity
                .ok()
                .contentType(MediaType.parseMediaType(image.getType()))
                .body(image.getData());
    }
//
}
