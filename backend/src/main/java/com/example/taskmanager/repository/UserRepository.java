package com.example.taskmanager.repository;

import com.example.taskmanager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * This interface is responsible for handling CRUD operations for users.
 * JpaRepository provides basic CRUD methods automatically.
 */
@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // Find user by username - custom method
    Optional<User> findByUsername(String username);
}
