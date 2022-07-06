// jest.setTimeout(10000);

const { jumiaScrapper }= require('../../models/scrappers/jumiaScrapper.model')


describe('Test for scrapper model', ()=>{
    it('should return the correct url "https://www.jumia.co.ke"', ()=>{
        expect(jumiaScrapper.getUrl()).toMatch('https://www.jumia.co.ke/groceries')
    })
})