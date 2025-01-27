import React, { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

// Initial State
const initialState = {
    tasks: [],
    loading: false,
    error: null,
};

// Reducer Function to handle state changes
const taskReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_TASKS":
            return { ...state, tasks: action.payload, loading: false };
        case "ADD_TASK":
            return { ...state, tasks: [...state.tasks, action.payload] };
        case "UPDATE_TASK":
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id ? action.payload : task
                ),
            };
        case "DELETE_TASK":
            return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) };
        case "TASK_ERROR":
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

// Create Context
export const TaskContext = createContext();

// Provider Component
export const TaskProvider = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);
    const { isAuthenticated } = useContext(AuthContext);

    // Function to get the token from localStorage
    const getAuthToken = () => {
        return localStorage.getItem("token"); // Retrieve JWT token
    };

    // Fetch Tasks ONLY if user is authenticated
    useEffect(() => {
        if (isAuthenticated) {
            const getTasks = async () => {
                const token = getAuthToken(); // Get token from localStorage
                if (!token) {
                    dispatch({ type: "TASK_ERROR", payload: "User is not authenticated" });
                    return;
                }
                try {
                    const res = await axios.get("/tasks", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    dispatch({ type: "FETCH_TASKS", payload: res.data });
                } catch (error) {
                    dispatch({ type: "TASK_ERROR", payload: "Error fetching tasks" });
                }
            };
            getTasks();
        }
    }, [isAuthenticated]); // Run only when authentication state changes

    // Add Task
    const addTask = async (taskData) => {
        const token = getAuthToken();
        if (!token) {
            dispatch({ type: "TASK_ERROR", payload: "User is not authenticated" });
            return;
        }
        try {
            const res = await axios.post("/tasks", taskData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch({ type: "ADD_TASK", payload: res.data });
        } catch (error) {
            dispatch({ type: "TASK_ERROR", payload: "Error adding task" });
        }
    };

    // Update Task
    const updateTask = async (id, updatedTask) => {
        const token = getAuthToken();
        if (!token) {
            dispatch({ type: "TASK_ERROR", payload: "User is not authenticated" });
            return;
        }
        try {
            const res = await axios.put(`/tasks/${id}`, updatedTask, {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch({ type: "UPDATE_TASK", payload: res.data });
        } catch (error) {
            dispatch({ type: "TASK_ERROR", payload: "Error updating task" });
        }
    };

    // Delete Task
    const deleteTask = async (id) => {
        const token = getAuthToken();
        if (!token) {
            dispatch({ type: "TASK_ERROR", payload: "User is not authenticated" });
            return;
        }
        try {
            await axios.delete(`/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch({ type: "DELETE_TASK", payload: id });
        } catch (error) {
            dispatch({ type: "TASK_ERROR", payload: "Error deleting task" });
        }
    };

    return (
        <TaskContext.Provider value={{ ...state, addTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};
