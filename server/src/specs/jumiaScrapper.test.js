// jest.setTimeout(10000);

describe('Google', ()=>{
    beforeAll( async ()=> {
        await page.setViewport({
            width: 1366,
            height: 768,
            deviceScaleFactor: 1
        });
        await page.goto('https://www.google.com');

    });

    it('should be titled "Google"', async ()=> {
        await expect(page.title()).resolves.toMatch('Google');
    })
})