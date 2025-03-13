import { createContext, useContext } from "react";

// Crear el contexto de autenticación
export const AuthContext = createContext(null);

// Hook personalizado para usar el contexto en cualquier componente
export const useAuth = () => {
  return useContext(AuthContext);
};