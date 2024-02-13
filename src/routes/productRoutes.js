const express = require('express');
const productController = require('../controller/Product/routes');
const storeIdValidator = require('../validators/products');

const router = express.Router();

router.post('/', storeIdValidator, productController.createProduct);
router.get('/', storeIdValidator, productController.getAllProducts);
router.get('/:productId', productController.getProductById);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

router.get('/searchByFilter', productController.searchProducts);

module.exports = router;
