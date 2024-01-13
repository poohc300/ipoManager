import { DbService } from "./dbService";

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

    async saveAllData<T>(): Promise<T[]> {
        try {
            const result = await this.dbService.query('INSERT INTO iposchedule VALUES ');
            return result;
        } catch (err) {
            console.error('Error in IpoService: ', err);
            return [];
        }
    }
}