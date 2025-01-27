import React, { useState, useContext, useEffect } from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { TaskContext } from "../context/TaskContext";

const TaskForm = () => {
    const { addTask, updateTask, tasks } = useContext(TaskContext);
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams(); // ✅ Extract task ID from URL

    // Find the task in the context by its ID (if it exists)
    const taskToEdit = tasks.find(task => task.id === parseInt(id)) || null;

    // Initialize form data (empty for new task, pre-filled for editing)
    const [formData, setFormData] = useState({
        title: taskToEdit ? taskToEdit.title : "",
        description: taskToEdit ? taskToEdit.description : "",
    });

    // Store initial form data for comparison
    const [originalData, setOriginalData] = useState({ ...formData });

    // Redirect if user is not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/"); // Redirect to login if not authenticated
        }
    }, [isAuthenticated, navigate]);

    // Update form data when `taskToEdit` changes (e.g., when navigating)
    useEffect(() => {
        if (taskToEdit) {
            setFormData({ title: taskToEdit.title, description: taskToEdit.description });
            setOriginalData({ title: taskToEdit.title, description: taskToEdit.description }); // Store initial state
        }
    }, [taskToEdit]);

    // Handle Input Changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Check if there are changes in the form
    const isUnchanged = taskToEdit &&
        formData.title === originalData.title &&
        formData.description === originalData.description;

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (taskToEdit) {
                await updateTask(taskToEdit.id, formData);
            } else {
                await addTask(formData);
            }
            navigate("/tasks"); // Redirect after submission
        } catch (error) {
            console.error("Error saving task:", error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 5, borderRadius: 2 }}>
                <Typography variant="h5" align="center">
                    {taskToEdit ? "Edit Task" : "Create Task"}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        variant="outlined"
                        value={formData.title}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Description"
                        name="description"
                        variant="outlined"
                        value={formData.description}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        disabled={taskToEdit && isUnchanged} // Disable if no changes are made to an existing task
                    >
                        {taskToEdit ? "Update Task" : "Create Task"}
                    </Button>
                </form>
                <Button fullWidth color="secondary" onClick={() => navigate("/tasks")} sx={{ mt: 2 }}>
                    Cancel
                </Button>
            </Paper>
        </Container>
    );
};

export default TaskForm;
