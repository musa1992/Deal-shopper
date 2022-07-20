const products = require('../../models/product.model')


function getAllProducts(req, res){
    return res.status(200).json(products)
}



module.exports = {
    getAllProducts
}