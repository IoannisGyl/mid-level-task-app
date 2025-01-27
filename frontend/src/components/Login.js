import React, {useState, useContext, useEffect} from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Card,
    Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AuthContext from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const { login, register, isAuthenticated } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setLocalError] = useState(""); // Local error handling
    const [successMessage, setSuccessMessage] = useState(""); // Success message for registration
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/tasks");  // Redirect after successful login
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({ username: "", password: "" });
        setLocalError(""); // Reset error when switching modes
        setSuccessMessage(""); // Reset success message
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(""); // Clear previous errors before submitting
        setSuccessMessage(""); // Clear success message

        try {
            // Call the login or register function based on the mode
            if (isLogin) {
                await login(formData);
            } else {
                await register(formData); // Wait for successful registration
                setIsLogin(true); // Switch to log-in mode ONLY if registration succeeds
                setSuccessMessage("Registration successful! Please log in.");
                setFormData({ username: "", password: "" }); // Reset form fields after registration
            }
        } catch (error) {
            setSuccessMessage(""); // Clear success message on error
            setLocalError(error.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <Container
            maxWidth="xs"
            sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <Card
                sx={{
                    padding: 4,
                    borderRadius: 3,
                    width: "100%",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
                    background: "#f9f9f9",
                }}
                className="shadow-lg"
            >
                {/* Lock Icon */}
                <Box display="flex" justifyContent="center" mb={2}>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                </Box>

                <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
                    {isLogin ? "Sign In" : "Create Account"}
                </Typography>

                {/* Show success message after successful registration */}
                {successMessage && (
                    <Typography
                        variant="body2"
                        color="success.main"
                        align="center"
                        sx={{ mt: 2, fontWeight: "bold" }}
                    >
                        {successMessage}
                    </Typography>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Username"
                        name="username"
                        variant="outlined"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        name="password"
                        type="password"
                        variant="outlined"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    {/* Error Message */}
                    {error && (
                        <Typography
                            variant="body2"
                            color="error"
                            align="center"
                            sx={{ mt: 2, fontWeight: "bold" }}
                        >
                            {error}
                        </Typography>
                    )}

                    {/* Buttons */}
                    <Box sx={{ textAlign: "center", marginTop: 3 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{
                                width: "100%",
                                padding: 1,
                                fontSize: "1rem",
                                fontWeight: "bold",
                                mb: 2
                            }}
                        >
                            {isLogin ? "Login" : "Register"}
                        </Button>

                        <Button
                            variant="text"
                            color="secondary"
                            onClick={toggleMode}
                            sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
                        >
                            {isLogin ? "Create an Account" : "Back to Login"}
                        </Button>
                    </Box>
                </form>
            </Card>
        </Container>
    );
};

export default Login;
