import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import UserProfile from "./pages/UserProfile";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/common/Navbar"; // ✅ Importar Navbar
import Footer from "./components/common/Footer"; // ✅ Importar Footer
import "./styles/globals.css"; // ✅ Importar estilos globales

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Agregamos la barra de navegación para que esté en todas las páginas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer /> {/* ✅ Agregamos el footer en todas las páginas */}
    </Router>
  );
}

export default App;