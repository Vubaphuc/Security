package com.example.blogappbackend.controller;

import com.example.blogappbackend.dto.PageBlog;
import com.example.blogappbackend.service.BlogService;
import jakarta.annotation.security.PermitAll;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/public")
@Slf4j
public class BlogController {
    @Autowired
    private BlogService blogService;
    @GetMapping("blog")
    public ResponseEntity<?> findAllBlogPage(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "5") int pageSize) {
            PageBlog pageBlog = blogService.findAllBlogPage(page,pageSize);
            log.info("pageBlog : {}",pageBlog.toString());
            return ResponseEntity.ok(pageBlog);
    }

    // 2. Tìm kiếm blog
    @GetMapping("search")
    public ResponseEntity<?> searchBlogByTerm (@RequestParam(defaultValue = "") String term) {
        return ResponseEntity.ok(blogService.searchBlogByTerm(term));
    }

    // 3. Lấy danh sách category
    @GetMapping("categories")
    public ResponseEntity<?> findAllCategories () {
        return ResponseEntity.ok(blogService.findAllCategories());
    }

    // 4. lấy Top danh sách Category nhiều nhất
    @GetMapping("category/top5")
    public ResponseEntity<?> findTopCategories () {
        return ResponseEntity.ok(blogService.findTopCategories());
    }

    // 5. Lấy danh sách các bài viết đã public áp dụng category này
    @GetMapping("categories/{categoryName}")
    public ResponseEntity<?> findBlogsByCategoryName (@PathVariable String categoryName) {
        return ResponseEntity.ok(blogService.findBlogsByCategoryName(categoryName));
    }

    // 6.
    @GetMapping("blog/{blogId}/{blogSlug}")
    public ResponseEntity<?> findBlogByIdAndBySlug (@PathVariable Integer blogId, @PathVariable String blogSlug) {
        return ResponseEntity.ok(blogService.findBlogByIdAndBySlug(blogId, blogSlug));
    }

}
