import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider"; // ✅ Correcto
import AppRoutes from "./routes"; // ✅ Corrección

import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Importación de estilos globales
import "./styles/globals.css"; // Asegura que este archivo existe

const Main = () => (
  <BrowserRouter> 
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>
);

export default Main;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);