const setPage = require('../setPage');
const webAddress = require('../config');



describe('/(Login Page)',()=>{
    let page,browser;
    beforeAll(async () => {
        page = await setPage()
    })

    it('使用默认账号密码，当我点击登陆时，应该登陆成功', async ()=>{
       // await page.setRequestInterception(true)
        await page.goto(webAddress+'manager/#/login?redirect=%2Fdashboard')
        await page.waitForSelector('.login-container > .el-form > .el-form-item > .el-form-item__content > .el-button')
        await page.click('.login-container > .el-form > .el-form-item > .el-form-item__content > .el-button')
        await page.waitFor(500)
        expect(page.url()).toEqual('http://www.embracex.com/manager/#/dashboard')
    },6000);

    it('should ', function () {

    });





})
