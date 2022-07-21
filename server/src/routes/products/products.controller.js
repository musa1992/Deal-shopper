const { products, getCategoryProducts} = require('../../models/product.model')


function getAllProducts(req, res){
    return res.status(200).json(products)
}

function getProduct(req,res){
    const category = req.params.category

    const categorizedProducts = getCategoryProducts(category)

    return res.status(200).json(categorizedProducts)
    
}



module.exports = {
    getAllProducts,
    getProduct
}