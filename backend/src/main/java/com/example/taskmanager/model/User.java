package com.example.taskmanager.model;

import jakarta.persistence.*;

/**
 * This class represents a user in the application.
 */
@Entity
@Table(name = "users")
public class User {

    // Fields
    @Id
    private String username;
    private String password;
    private String role; // New field to store user roles (e.g., ROLE_USER, ROLE_ADMIN)


    // Constructors
    public User() {}

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    // Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
}