import { DbService } from "./dbService";

export class IpoService {
    private dbService: DbService;

    constructor() {
        this.dbService = new DbService();
    }

    async fetchAllData<T>() {
        try {
            const result = await this.dbService.query<T>('SELECT * FROM ipo_schedule');
            return result;
        } catch (err) {
            console.error('Error in IpoService: ', err)
        }
    }
}