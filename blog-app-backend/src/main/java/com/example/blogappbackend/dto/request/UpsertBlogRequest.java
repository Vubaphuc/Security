package com.example.blogappbackend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpsertBlogRequest {
    private String title;
    private String description;
    private String content;
    private Boolean status;
    private List<Integer> categoryIds;
}
