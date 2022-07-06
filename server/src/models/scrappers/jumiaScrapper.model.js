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
    const url = 'https://www.jumia.co.ke/groceries';

    
    return {}
}

const jumiaScrapper = JumiaScrapper()

module.exports = {
    jumiaScrapper
}