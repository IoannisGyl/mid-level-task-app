package com.example.taskmanager.controller;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * This class is responsible for handling CRUD operations for tasks.
 */
@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend to access API
public class TaskController {

    @Autowired
    private TaskService taskService;

    // GET /tasks: Fetch all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    // POST /tasks: Create a new task
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    // PUT /tasks/{id}: Update a task by ID
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        return taskService.updateTask(id, taskDetails);
    }

    // DELETE /tasks/{id}: Delete a task by ID
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}
