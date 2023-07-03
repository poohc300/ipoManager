const express = require('express');
const app = express();
const puppeteer = require('puppeteer');

app.get('/', async(req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const baseUrl = 'http://www.38.co.kr/html/fund/index.htm?o=k&page=1';
    await page.goto(baseUrl);

    const content = await page.$eval(
        `body > table:nth-child(9) > tbody > tr > td > table:nth-child(2) > tbody > tr > td:nth-child(1) > table:nth-child(11) > tbody > tr:nth-child(2) > td > table > tbody > tr`,
        (el) => el.textContent
    );
    await page.close();
    await browser.close();
    res.send(content);

});

app.listen(3000, () => {
    console.log("server listening on 3000");
})