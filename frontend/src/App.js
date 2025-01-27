import React, {useContext} from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppBar, Toolbar, Typography, Box, Container } from "@mui/material";

// Protected Route Component, checks if user is authenticated
const PrivateRoute = ({ element }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? element : <Navigate to="/" />;
};

const Layout = ({ children }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh"
            }}
        >
            {/* Header */}
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Task Manager
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Container sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 3 }}>
                {children}
            </Container>

            {/* Footer (Sticky at the Bottom) */}
            <Box
                component="footer"
                sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    textAlign: "center",
                    padding: 2,
                    marginTop: "auto"
                }}
            >
                <Typography variant="body2">
                    © {new Date().getFullYear()} Task Manager. All Rights Reserved.
                </Typography>
            </Box>
        </Box>
    );
};

const App = () => (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <Layout>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/tasks" element={<PrivateRoute element={<TaskList />} />} />
                <Route path="/task-form/:id?" element={<PrivateRoute element={<TaskForm />} />} />
              </Routes>
          </Layout>
        </Router>
      </TaskProvider>
    </AuthProvider>
);

export default App;
