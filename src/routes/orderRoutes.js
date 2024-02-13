const express = require('express');
const orderController = require('../controller/Order/routes');

const router = express.Router();

router.post('/', orderController.createOrder);
router.put('/:orderId', orderController.updateOrder);
router.delete('/:orderId', orderController.deleteOrder);
router.get('/', orderController.getAllOrders);
router.get('/:orderId', orderController.getOrderById);
router.put('/:orderId/cancel', orderController.cancelOrder);

module.exports = router;
