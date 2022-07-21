const express = require('express')

const { getAllProducts,
        getProduct
} = require('./products.controller')

const productsRouter = express.Router()

productsRouter.get('/products', getAllProducts)
productsRouter.get('/products/:category', getProduct)

module.exports = productsRouter