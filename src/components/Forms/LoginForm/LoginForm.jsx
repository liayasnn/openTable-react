import React, { useState } from "react";
import { loginUser } from "../../../hooks/UserService/UserService";
import { useAuth } from "../../../hooks/Context/AuthContext/AuthContext";
import "./LoginForm.scss";

const LoginForm = ({ onLogin }) => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await loginUser(credentials);
      login(user);
      onLogin(user);
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-form">
      <h2 className="login-form__heading">Login</h2>
      {error && <p className="login-form__error">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form__form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
