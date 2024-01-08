import { Request, Response } from 'express';
import { IpoService } from '../services/ipoService';

export class IpoController {
    private IpoService: IpoService;

    constructor() {
        this.IpoService = new IpoService();
    }

    async fetchAllData<T>(req: Request, res: Response) {
        try {
            const data = await this.IpoService.fetchAllData<T>();
            res.status(200).json({ data })

        } catch (error) {
            console.error(error);
        }
    }
}