package com.example.blogappbackend.service;

import com.example.blogappbackend.dto.CategoryDto;
import com.example.blogappbackend.dto.PageBlog;
import com.example.blogappbackend.entity.Blog;
import com.example.blogappbackend.entity.Category;
import com.example.blogappbackend.exception.NotFoundException;
import com.example.blogappbackend.mapper.CategoryMapper;
import com.example.blogappbackend.repository.BlogRepository;
import com.example.blogappbackend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogService {

    @Autowired
    BlogRepository blogRepository;
    @Autowired
    CategoryRepository categoryRepository;


    public PageBlog findAllBlogPage(int page, int pageSize) {
        Page<Blog> blogPage = blogRepository.findAll(PageRequest.of(page - 1, pageSize));
        return new PageBlog(
                blogPage.getNumber() + 1,
                blogPage.getSize(),
                blogPage.getTotalPages(),
                blogPage.getTotalElements(),
                blogPage.getContent()
        );
    }

    public List<Blog> searchBlogByTerm(String term) {
        return blogRepository.findByTitleContainingIgnoreCase(term);
    }


    // 3. Lấy danh sách category
    public List<CategoryDto> findAllCategories() {
        return listCategories();
    }

    // 4. lấy Top danh sách Category nhiều nhất
    public List<CategoryDto> findTopCategories(int limit) {
       return topCategory(listCategories(),limit);
    }

    // lấy list categry
    private List<CategoryDto> listCategories () {
         return categoryRepository.findAll()
                 .stream()
                 .map(category -> {
                     Long count = blogRepository.countByCategories(category);
                     return CategoryMapper.toCategoryDto(category, count);
                 })
                 .collect(Collectors.toList());
    }


    // lấy top category dùng nhiều nhất
    private List<CategoryDto> topCategory (List<CategoryDto> categoryDtos, int limit) {
        Collections.sort(categoryDtos, new Comparator<CategoryDto>() {
            @Override
            public int compare(CategoryDto o1, CategoryDto o2) {
                return o2.getUsed().compareTo(o1.getUsed());
            }
        });
        return categoryDtos.subList(0,Math.min(categoryDtos.size(),limit));
    }

    // 5.
    public List<Blog> findBlogsByCategoryName(String categoryName) {
        return blogRepository.findByCategories_NameContainsIgnoreCaseAndStatusTrue(categoryName);
    }

    // 6.
    public Blog findBlogByIdAndBySlug(Integer blogId, String blogSlug) {
        return blogRepository.findByIdAndSlugContainsIgnoreCaseAndStatusTrue(blogId,blogSlug).orElseThrow(() -> {
            throw new NotFoundException("Not Found Blog Or Blog Not Public");
        });
    }
}
