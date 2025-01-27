package com.example.taskmanager.repository;

import com.example.taskmanager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * This interface is responsible for handling CRUD operations for tasks.
 * JPaRepository provides basic CRUD methods automatically.
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}
