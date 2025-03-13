import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

// Importar componentes comunes
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Loader from "./components/common/Loader";

// Importar páginas
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import UserProfile from "./pages/UserProfile";
import AdminDashboard from "./pages/AdminDashboard";

// Importar rutas protegidas
import PrivateRoute from "./contexts/PrivateRoute";

const AppRoutes = () => {
  const { user, loading } = useAuth();

  // Mostrar el Loader si el estado de autenticación aún está cargando
  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/product/1" replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/product/1" replace /> : <Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Rutas protegidas para usuarios autenticados */}
        <Route element={<PrivateRoute allowedRoles={["user", "admin"]} />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Route>

        {/* Ruta protegida solo para administradores */}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Redirección a la página principal si no se encuentra la ruta */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default AppRoutes;