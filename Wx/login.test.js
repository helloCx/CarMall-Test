const setPage = require('../setPage');
const webAddress = require('../config');

describe('/(Login Page)',()=>{
    let page,browser,homeUrl,loginUrl,phone,CAPTCHA;
    phone = 18267921108
    CAPTCHA = 6654
    beforeAll(async () => {
        page = await setPage()
        homeUrl = webAddress + 'wx/#/home'
        loginUrl = webAddress + 'wx/#/login'
    })

    it('should出现我选择的市，当我换省市的时候', async () => {
        await page.goto(homeUrl);
        await page.waitForSelector('.home-search-box > .box > .selectShop > div > span')
        await page.click('.home-search-box > .box > .selectShop > div > span')
        await page.waitForSelector('.confirms-container > .van-picker__columns > .van-picker-column > ul > .van-ellipsis:nth-child(2)')
        await page.click('.confirms-container > .van-picker__columns > .van-picker-column > ul > .van-ellipsis:nth-child(2)')
        await page.waitForSelector('.search-big > .confirms > .confirms-container > .van-hairline--top-bottom > .van-picker__confirm')
        await page.click('.search-big > .confirms > .confirms-container > .van-hairline--top-bottom > .van-picker__confirm')
        await page.waitForSelector('.selectShop > div > span')
        const shop = await page.$eval('.selectShop > div > span', el => el.innerHTML);
        expect(shop).toEqual("天津市")
    }, 10000);

    it('should 跳转到首页页面，当我点击首页导航时', async () => {
        await page.waitForSelector('.home > .search-big > .home-search-box > .box > .iconfont')
        await page.click('.home > .search-big > .home-search-box > .box > .iconfont')
        await page.waitForSelector('.home-box > .home > .search-big > .information-box > .info-item:nth-child(1)')
        await page.click('.home-box > .home > .search-big > .information-box > .info-item:nth-child(1)')
        await page.waitFor(2000)
        expect(page.url()).toEqual(homeUrl)
    }, 10000);

    it('should 跳转登陆页面，当我点击登陆导航时', async () => {
        await page.waitForSelector('.home > .search-big > .home-search-box > .box > .iconfont')
        await page.click('.home > .search-big > .home-search-box > .box > .iconfont')
        await page.screenshot({
            path: 'login1.png',
        })
        await page.waitForSelector('.home-box > .home > .search-big > .information-box > .info-item:nth-child(2)')
        await page.click('.home-box > .home > .search-big > .information-box > .info-item:nth-child(2)')
        await page.waitFor(2000)
        expect(page.url()).toEqual(loginUrl)
    }, 10000);


    it('should 登陆成功，当输入验证码，点击登陆时', (async () => {
        try {
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
            await page.goto(loginUrl);
            await page.screenshot({path: 'news.png', fullPage: true});
            await page.waitForSelector('.form-container > .form-item:nth-child(2) >input')
            await page.click('.login-box > .form > .form-container > .form-item:nth-child(1) > input', {clickCount: 3});
            await page.keyboard.down('Backspace')
            await page.type('.form-container > .form-item > input', '18267921108');
            await page.waitForSelector('.login-box > .form > .form-container > .form-item:nth-child(2) > input')
            await page.click('.login-box > .form > .form-container > .form-item:nth-child(2) > input', {clickCount: 3});
            await page.keyboard.down('Backspace')
            await page.type('.login-box > .form > .form-container > .form-item:nth-child(2) > input', '2222', 100)
            await page.waitForSelector('.login-btn')
            await page.click('.login-btn')
            await page.waitFor(1000)
        } catch (e) {
            console.log(e);
        }
    }),6000)

    afterAll(async () => {
        await page.close()
        await browser.close()
    })

})
