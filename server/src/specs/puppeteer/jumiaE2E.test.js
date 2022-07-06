describe('Test for browser operations', ()=>{
    beforeAll( async ()=> {
        await page.setViewport({
            width: 1366,
            height: 768,
            deviceScaleFactor: 1
        });

        await page.setDefaultNavigationTimeout(0)
        
        await page.goto('https://www.jumia.co.ke/groceries');
      

    });

    it('page url should be "https://www.jumia.co.ke/groceries" ', async ()=> {
        await expect(page.url()).toMatch('https://www.jumia.co.ke/groceries');
    })

    // it('should get an array of the categories link', async()=>{
    //     const container = await page.waitForSelector('.flyout', {timeout: 0})
    //     const linkArray = await container.$$eval('.itm', nodes=> nodes.map(node=> node.href))
    //     await page.goto(linkArray[0])
    //     await expect(linkArray.constructor.name).toBe('Array')
    //     await expect(page.url()).toMatch(linkArray[0])
    // }) 
    
})
