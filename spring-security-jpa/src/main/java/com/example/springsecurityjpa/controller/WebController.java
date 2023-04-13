package com.example.springsecurityjpa.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


// dùng thyleaf   thì phải cài đặt controller là @Controller k còn là @RestController
@Controller
public class WebController {


    @GetMapping("/")
    public String getHome() {


        return "index";
    }

    @GetMapping("/users")
    public String getUser() {

        return "user";
    }

    @GetMapping("/admin")
    public String getAdmin() {
        return "admin";
    }

    @GetMapping("/author")
    public String getAuthor() {
        return "author";
    }

    @GetMapping("/login")
    public String getLoginPage() {
        return "login";
    }

}
