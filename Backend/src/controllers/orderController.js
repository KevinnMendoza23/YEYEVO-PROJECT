const pool = require('../config/db.js'); // Conexión a MySQL

// Crear una nueva orden
const createOrder = async (req, res) => {
    try {
        const { usuario_id, total, estado } = req.body;

        if (!usuario_id || !total || !estado) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const [result] = await pool.query(
            "INSERT INTO orders (usuario_id, total, estado, fecha) VALUES (?, ?, ?, NOW())",
            [usuario_id, total, estado]
        );

        res.status(201).json({ message: "Orden creada exitosamente", orderId: result.insertId });
    } catch (error) {
        console.error("Error al crear la orden:", error);
        res.status(500).json({ message: "Error al crear la orden" });
    }
};

// Obtener todas las órdenes de un usuario
const getOrdersByUser = async (req, res) => {
    try {
        const { usuario_id } = req.user; // Viene del middleware de autenticación

        const [orders] = await pool.query("SELECT * FROM orders WHERE usuario_id = ?", [usuario_id]);

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error al obtener órdenes:", error);
        res.status(500).json({ message: "Error al obtener órdenes" });
    }
};

// Obtener una orden por ID
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const [order] = await pool.query("SELECT * FROM orders WHERE id = ?", [id]);

        if (order.length === 0) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        res.status(200).json(order[0]);
    } catch (error) {
        console.error("Error al obtener la orden:", error);
        res.status(500).json({ message: "Error al obtener la orden" });
    }
};

module.exports = { createOrder, getOrdersByUser, getOrderById };