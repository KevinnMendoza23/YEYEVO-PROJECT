import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import "../../styles/Register.css";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    direccion: "",
    telefono: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // ✅ Mensaje de éxito

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage(""); // Limpiar mensaje previo

    try {
      await registerUser(formData);
      setSuccessMessage("Registro exitoso. Redirigiendo al inicio de sesión..."); // ✅ Mensaje de éxito

      setTimeout(() => {
        navigate("/login"); // ✅ Redirigir al login después de 2 segundos
      }, 2000);
    } catch (err) {
      setError(err.message || "Error en el registro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Crear cuenta</h2>
        
        {successMessage && <p className="success-message">{successMessage}</p>} {/* ✅ Mensaje de éxito */}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;