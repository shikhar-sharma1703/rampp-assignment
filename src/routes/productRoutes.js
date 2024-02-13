const express = require('express');
const productController = require('../controller/Product/routes');

const router = express.Router();

router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProductById);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

module.exports = router;
