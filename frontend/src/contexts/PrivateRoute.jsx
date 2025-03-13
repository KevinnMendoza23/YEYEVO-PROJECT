// PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  // Mostrar "Cargando..." mientras se obtiene la información del usuario
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si no hay usuario autenticado, redirigir al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si el usuario no tiene el rol permitido, redirigir al home
  if (!allowedRoles.includes(user?.rol)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;