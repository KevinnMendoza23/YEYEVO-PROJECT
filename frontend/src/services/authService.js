import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Asegúrate de que esta URL sea correcta

const saveUserData = (token, user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }
};

// Función para registrar usuario
export const registerUser = async (userData) => {
  try {
    console.log("Enviando datos de registro:", userData); // 🚀 Log para depuración

    const response = await axios.post(`${API_URL}/register`, userData);
    
    console.log("Respuesta del backend (registro):", response.data); // 🚀 Ver qué devuelve el backend

    const { token, user } = response.data;

    saveUserData(token, user);

    return { token, user };
  } catch (error) {
    console.error("Error en registerUser:", error.response?.data || error);
    throw new Error(error.response?.data?.message || "Error en el registro");
  }
};

// Iniciar sesión
export const loginUser = async (userData) => {
  try {
    console.log("Enviando datos de login:", userData); // 🚀 Log para depuración

    const response = await axios.post(`${API_URL}/login`, userData);
    
    console.log("Respuesta del backend (login):", response.data); // 🚀 Log para ver qué responde el backend

    const { token, user } = response.data;

    saveUserData(token, user);

    return { token, user };
  } catch (error) {
    console.error("Error en login:", error.response?.data || error.message); // 🚀 Log para depuración

    throw new Error(error.response?.data?.message || "Error en el inicio de sesión");
  }
};

// Obtener perfil del usuario autenticado
export const getUserProfile = async (token) => {
  try {
    console.log("Obteniendo perfil con token:", token); // 🚀 Verificar el token antes de enviarlo

    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Perfil del usuario:", response.data); // 🚀 Log para depuración
    return response.data;
  } catch (error) {
    console.error("Error al obtener perfil:", error.response?.data || error.message); // 🚀 Log para depuración
    throw new Error(error.response?.data?.message || "Error al obtener el perfil");
  }
};

// Cerrar sesión
export const logoutUser = () => {
  console.log("Cerrando sesión..."); // 🚀 Log para depuración

  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};