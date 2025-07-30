// src/context/auth.js
import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);

      try {
        const decoded = jwtDecode(parseData.token);

        if (decoded.exp * 1000 < Date.now()) {
          // Token expired
          localStorage.removeItem("auth");
          setAuth({ user: null, token: "" });
          navigate("/login"); // Redirect to login
        } else {
          setAuth({
            user: parseData.user,
            token: parseData.token,
          });

          // Set default header
          axios.defaults.headers.common["Authorization"] = parseData.token;
        }
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("auth");
        setAuth({ user: null, token: "" });
        navigate("/login");
      }
    }
  }, [navigate]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

  // Set default header for axios
const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };