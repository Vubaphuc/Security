package com.example.blogappbackend.service;

import com.example.blogappbackend.dto.PageBlog;
import com.example.blogappbackend.entity.Blog;
import com.example.blogappbackend.entity.User;
import com.example.blogappbackend.exception.NotFoundException;
import com.example.blogappbackend.repository.BlogRepository;
import com.example.blogappbackend.repository.CategoryRepository;
import com.example.blogappbackend.repository.UserRepository;
import com.example.blogappbackend.dto.request.UpsertBlogRequest;
import com.example.blogappbackend.security.ICurrentUserImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AdminService {
    @Autowired
    private BlogRepository blogRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ICurrentUserImpl iCurrentUser;
    @Autowired
    private CategoryRepository categoryRepository;


    public PageBlog findListBlogPage(Integer page, Integer pageSize) {

        Page<Blog> blogPage = blogRepository.findAll(PageRequest.of(page - 1, pageSize));
        return new PageBlog(
                blogPage.getNumber() + 1,
                blogPage.getSize(),
                blogPage.getTotalPages(),
                blogPage.getTotalElements(),
                blogPage.getContent()
        );
    }

    public PageBlog findListBlogPageByUserLogin(Integer page, Integer pageSize) {

        User user = iCurrentUser.getUser();

        log.info("iCurrent User : {}", user);

        Page<Blog> blogPage = blogRepository.findByUser_IdOrderByCreatedAtDesc(user.getId(), PageRequest.of(page - 1,pageSize));
        return new PageBlog(
                blogPage.getNumber() + 1,
                blogPage.getSize(),
                blogPage.getTotalPages(),
                blogPage.getTotalElements(),
                blogPage.getContent()
        );
    }


    public Blog findBlogById(Integer id) {
        return blogRepository.findBlogById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found Blog with id = " + id);
        });
    }

    public Blog createNewBlog(UpsertBlogRequest request) {

        Blog blog = Blog.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .content(request.getContent())
                .thumbnail(request.getThumbnail())
                .status(request.getStatus())
                .categories(categoryRepository.findAllById(request.getCategoryIds()))
                .build();
        blogRepository.save(blog);
        return blog;
    }

    public Blog updateBlogById(UpsertBlogRequest request, Integer id) {
        Blog blog = blogRepository.findBlogById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found Blog With i = " + id);
        });

        blog.setTitle(request.getTitle());
        blog.setDescription(request.getDescription());
        blog.setContent(request.getContent());
        blog.setThumbnail(request.getThumbnail());
        blog.setStatus(request.getStatus());
        blog.setCategories(categoryRepository.findAllById(request.getCategoryIds()));

        blogRepository.save(blog);

        return blog;
    }

    public Blog deleteBlogById(Integer id) {
        Blog blog = blogRepository.findBlogById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found Blog With i = " + id);
        });
        blogRepository.deleteById(blog.getId());

        return blog;
    }

    public PageBlog searchBlogByKeyword(String keyword, Integer page, Integer pageSize) {
        Page<Blog> blogPage = blogRepository.findAllByTitleContainingIgnoreCase(keyword,PageRequest.of(page - 1,pageSize));
        return new PageBlog(
                blogPage.getNumber() + 1,
                blogPage.getSize(),
                blogPage.getTotalPages(),
                blogPage.getTotalElements(),
                blogPage.getContent()
        );
    }
}
