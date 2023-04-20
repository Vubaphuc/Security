package com.example.blogappbackend.controller;

import com.example.blogappbackend.entity.User;
import com.example.blogappbackend.exception.NotFoundException;
import com.example.blogappbackend.repository.BlogRepository;
import com.example.blogappbackend.repository.UserRepository;
import com.example.blogappbackend.request.UpsertBlogRequest;
import com.example.blogappbackend.service.AdminService;
import com.example.blogappbackend.service.CustomUserDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/admin")
@Slf4j
public class AdminController {
    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private AdminService adminService;

    @Autowired
    private UserRepository userRepository;

    //    Lấy danh sách blog (có phân trang, mặc định là pageSize = 10)
//    GET : api/v1/admin/blogs?page={page}&pageSize={pageSize}
    @GetMapping("blogs")
    public ResponseEntity<?> findListBlogPage(@RequestParam Integer page, @RequestParam(defaultValue = "10") Integer pageSize) {
        return ResponseEntity.ok(adminService.findListBlogPage(page,pageSize));
    }


    //    Lấy danh sách blog của user đang login (có phân trang, mặc định là pageSize = 10)
//    GET : api/v1/admin/blogs/own-blogs?page={page}&pageSize={pageSize}
    @GetMapping("blogs/own-blogs")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_AUTHOR')")
    public ResponseEntity<?> findListBlogPageByUserLogin(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "10") Integer pageSize) {

        return ResponseEntity.ok(adminService.findListBlogPageByUserLogin(page,pageSize));
    }


//    Lấy chi tiết blog theo id
//    GET : api/v1/admin/blogs/{id}
    @GetMapping("blogs/{id}")
    public ResponseEntity<?> findBlogById(@PathVariable Integer id) {
        return ResponseEntity.ok(adminService.findBlogById(id));
    }
//    Thêm blog mới
//    POST : api/v1/admin/blogs
    @PostMapping("blogs")
    public ResponseEntity<?> createNewBlog (@RequestBody UpsertBlogRequest request) {
        return ResponseEntity.ok(adminService.createNewBlog(request));
    }
//    Cập nhật blog
//    PUT : api/v1/admin/blogs/{id}
    @PutMapping("blogs/{id}")
    public ResponseEntity<?> updateBlogById(@RequestBody UpsertBlogRequest request, @PathVariable Integer id) {
        return ResponseEntity.ok(adminService.updateBlogById(request, id));
    }
//    Xóa blog (xóa blog xóa luôn comment liên quan đến blog)
//    DELETE : api/v1/admin/blogs/{id}
    @DeleteMapping("blogs/{id}")
    public ResponseEntity<?> deleteBlogById(@PathVariable Integer id) {
        return ResponseEntity.ok("Đã Xóa " + adminService.deleteBlogById(id));
    }
//    Tìm kiếm bài viết (chỉ cần bài viết chứa keyword là được)
//    GET : api/v1/admin/blogs/search?keyword={keyword}&page={page}&pageSize={pageSize}
    @GetMapping("search")
    public ResponseEntity<?> searchBlogByKeyword (@RequestParam String keyword,
                                                  @RequestParam Integer page,
                                                  @RequestParam Integer pageSize) {
        return ResponseEntity.ok(adminService.searchBlogByKeyword(keyword,page,pageSize));
    }

}
