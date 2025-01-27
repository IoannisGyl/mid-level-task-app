import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Box
} from "@mui/material";
import AuthContext from "../context/AuthContext";
import TaskForm from "./TaskForm";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const TaskList = () => {
    const { tasks, deleteTask } = useContext(TaskContext);
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [currentTask, setCurrentTask] = useState(null); // Store the task being edited

    // Redirect if user is not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/"); // Redirect to login if not authenticated
        }
    }, [isAuthenticated, navigate]);

    const handleEdit = (task) => {
        setCurrentTask(task);
        navigate(`/task-form/${task.id}`); // Navigate with task ID
    };

    return (
        <Container className="mt-4">
            {/* Header */}
            <Typography variant="h4" align="center" gutterBottom>
                Task Manager
            </Typography>

            {/* Create Task Button */}
            <Box display="flex" justifyContent="center" className="mb-4">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/task-form")}
                >
                    Create Task
                </Button>
            </Box>

            {/* Show Task Form when editing or creating a task */}
            {showForm && <TaskForm task={currentTask} onClose={() => setShowForm(false)} />}

            {/* Grid Layout for Task Cards */}
            {tasks && tasks.length > 0 ? (
                <Grid container spacing={3}>
                    {tasks.map(task => (
                        <Grid item xs={12} sm={6} md={4} key={task.id}>
                            <Card
                                className="shadow-sm"
                                sx={{
                                    borderRadius: 3,
                                    boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
                                    transition: "0.3s",
                                    "&:hover": { boxShadow: "0 6px 20px rgba(0,0,0,0.3)" }
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                        {task.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {task.description}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: "center" }}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => handleEdit(task)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => deleteTask(task.id)}
                                    >
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="body1" color="textSecondary" align="center">
                    No tasks available.
                </Typography>
            )}

            {/* Logout Button */}
            <Box
                sx={{
                    position: "fixed",
                    bottom: 100,
                    right: 70
                }}
            >
                <Button
                    variant="contained"
                    sx={{ backgroundColor: "#d32f2f", color: "white", "&:hover": { backgroundColor: "#b71c1c" } }}
                    onClick={logout}
                >
                    Logout
                </Button>
            </Box>
        </Container>
    );
};

export default TaskList;
