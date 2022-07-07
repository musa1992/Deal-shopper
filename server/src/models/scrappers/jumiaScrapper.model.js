const puppeteer = require('puppeteer');

const JumiaScrapper = ()=>{
    const url = 'https://www.jumia.co.ke/groceries';
    let categoryLinks;

    async function launchScrapper(){
        const browser = await puppeteer.launch({headless:false})
        const page = await browser.newPage();
        
        await page.goto(url,{waitUntil: 'load', timeout: 0})
        

        categoryLinks = await page.evaluate(()=>{
            
            const container = document.querySelectorAll('.ttl')

            let categories;
            let links = []

            for(const item of container){
                if( item.innerHTML === 'Shop by Category'){
                    categories = item.nextSibling.querySelectorAll('.col')
                }
            }

            for (const category of categories){
                links.push(category.href)
            }
            
            // const data = []
            // const items = document.querySelectorAll('.prd')

            // for (const item of items){
            //     data.push({
            //         name: item.querySelector('.name').innerHTML,
            //         price: item.querySelector('.prc').innerHTML
            //     })
            // }
            // return data
            return links
        })  

        await browser.close()
    }
    
    return {launchScrapper}
}

const jumiaScrapper = JumiaScrapper()

module.exports = {
    jumiaScrapper
}