const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Asegura que las variables de entorno sean cargadas

const register = async (req, res) => {
    try {
        const { nombre, email, password, direccion, telefono, rol } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findByEmail(email);
        if (existingUser) return res.status(400).json({ message: 'El email ya está registrado' });

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const userId = await User.create({ nombre, email, password: hashedPassword, direccion, telefono, rol });

        res.status(201).json({ message: 'Usuario registrado con éxito', userId });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);

        if (!user) return res.status(400).json({ message: 'Credenciales incorrectas' });

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Credenciales incorrectas' });

        // Generar token JWT
        const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({ message: 'Inicio de sesión exitoso', token, user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol } });
    } catch (error) {
        res.status(500).json({ message: 'Error en el inicio de sesión', error });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el perfil', error });
    }
};

module.exports = { register, login, getProfile };