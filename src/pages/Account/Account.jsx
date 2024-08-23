import React, { useState } from "react";
import SignUpForm from "../../components/Forms/SignUpForm/SignUpForm";
import LoginForm from "../../components/Forms/LoginForm/LoginForm";
import { useAuth } from "../../hooks/Context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Account.scss";

const Account = () => {
  const { user, login, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  const handleLoginSuccess = (loggedInUser) => {
    login(loggedInUser);
  };

  const handleRegistrationSuccess = () => {
    setActiveTab("login");
  };

  if (user) {
    return (
      <div className="account">
        <h2 className="account__heading">My Account</h2>
        <h3 className="account__info">Name</h3>
        <p className="account__info">{user.name}</p>
        <h3 className="account__info">Email</h3>
        <p className="account__info">{user.email}</p>
        <button className="account__logout" onClick={logout}>
          Logout
        </button>
        <div className="account__tab">
          <button
            className="account__tab-button"
            onClick={() => navigate("/my-orders")}
          >
            My Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="account">
      <div className="account__tab-content">
        {activeTab === "login" ? (
          <div>
            <LoginForm onLogin={handleLoginSuccess} />
            <p className="account__switch-text">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => switchTab("signup")}
                className="account__switch-tab-button"
              >
                Sign Up
              </button>
            </p>
          </div>
        ) : (
          <div>
            <SignUpForm onSuccess={handleRegistrationSuccess} />
            <p className="account__switch-text">
              Already have an account?{" "}
              <button
                onClick={() => switchTab("login")}
                className="account__switch-tab-button"
              >
                Login
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
