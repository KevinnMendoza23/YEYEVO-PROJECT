import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { getUserProfile, loginUser, registerUser } from "../services/authService";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Función para cerrar sesión
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }, [navigate]);

  // Función para obtener perfil de usuario
  const fetchUserProfile = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const userData = await getUserProfile();
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error obteniendo perfil:", error);
      logout();
    } finally {
      setLoading(false);
    }
  }, [token, logout]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  // Función para iniciar sesión
  const login = async (credentials) => {
    try {
      const { token, user } = await loginUser(credentials);
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirigir al usuario según su rol
      navigate(user.rol === "admin" ? "/admin-dashboard" : "/product/1");
    } catch (error) {
      console.error("Error en el inicio de sesión", error);
      throw error;
    }
  };

  // Función para registrar usuario y redirigir a login después
  const register = async (userData) => {
    try {
      await registerUser(userData);
      alert("Registro exitoso, ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (error) {
      console.error("Error en el registro", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {loading ? <p>Cargando...</p> : children}
    </AuthContext.Provider>
  );
};