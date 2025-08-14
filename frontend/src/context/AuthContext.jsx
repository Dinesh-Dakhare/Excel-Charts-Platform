// src/context/AuthContext.js
import { createContext, useState } from "react";

// Create context
export const AuthContext = createContext();

// Create provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [role, setRole] = useState(() => localStorage.getItem("role") || null);
const [user,setUser]= useState()
console.log(
  user
);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", user.role);
    setToken(token);
    setRole(user.role);
    setUser(user)
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout ,user,setUser}}>
      {children}
    </AuthContext.Provider>
  );
};
