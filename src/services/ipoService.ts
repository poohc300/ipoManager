import { DbService } from "./dbService";
import { IpoData, WebsiteInfo } from "../models/ipoModel";
import scrapeWebsiteData from '../utils/puppeteerUtil';
import moment from "moment";

export class IpoService {
    private dbService: DbService;

    constructor() {
        this.dbService = new DbService();

    }


    async fetchAllData(): Promise<IpoData[]> {
        try {
            const result = await this.dbService.query<IpoData>('SELECT * FROM "ipoManager".iposchedule');
            return result;
        } catch (err) {
            console.error('Error in IpoService: ', err);
            return []; // 에러 처리에 따라 다른 값을 반환할 수 있음
        }
    }

    async getAndSaveData(websiteInfo: WebsiteInfo): Promise<IpoData[]> {

        try {
            // const result = await this.fetchAllData();
            const ipoData = await this.getIpoData(websiteInfo);

            const result = await this.saveData(ipoData)
            console.log(">><><result>>>", result);

            return result;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async saveData(ipoData: IpoData[]): Promise<IpoData[]> {
        try {
            for (const item of ipoData) {
                const keys = Object.keys(item);
                const values = keys.map(key => {
                    const value = item[key as keyof IpoData];

                    if (key === 'ipo_date' || key === 'ipo_date_from' || key === 'ipo_date_to') {
                        return value ? `'${value}'` : '';
                    } else if (key === 'confirmed_public_offering_price' || key === 'public_offering_price' || key === 'competition_rate') {
                        return value ? `'${value}'` : '0'; // 문자열을 숫자로 변환하여 반환
                    } else {
                        return value ? `'${value}'` : '';
                    }
                });
                console.log(">>>>", values);

                const queryText = `INSERT INTO "ipoManager".iposchedule (${keys.join(', ')}) VALUES (${values.join(', ')})`;
                console.log("쿼리 텍스트 ::: ", queryText);

                await this.dbService.query(queryText);
            }
            return ipoData;
        } catch (err) {
            console.error('Error in saveData: ', err);
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

