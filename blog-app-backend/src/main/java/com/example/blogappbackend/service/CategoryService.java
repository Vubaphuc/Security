package com.example.blogappbackend.service;

import com.example.blogappbackend.entity.Blog;
import com.example.blogappbackend.entity.Category;
import com.example.blogappbackend.exception.BadRequestException;
import com.example.blogappbackend.exception.NotFoundException;
import com.example.blogappbackend.repository.BlogRepository;
import com.example.blogappbackend.repository.CategoryRepository;
import com.example.blogappbackend.request.UpsertCategoryRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private BlogRepository blogRepository;
    public Page<Category> findListCategoryPage(Integer page, Integer pageSize) {
        return categoryRepository.findAll(PageRequest.of(page - 1, pageSize));
    }

    public Category createNewCategory(UpsertCategoryRequest request) {
        Optional<Category> categoryOptional = categoryRepository.findByNameContainsIgnoreCase(request.getName());
        if (categoryOptional.isPresent()) {
            throw new BadRequestException("Category đã tồn tại");
        }

        Category category = new Category(null, request.getName());

        categoryRepository.save(category);

        return category;
    }

    public Category updateCategoryById(UpsertCategoryRequest request, Integer id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found Category with = " + id);
        });

        if (category.getName().equalsIgnoreCase(request.getName())) {
            throw new BadRequestException("Name Category bị trùng");
        }
        category.setName(request.getName());

        return category;
    }

    public Category deleteCategoryById(Integer id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found Category with = " + id);
        });

        List<Blog> blogs = blogRepository.findByCategoriesContainingIgnoreCase(category);

        for (Blog blog: blogs) {
            blog.getCategories().remove(category);
        }

        categoryRepository.deleteById(category.getId());

        return category;
    }
}
