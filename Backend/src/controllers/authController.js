const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const dotenv = require('dotenv');

dotenv.config();

// Registrar usuario
const register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Encriptar contraseña antes de guardar
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)', 
            [nombre, email, hashedPassword]
        );

        res.status(201).json({ message: 'Registro exitoso', userId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el registro', error });
    }
};

// Inicio de sesión con generación de token
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const user = users[0];

        // Comparar contraseña con la almacenada en la BD
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '2h' }
        );

        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el inicio de sesión', error });
    }
};

module.exports = { register, login };