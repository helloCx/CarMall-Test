const puppeteer = require('puppeteer')

async function setPage() {
    let page,browser;
    browser = await puppeteer.launch({
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: false,
        slowMo:40
    })
    page = await browser.newPage()
    return page;
}


module.exports = setPage;

