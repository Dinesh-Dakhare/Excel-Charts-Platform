// src/context/AuthContext.js
import { createContext, useState ,useEffect} from "react";
import {jwtDecode} from "jwt-decode";
// Create context
export const AuthContext = createContext();

// Create provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [role, setRole] = useState(null);
const [user,setUser]= useState()

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded.role);
        setRole(decoded.role);   // role comes securely from JWT
      } catch (err) {
        console.error("Invalid token", err);
        setRole(null);
      }
    }
  }, [token]);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser({...user,profileImageUrl:user.profileImageUrl})
  };

  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout ,user,setUser}}>
      {children}
    </AuthContext.Provider>
  );
};
