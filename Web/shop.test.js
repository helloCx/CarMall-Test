const setPage = require('../setPage');
const webAddress = require('../config');

describe('/(Login Page)', () => {
    let page, browser;

    beforeAll(async () => {
        page = await setPage()
    })

    it('使用默认账号密码，当我点击登陆时，应该登陆成功', async ()=>{
        // await page.setRequestInterception(true)
        await page.goto(webAddress+'manager/#/login?redirect=%2Fdashboard')
        await page.waitForSelector('.login-container > .el-form > .el-form-item > .el-form-item__content > .el-button')
        await page.click('.login-container > .el-form > .el-form-item > .el-form-item__content > .el-button')
        await page.waitFor(500)
        expect(page.url()).toBe('https://www.buymycar.cn/manager/#/dashboard')
    },6000);

    it('should 进入编辑页面，when 我点击门店编辑时', async () => {
        await page.goto('https://www.buymycar.cn/manager/#/shop/index')
        await page.waitForSelector('.el-table__row > .el-table_2_column_10 > .cell > .el-button:nth-child(1) > span')
        await page.click('.el-table__row > .el-table_2_column_10 > .cell > .el-button:nth-child(1) > span')
        expect(page.url())
    }, 6000);

    test('当我完成好编辑，并点击确认按钮，应该返回编辑成功',async () =>{
        await page.setRequestInterception(true);
        page.on('request', request => {
            if (request.url() === 'http://115.159.154.194/carmall/login/phone') {
                if (request.method() === 'POST') {
                    page.on('response', response => {
                        if (response.url() === 'http://115.159.154.194/carmall/login/phone') {
                            expect(response.status()).toEqual(200)
                        }
                        response.continue()
                    })
                }
            }
            request.continue();
        });
    })

    it('should ', function () {

    });

})


