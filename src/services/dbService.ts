import { Pool, QueryResult, QueryResultRow } from 'pg';
import { dbConfig } from '../config/dbConfig';
import { IpoData } from '../models/ipoModel';

export class DbService {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            user: dbConfig.user,
            host: dbConfig.host,
            database: dbConfig.database,
            password: dbConfig.password,
            port: dbConfig.port,
        });
    }

    async query<T extends QueryResultRow>(sql: string): Promise<T[]> {
        const client = await this.pool.connect();
        try {
            const result: QueryResult<T> = await client.query<T>(sql);
            console.log('Query Result:', result.rows);
            return result.rows;
        } finally {
            client.release(); // 커넥션을 풀에 반환
        }
    }
}