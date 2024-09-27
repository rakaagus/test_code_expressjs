const express = require('express')
const ProductController = require('../controller/productController')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/', ProductController.getAllProduct)
router.get('/:id_product', ProductController.getProductById)

router.post('/', ProductController.createNewProduct)
router.post('/:id_product', ProductController.updateProductById)

router.delete('/:id_product', ProductController.deleteProductById)

module.exports = router