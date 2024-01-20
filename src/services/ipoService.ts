import { DbService } from "./dbService";
import { IpoData } from "../models/ipoModel";
import puppeteerUtil from '../utils/puppeteerUtil';

export class IpoService {
    private dbService: DbService;
    private baseUrl = 'http://www.38.co.kr/html/fund/index.htm?o=k&page=1';
    private element = 'body > table:nth-child(9) > tbody > tr > td > table:nth-child(2) > tbody > tr > td:nth-child(1) > table:nth-child(11) > tbody > tr:nth-child(2) > td > table > tbody';

    constructor() {
        this.dbService = new DbService();
    }

    async fetchAllData<T>(): Promise<T[]> {
        try {
            const result = await this.dbService.query('SELECT * FROM iposchedule');
            return result;
        } catch (err) {
            console.error('Error in IpoService: ', err);
            return []; // 또는 에러를 처리하는 방법에 따라 다른 값을 반환할 수 있음
        }
    }

    async saveData(data: IpoData[]): Promise<IpoData[]> {
        try {

            const values = data.map(item => {
                return `(${item.id}, '${item.ipo_name}', '${item.ipo_date}', '${item.ipo_date_from}', '${item.ipo_date_to}', ${item.confirmed_public_offering_price}, ${item.public_offering_price}, '${item.competition_rate}', '${item.under_writer}')`;
            }).join(',');

            // 여기에서 data를 이용하여 INSERT INTO 쿼리를 생성하고 실행
            const query = `INSERT INTO iposchedule VALUES ${values}`;

            const result = await this.dbService.query(query);
            return result;
        } catch (err) {
            console.error('Error in IpoService: ', err);
            return [];
        }
    }

    async getIpoData() {

        try {
            const result = await puppeteerUtil.getOne(this.baseUrl);
        } catch (error) {
            console.error(error)
        }
    }
}

