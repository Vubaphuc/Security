package com.example.blogappbackend.mapper;

import com.example.blogappbackend.dto.CategoryDto;
import com.example.blogappbackend.dto.UserDto;
import com.example.blogappbackend.entity.Category;
import com.example.blogappbackend.entity.User;

public class CategoryMapper {
    public static CategoryDto toCategoryDto(Category category, Long count) {
        CategoryDto categoryDto = new CategoryDto(
                category.getId(),
                category.getName(),
                count
        );
        return categoryDto;
    }
}
