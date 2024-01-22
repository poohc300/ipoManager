import { DbService } from "./dbService";
import { IpoData, WebsiteInfo } from "../models/ipoModel";
import scrapeWebsiteData from '../utils/puppeteerUtil';
import { log } from "console";

export class IpoService {
    private dbService: DbService;

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

    async getAndSaveData(websiteInfo: WebsiteInfo): Promise<IpoData[]> {
        try {
            const ipoData = await this.getIpoData(websiteInfo);

            const result = await this.saveData(ipoData)

            return result;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async saveData(ipoData: IpoData[]): Promise<IpoData[]> {
        try {
            const values = ipoData.map(item => {
                console.log(item);

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

    async getIpoData(websiteInfo: WebsiteInfo): Promise<IpoData[]> {

        try {
            const result = await scrapeWebsiteData(websiteInfo);

            return result;
        } catch (error) {
            console.error(error)
            return [];
        }
    }
}

