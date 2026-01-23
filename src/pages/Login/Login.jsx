import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Add default user on first load
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Default user: email: admin@gmail.com, password: 123456
    const defaultUserExists = users.find((u) => u.email === "admin@gmail.com");
    if (!defaultUserExists) {
      users.push({ name: "Admin", email: "admin@gmail.com", password: "123456" });
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("Login successful!");
      
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
