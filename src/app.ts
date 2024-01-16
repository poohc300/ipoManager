import express, { Express, NextFunction, Request, Response } from 'express';
import { createServer } from "http";
import puppeteer from 'puppeteer';
import { IpoController } from './controllers/ipoController';
import { log } from 'console';

const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;


// initialize controller
const ipoController = new IpoController()


app.use(function (req: Request, res: Response, next: NextFunction) {
    res.setHeader("Content-Type", "application/json");
    next();
});

app.use(express.json());

// express에는 json 데이터를 파싱하는 모듈이 내장되어있다.
// 하지만 json만 되고 x-www-form-urlencoded를 파싱하기 위해서 아래를 확장해야 한다.
app.use(express.urlencoded({
    extended: true
}))

const server = createServer(app);


const callPage = async (url: string, element: string) => {
    const browser = await puppeteer.launch({
        headless: false
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

const getOne = async (index: number, baseUrl: string) => {
    let tdIndex = index;
    let trIndex = 1;
    let url = 'body > table:nth-child(9) > tbody > tr > td > table:nth-child(2) > tbody > tr > td:nth-child(1) > table:nth-child(11) > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(' + 1 + ')';

    const browser = await puppeteer.launch({
        headless: false
    });
    let data = {
        ipoName: '',
        ipoDate: '',
        confirmedPublicOfferingPrice: 0,
        publicOfferingPrice: 0,
        competitionRate: '',
        underWriter: ''
    };

    const page = await browser.newPage();
    await page.goto(baseUrl);
    // nth-child(index)를 이용해 원하는 줄을 선택할 수 있도록 한다.



    data.ipoName = await page.$eval(url, (data) => data.textContent);

    data.ipoDate = await page.$eval(url, (data) => data.textContent);
    tdIndex = 2;
    data.confirmedPublicOfferingPrice = await page.$eval(url, (data) => data.textContent);
    tdIndex = 3;
    data.publicOfferingPrice = await page.$eval(url, (data) => data.textContent);
    tdIndex = 4;
    data.competitionRate = await page.$eval(url, (data) => data.textContent);
    tdIndex = 5;
    data.underWriter = await page.$eval(url, (data) => data.textContent);
    tdIndex = 6;

    console.log(">>>>>", data);

    return Promise.resolve(data);

}
app.get('/test', async (req, res) => {
    const baseUrl = 'http://www.38.co.kr/html/fund/index.htm?o=k&page=1';

    getOne(1, baseUrl);
});

app.get('/ipoSchedule', async (req, res) => {
    // 공모주 청약 일정
    let data: string[] = [];

    const baseUrl = 'http://www.38.co.kr/html/fund/index.htm?o=k&page=1';
    const latestOne = 'body > table:nth-child(9) > tbody > tr > td > table:nth-child(2) > tbody > tr > td:nth-child(1) > table:nth-child(11) > tbody > tr:nth-child(2) > td > table > tbody > tr';
    const onePage = 'body > table:nth-child(9) > tbody > tr > td > table:nth-child(2) > tbody > tr > td:nth-child(1) > table:nth-child(11) > tbody > tr:nth-child(2) > td > table > tbody';
    //const rows = await callPage(baseUrl, onePage)

    //res.json(data);
    let index = 1;
    let url = 'body > table:nth-child(9) > tbody > tr > td > table:nth-child(2) > tbody > tr > td:nth-child(1) > table:nth-child(11) > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(' + index + ')> td:nth-child(1)';
    const result = await getOne(index, url);

    return res.json(result)
});

app.get('/thinkpool/marketFeatureNote', async (req, res) => {
    const url = 'https://www.thinkpool.com/';
    const element = '#content > div:nth-child(6) > div > div > div.main-items-tab > div:nth-child(2) > div.tab-pane.in.active > div.table_w.mt-20 > table';

    let result = await callPage(url, element);
    result = result.split('\n')
    console.log(result);
    res.json(result);
})

app.get('/data', async (req, res) => {
    console.log("들어왔다");

    const result = await ipoController.fetchAllData(req, res);
    console.log(result);

    res.json(result);
})

app.get('/welcome', (req: Request, res: Response, next: NextFunction) => {
    res.send('welcome!');
});

server.listen(3000, () => {
    console.log("server listening on 3000");
})