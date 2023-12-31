import { DbService } from "./dbService";
import {env} from '../config/env'

const dbConfig = {
    user : env.database.user,
    host : env.database.host,
    database : env.database.database,
    password : env.database.password,
    port : env.database.port
  };
  
  

export class IpoService {
    private dbService: DbService;

    constructor() {
        this.dbService = new DbService(dbConfig);
    }

    async showAllIpoData() {
        try {
            await this.dbService.connect();

            
        } catch (err) {
            console.error('Error in IpoService: ', err)
        }
    }
}