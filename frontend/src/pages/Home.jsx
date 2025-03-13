import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css"; // Importamos el CSS

const Home = () => {
  const [categories, setCategories] = useState([]);

  // Obtener las categorías desde el backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error cargando categorías:", error));
  }, []);

  return (
    <div className="home-container">
      {/* 🎠 Carrusel de imágenes */}
      <Carousel className="custom-carousel">
        <Carousel.Item>
          <img
            src="https://chospi.com/wp-content/uploads/2023/10/home-slide-anime-1.png"
            alt="Primera imagen"
          />
          <Carousel.Caption>
            <h3>Los mejores productos</h3>
            <p>Encuentra calidad y buenos precios aquí.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://britanico.edu.pe/be-britanico/wp-content/uploads/sites/5/2019/12/prendas-vestir-ingles-1.jpg"
            alt="Segunda imagen"
          />
          <Carousel.Caption>
            <h3>Ofertas exclusivas</h3>
            <p>Compra lo que necesitas, con la confianza de siempre.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://chauchaudeviaje.com/wp-content/uploads/2022/04/tienda-de-ropa-en-italia-portada-02.jpg"
            alt="Tercera imagen"
          />
          <Carousel.Caption>
            <h3>Envíos a todo el país</h3>
            <p>Recibe tus productos en la puerta de tu casa.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* 🔥 Sección de presentación */}
      <div className="container mt-5 text-center">
        <h1 className="welcome-title">BIENVENIDOS A YEYEVO</h1>
        <p>
          En YeYeVo, transformamos tus ideas en prendas personalizadas.
          Explora nuestra colección y crea tu propio estilo.
        </p>
      </div>

      {/* 📌 Sección de Categorías */}
      <div className="container mt-5">
        <h2 className="categories-title">NUESTRAS CATEGORÍAS</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="category-card"
            >
              <img src={category.imagen} alt={category.nombre} />
              <p>{category.nombre}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
