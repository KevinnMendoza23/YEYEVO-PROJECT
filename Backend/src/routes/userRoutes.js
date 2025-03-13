const express = require('express');
const { register, login, getProfile } = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);

module.exports = router;