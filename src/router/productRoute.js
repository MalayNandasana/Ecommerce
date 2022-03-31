const express = require('express');
const auth = require('../middleware/auth')

const productController = require('../controller/productController')

const router = new express.Router()

router.post('/product/add',auth, productController.addProduct);
router.get('/product/get',auth, productController.getProduct);
router.post('/product/delete',auth, productController.deleteProduct);

module.exports = router