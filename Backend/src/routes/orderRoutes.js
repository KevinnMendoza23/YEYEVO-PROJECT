const express = require('express');
const { createOrder, getOrdersByUser, getOrderById } = require('../controllers/orderController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getOrdersByUser);
router.get('/:id', authMiddleware, getOrderById);

module.exports = router;