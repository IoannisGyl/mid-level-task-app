package com.example.taskmanager.service;

import com.example.taskmanager.controller.security.JwtUtil;
import com.example.taskmanager.model.User;
import com.example.taskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

/**
 * This service is responsible for handling user authentication and registration.
 */
@Service
public class UserService {

    private UserRepository userRepository;

    private final JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }


    public String authenticateUser(String username, String password) {
        Optional<User> existingUser = userRepository.findByUsername(username);
        if (existingUser.isPresent() && passwordEncoder.matches(password, existingUser.get().getPassword())) {
            return jwtUtil.generateToken(existingUser.get());
        }
        throw new RuntimeException("Invalid credentials");
    }

    public User registerUser(User user) {
        if (userRepository.existsById(user.getUsername())) {
            throw new RuntimeException("User already exists");
        }
        user.setRole("ROLE_USER"); // Assign default role
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Encrypt password before saving
        return userRepository.save(user);
    }

    public Optional<User> getUser(String username) {
        return userRepository.findByUsername(username);
    }
}
