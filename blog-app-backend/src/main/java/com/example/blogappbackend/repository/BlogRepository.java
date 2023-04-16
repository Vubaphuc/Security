package com.example.blogappbackend.repository;

import com.example.blogappbackend.entity.Blog;
import com.example.blogappbackend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BlogRepository extends JpaRepository<Blog, Integer> {

    List<Blog> findByTitleContainingIgnoreCase(String term);

    Long countByCategories(Category category);

    List<Blog> findByCategories_NameContainsIgnoreCaseAndStatusTrue(String categoryName);

    Optional<Blog> findByIdAndSlugContainsIgnoreCaseAndStatusTrue(Integer blogId, String blogSlug);




}