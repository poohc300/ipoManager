import { Express, Request, Response } from 'express';
import { IpoService } from '../services/ipoService';
import { WebsiteInfo } from '../models/ipoModel';

export class IpoController {
    private ipoService: IpoService;
    private websiteInfo: WebsiteInfo;

    constructor(private app: Express) {
        this.ipoService = new IpoService();
        this.websiteInfo = {
            baseUrl: 'http://www.38.co.kr/html/fund/index.htm?o=k&page=',
            element: 'body > table:nth-child(9) > tbody > tr > td > table:nth-child(2) > tbody > tr > td:nth-child(1) > table:nth-child(11) > tbody > tr:nth-child(2) > td > table > tbody',
            pageNumber: 1
        }
        this.setupRoutes();

    }


    private setupRoutes() {
        this.app.get('/ipo', this.getAllIpo);
        this.app.get('ipo/:date', this.getUserByDate)
        this.app.post('/ipo', this.createIpo);


        //this.app.put('/ipo/:id', this.updateUser);
        //this.app.delete('/ipo/:id', this.deleteUser);
    }

    private getAllIpo = async (req: Request, res: Response) => {
        // 로직: 특정 날짜에 따른 ipo 데이터 가져오는 부분
        try {
            const result = await this.ipoService.fetchAllData();
            res.json({ success: true, data: result, message: '200' })
        } catch (error) {
            console.error('Error creating IPO:', error);
            res.status(500).json({ success: false, message: 'Error creating IPO.' });
        }
    }

    private getUserByDate = async (req: Request, res: Response) => {

    }

    private createIpo = async (req: Request, res: Response) => {
        try {
            // 1부터 5까지의 페이지에서 데이터를 크롤링하고 저장합니다.
            for (let i = 1; i <= 5; i++) {
                this.websiteInfo.pageNumber = i;
                const result = await this.ipoService.getAndSaveData(this.websiteInfo);
                console.log(`Data saved for page ${i}`);
            }
            res.json({ success: true, message: 'Data saved successfully.' });
        } catch (error) {
            console.error('Error creating IPO:', error);
            res.status(500).json({ success: false, message: 'Error creating IPO.' });
        }
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
