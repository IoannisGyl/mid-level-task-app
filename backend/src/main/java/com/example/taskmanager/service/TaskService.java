package com.example.taskmanager.service;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * This service is responsible for handling CRUD operations for tasks.
 */
@Service
public class TaskService {

    private TaskRepository taskRepository;

    public TaskService() {}

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // GET /tasks: Fetch all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // POST /tasks: Create a new task
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    // PUT /tasks/{id}: Update a task
    public Task updateTask(Long id, Task taskDetails) {
        Optional<Task> taskOptional = taskRepository.findById(id);
        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();
            task.setTitle(taskDetails.getTitle());
            task.setDescription(taskDetails.getDescription());
            return taskRepository.save(task);
        }
        throw new RuntimeException("Task not found");
    }

    // DELETE /tasks/{id}: Delete a task
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}

