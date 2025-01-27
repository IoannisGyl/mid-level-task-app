package com.example.taskmanager.controller;

import com.example.taskmanager.controller.security.JwtUtil;
import com.example.taskmanager.model.User;
import com.example.taskmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * This class is responsible for handling user authentication and registration.
 */
@RestController
@RequestMapping("")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private UserService userService;

    private JwtUtil jwtUtil;

    @Autowired
    public AuthController(JwtUtil jwtUtil, UserService userService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    // POST /login: User authentication
    @PostMapping("/login")
    public String login(@RequestBody User user) {
        String token = userService.authenticateUser(user.getUsername(),user.getPassword());
        if (token != null) {
            return token;
        }
        return "Invalid credentials";
    }

    // Optional: User registration
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        try {
            return userService.registerUser(user);
        // Catch any exceptions or errors and print out what went wrong
        }catch (RuntimeException e) {
            if(e.getMessage().equals("User already exists")) {
                System.out.println("User already exists");
            }else{
                System.out.println("Error occurred while registering user: " + e.getMessage());
            }
        }
        return null;
    }
}
