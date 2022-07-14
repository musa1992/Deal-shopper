const { jumiaScrapper } = require('./models/scrappers/jumiaScrapper.model')
const { copiaScrapper } = require('./models/scrappers/copiaScrapper.model')



const scrapper = copiaScrapper()

scrapper.products().then((value)=>{
    console.log(value)
})



















