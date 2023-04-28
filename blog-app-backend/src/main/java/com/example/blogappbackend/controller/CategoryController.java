package com.example.blogappbackend.controller;

import com.example.blogappbackend.dto.request.UpsertCategoryRequest;
import com.example.blogappbackend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/admin")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

//    Lấy ds category (có phân trang, mặc định là pageSize = 10)
    @GetMapping("categories")
    public ResponseEntity<?> findListCategoryPage(@RequestParam Integer page, @RequestParam(defaultValue = "10") Integer pageSize) {
        return ResponseEntity.ok(categoryService.findListCategoryPage(page,pageSize));
    }


//    Thêm category (Lưu ý tên category không được trùng nhau)
    @PostMapping("categories")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> createNewCategory (@RequestBody UpsertCategoryRequest request) {
        return ResponseEntity.ok(categoryService.createNewCategory(request));
    }


//    Cập nhật category (Lưu ý tên category không được trùng nhau)
    @PutMapping("categories/{id}")
    public ResponseEntity<?> updateCategoryById(@RequestBody UpsertCategoryRequest request, @PathVariable Integer id) {
        return ResponseEntity.ok(categoryService.updateCategoryById(request, id));
    }


//    Xóa category (xóa blog áp dụng category trong bảng trung gian, không xóa blog trong bảng blog)
    @DeleteMapping("categories/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> deleteCategoryById(@PathVariable Integer id) {
        return ResponseEntity.ok(categoryService.deleteCategoryById(id));
    }
}
