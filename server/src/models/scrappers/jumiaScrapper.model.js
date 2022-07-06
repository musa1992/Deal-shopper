const puppeteer = require('puppeteer');



// async function loadPage(page, url){
//     await page.goto(url,{waitUntil: 'load', timeout: 0})   
// }

// async function getElements(page){
   
//     const element = await page.waitForSelector('.flyout', {timeout: 0})  

//     const categoriesLinkArray = await element.$$eval('.itm', nodes => nodes.map(node => node.href))
    
//     console.log(categoriesLinkArray)
    
//     return categoriesLinkArray

// }

// async function run (){
//     const url = 'https://www.jumia.co.ke'
//     const browser = await puppeteer.launch({headless: false})
//     const page = await browser.newPage();
//     await loadPage(page,url)

//     const categoryLinks = await getElements(page)

//     await page.goto(categoryLinks[0])

//     await browser.close()
// }

const JumiaScrapper = ()=>{
    const primaryUrl = 'https://www.jumia.co.ke/';
    let searchItems;
    let rawData;

    function isCorrectArgument(input){
       
        return input.every(element => element.category && element.name && element.quantity ) 

    }

    function setSearchItems(shoppingItems){
        if(isCorrectArgument(shoppingItems)){
            searchItems = shoppingItems
        }else{
            //create error object
            throw 'Item in the list is not categorized'
        }
    }

    function getSearchItems(){
        return searchItems
    }


    async function launchScrapper(){
        const browser = await puppeteer.launch({headless:false})
        const page = await browser.newPage();
        
        await page.goto('https://www.jumia.co.ke/sugar-flour',{waitUntil: 'load', timeout: 0})

        rawData = await page.evaluate(()=>{
            const data = []
            const items = document.querySelectorAll('.prd')

            for (const item of items){
                data.push({
                    name: item.querySelector('.name').innerHTML,
                    price: item.querySelector('.prc').innerHTML
                })
            }
            return data
        })  


        await browser.close()
    }
    
    return {setSearchItems, launchScrapper}
}

const jumiaScrapper = JumiaScrapper()

module.exports = {
    jumiaScrapper
}