import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.scss";
import { loginUser } from "../../../hooks/UserService/UserService";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({
        email: username,
        password: password,
      });
      console.log(response.username);
      if (response.role === "ADMIN") {
        localStorage.setItem("isAdminLoggedIn", true);
        navigate("/admin/dashboard");
      } else {
        setError("You do not have admin privileges.");
      }
    } catch (error) {
      setError("Invalid credentials. Please try again.");
      console.log(error);
      console.log(username);
      console.log(password);
    }
  };

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div className="admin-login__form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="admin-login__form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="admin-login__error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
