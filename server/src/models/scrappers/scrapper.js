const puppeteer = require('puppeteer');
const EventEmitter = require('events')

const scrapper = ()=>{
    const options = {waitUntil: 'networkidle2', timeout: 0}

    async function scrapData(url, cb){
        let links;
        const browser = await puppeteer.launch({})
        const page = await browser.newPage()

        await page.goto(url,options)

        links = await page.evaluate(cb)

        await browser.close()

        return links
    }

    
    return {
        scrapData
    }
}

module.exports = {
    scrapper
}