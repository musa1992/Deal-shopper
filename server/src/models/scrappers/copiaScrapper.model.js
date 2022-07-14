const { scrapper } = require('./scrapper')
const puppeteer = require('puppeteer')
const copiaScrapper = ()=>{

    const { scrapData } = scrapper()

    const categories = [
        'https://www.copia.co.ke/product-category/all/saleable/foodstuff/cooking-oils',
        'https://www.copia.co.ke/product-category/all/saleable/foodstuff/flour',
        'https://www.copia.co.ke/product-category/all/saleable/foodstuff/sugar',
        'https://www.copia.co.ke/product-category/all/saleable/foodstuff/grains',
        'https://www.copia.co.ke/product-category/all/saleable/foodstuff/rice',
        'https://www.copia.co.ke/product-category/all/saleable/foodstuff/pasta',
        'https://www.copia.co.ke/product-category/all/saleable/foodstuff/seasoning', 
        'https://www.copia.co.ke/product-category/all/saleable/foodstuff/spreads',
        'https://www.copia.co.ke/product-category/all/saleable/foodstuff/beverages',
        'https://copia.co.ke/product-category/all/saleable/personal-care/tissues'
    ]
    

    async function autoScroll(page){
        await page.evaluate(async () => {
            await new Promise((resolve, reject) => {
                let totalHeight = 0;
                let distance = 100;
                let timer = setInterval(() => {
                    let scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
    
                    if(totalHeight >= scrollHeight - window.innerHeight){
                        clearInterval(timer);
                        resolve();
                    }
                }, 1100);
            });
        });
    }

    function scrapProductData(){
        const children = []
        const products = document.querySelector('.products').children
        for(const product of products){
            let title = product.querySelector('.woocommerce-LoopProduct-link').innerHTML
            let price = product.getElementsByTagName('bdi').item(0).textContent
            children.push({
                title: title,
                price: price
            })
        }  
        
        return children
    }


    

    async function getProduct(url){

        const browser = await puppeteer.launch({headless:false});

        const page = await browser.newPage();

        await page.goto(url,{ waitUntil: 'networkidle2', timeout: 0})
        await page.setViewport({
            width: 1200,
            height: 800
        });

        await autoScroll(page)
        
        const products = await page.evaluate(scrapProductData)
        

        await browser.close()
        return products
    }

    async function products(){
        const products = []

        for(category of categories){
            const product = await getProduct(category)
            products.push(product)
        }

        return products
    }

    
    return {
        
        products
    }
}


module.exports = {
    copiaScrapper
}