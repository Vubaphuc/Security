package com.example.blogappbackend.dto;

import com.example.blogappbackend.entity.Blog;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class PageBlog {
    private int currentPage;
    private int pageSize;
    private int totalPages;
    private double totalItems;
    private List<Blog> data;
}
