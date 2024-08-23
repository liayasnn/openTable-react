import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../apiConfig/apiConfig";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [guestId, setGuestId] = useState(() => {
    const savedGuestId = localStorage.getItem("guestId");
    return savedGuestId || generateGuestId();
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.removeItem("guestId"); // Remove guestId if the user logs in
    } else {
      localStorage.removeItem("user");
    }

    if (guestId) {
      localStorage.setItem("guestId", guestId);
    }
  }, [user, guestId]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setGuestId(generateGuestId()); // Generate a new guestId on logout
    localStorage.removeItem("user");
  };

  const generateGuestId = () => {
    const guestId = `guest_${Math.random().toString(36).substring(2, 15)}`;
    return guestId;
  };

  const registerUser = async (userData) => {
    try {
      const response = await axios.post(
        '${API_BASE_URL}/api/users',
        userData
      );
      login(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to register user:", error);
      throw error;
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(
        "${API_BASE_URL}/api/users/login",
        { email, password }
      );
      login(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to log in user:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, guestId, login, logout, registerUser, loginUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
