
const express = require('express')
const cors = require('cors')
// const path = require('path')

const productsRouter = require('./routes/products/products.router')

const app = express()
 
// app.use('/', express.static(path.join(__dirname,'../../client')))
app.use(cors({
    origin: 'http://localhost:5500',
}))
app.use(express.json())
app.use(productsRouter)


module.exports = app