package com.example.blogappbackend.repository;

import com.example.blogappbackend.entity.Blog;
import com.example.blogappbackend.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BlogRepository extends JpaRepository<Blog, Integer> {

    Page<Blog> findAllByStatusTrue(Pageable pageable);

    List<Blog> findByTitleContainingIgnoreCaseAndStatusTrue(String term);

    Long countByCategories(Category category);


    Optional<Blog> findByIdAndSlugContainsIgnoreCaseAndStatusTrue(Integer blogId, String blogSlug);

    List<Blog> findByCategories_NameContainsIgnoreCaseAndStatusTrue(String name);






}