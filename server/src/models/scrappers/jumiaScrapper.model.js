const { scrapper }= require('./scrapper')

const jumiaScrapper = ()=>{
    const url = 'https://www.jumia.co.ke/food-cupboard-supplies/'
    const { scrapData } = scrapper()
    
    function getProductCategoryLinks (){
        let links = [];
        let categoryContainer;
        const titles = document.querySelectorAll('.ttl');

        for (const title of titles) {
            if(title.innerHTML === 'Shop by Category'){
                categoryContainer = title.nextSibling
            }
        }
        const categories = categoryContainer.querySelectorAll('.col')
        for (const category of categories){
            let regex = /beer-wine-spirits/  //exclude beer category
            let regex2 = /mlp-cat-groceries/
            if(!regex.test(category.href) || !regex2.test(category.href)){
                links.push(category.href)
            }    
        }

        return links
    }

    async function productCategories(){
        const links = await scrapData(url,getProductCategoryLinks)
        return links
    }

    function getProducts(){
        let products = []
        const productContainer = document.querySelectorAll('.info')

        for (const product of productContainer) {
            let name = product.querySelector('.name').innerHTML
            let price = product.querySelector('.prc').innerHTML
            products.push({
                name: name,
                price: price
            })
        }

        return products
    }

    async function products(){
        let products = []
        const categories = await productCategories()

        for (const category of categories) {
            const product = await scrapData(category, getProducts)
            products.push(product)
        }

        return products
    }


    return {
            products,
            
    }
}


module.exports = {
    jumiaScrapper

}
