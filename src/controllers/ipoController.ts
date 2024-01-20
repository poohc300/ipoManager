import { Express, Request, Response } from 'express';
import { IpoService } from '../services/ipoService';

export class IpoController {
    constructor(private app: Express) {
        this.setupRoutes();
    }

    private setupRoutes() {
        this.app.get('/ipo', this.getAllIpo);
        this.app.get('ipo/:date', this.getUserByDate)
        this.app.post('/ipo', this.createIpo);
        //this.app.put('/ipo/:id', this.updateUser);
        //this.app.delete('/ipo/:id', this.deleteUser);
    }

    private getAllIpo(req: Request, res: Response) {
        // 로직: 모든 사용자를 가져오는 코드
        res.send('200');
    }

    private getUserByDate(req: Request, res: Response) {
        // 로직: 특정 날짜에 따른 ipo 데이터 가져오는 부분

        res.send('200');
    }

    private createIpo(req: Request, res: Response) {
        // 로직: 지금 현재 ipo 첫 페이지 데이터 크롤링해서 저장하는 코드

        res.send('200');
    }

    /*
    app.get('/test', async (req, res) => {
    const baseUrl = 'http://www.38.co.kr/html/fund/index.htm?o=k&page=1';

    const data = getOne(1, baseUrl);
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

    */
}
