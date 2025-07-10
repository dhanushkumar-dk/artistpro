import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import HeaderBanner from "../Others/Banners/HeaderBanner";
import Navbar from "../Others/components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordHints, setPasswordHints] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Real-time password rule check (only 1 special char now)
  const checkPasswordRules = (password) => {
    const issues = [];
    const specialChars = password.match(/[@#$%/]/g) || [];
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);

    if (password.length < 8) issues.push("Minimum 8 characters required");
    if (specialChars.length < 1)
      issues.push("At least 1 special character required (@, #, $, %, /)");
    if (!hasLower) issues.push("At least 1 lowercase letter required");
    if (!hasUpper) issues.push("At least 1 uppercase letter required");
    if (!hasDigit) issues.push("At least 1 number required");

    return issues;
  };

  // Submit handler with validation
  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    const passwordIssues = checkPasswordRules(password);

    if (!validateEmail(email)) {
      validationErrors.email = "Invalid email format";
    }

    if (passwordIssues.length > 0) {
      validationErrors.password = "Password does not meet requirements";
    }

    setErrors(validationErrors);
    setPasswordHints(passwordIssues);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.post("http://localhost:5000/login", {
          email,
          password,
        });
        localStorage.setItem("token", res.data.token);
        navigate("/");
      } catch (err) {
        setError("Invalid credentials");
      }
    }
  };

  return (
    <div>
      <HeaderBanner />
      <Navbar />
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div
          className="card p-4 shadow-lg"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="mb-0">Login</h3>
            <Link to="/home" className="btn btn-outline-primary btn-sm">
              Home
            </Link>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  const pwd = e.target.value;
                  setPassword(pwd);
                  setPasswordHints(checkPasswordRules(pwd));
                }}
                required
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
              {passwordHints.length > 0 && (
                <ul className="mt-2 text-warning small ps-3">
                  {passwordHints.map((hint, index) => (
                    <li key={index}>{hint}</li>
                  ))}
                </ul>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>

          {error && <div className="alert alert-danger mt-3">{error}</div>}

          <p className="text-center mt-3 mb-0">
            Don’t have an account? <Link to="/register">Register here</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
