import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">YeYeVo</Link>

        <button className="navbar-toggle" onClick={toggleMenu}>
          <span className="toggle-icon">&#9776;</span>
        </button>

        <nav className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <Link to="/" onClick={toggleMenu}>
            <img src="https://images.vexels.com/media/users/3/140528/isolated/preview/669972133494bf3994d706dedf165f90-icono-de-ronda-de-inicio-1.png"
                 alt="Inicio" className="nav-icon" />
            Inicio
          </Link>
          <Link to="/products" onClick={toggleMenu}>
            <img src="https://cdn-icons-png.flaticon.com/512/759/759536.png"
                 alt="Productos" className="nav-icon" />
            Productos
          </Link>
          <Link to="/login" onClick={toggleMenu}>
            <img src="https://cdn-icons-png.flaticon.com/512/1000/1000946.png"
                 alt="Iniciar Sesión" className="nav-icon" />
            Iniciar Sesión
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;