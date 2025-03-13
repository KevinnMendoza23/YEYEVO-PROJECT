const pool = require('../config/db.js');

class User {
    static async create({ nombre, email, password, direccion, telefono, rol }) {
        const [result] = await pool.query(
            'INSERT INTO users (nombre, email, password, direccion, telefono, rol, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, NOW())',
            [nombre, email, password, direccion, telefono, rol]
        );
        return result.insertId;
    }

    static async findByEmail(email) {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT id, nombre, email, direccion, telefono, rol, fecha_registro FROM users WHERE id = ?', [id]);
        return rows[0];
    }
}

module.exports = User;