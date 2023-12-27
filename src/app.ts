import express, { Express, NextFunction, Request, Response } from 'express';
import {createServer} from "http";
import puppeteer from 'puppeteer';


const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;
const server = createServer(app);

app.use(function(req: Request, res: Response, next: NextFunction) {
    res.setHeader("Content-Type", "application/json");
    next();
});

app.use(express.json());
 
// express에는 json 데이터를 파싱하는 모듈이 내장되어있다.
// 하지만 json만 되고 x-www-form-urlencoded를 파싱하기 위해서 아래를 확장해야 한다.
app.use(express.urlencoded({
  extended: true
}))
 
const callPage = async (url: string, element: string) => {
    const browser = await puppeteer.launch({
        headless : false
      });
    const page = await browser.newPage();
    await page.goto(url);

    const content = await page.$eval(
        element,
        (el) => {
            return el.textContent;
        }
    )

    await page.close();
    await browser.close();

    return content;
}

app.get('/ipoSchedule', async(req, res) => {
    // 공모주 청약 일정
   
    const baseUrl = 'http://www.38.co.kr/html/fund/index.htm?o=k&page=1';
    const element = 'body > table:nth-child(9) > tbody > tr > td > table:nth-child(2) > tbody > tr > td:nth-child(1) > table:nth-child(11) > tbody > tr:nth-child(2) > td > table > tbody > tr';
    const element2 = 'body > table:nth-child(9) > tbody > tr > td > table:nth-child(2) > tbody > tr > td:nth-child(1) > table:nth-child(11) > tbody > tr:nth-child(2) > td > table > tbody';

    let result = await callPage(baseUrl, element2)
    console.log(result);
    res.json(result);

});

app.get('/thinkpool/marketFeatureNote', async(req, res) => {
    const url = 'https://www.thinkpool.com/';
    const element = '#content > div:nth-child(6) > div > div > div.main-items-tab > div:nth-child(2) > div.tab-pane.in.active > div.table_w.mt-20 > table';

    let result = await callPage(url, element);
    console.log(result);
    res.json(result);
})

server.listen(3000, () => {
    console.log("server listening on 3000");
})