import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { AuthContext } from "../contexts/AuthContext"; // Contexto para manejar la autenticación
import "../styles/Login.css";

const Login = () => {
  const { login } = useContext(AuthContext); // Accedemos a la función login del contexto
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos

    try {
      const data = await loginUser(email, password); // Llamamos al servicio de login
      login(data.token, data.user); // Guardamos el token y datos del usuario en el contexto
      navigate("/"); // Redirige a la página principal
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Ingresar
          </button>
        </form>
        <p className="register-link">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;