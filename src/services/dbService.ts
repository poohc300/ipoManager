import { Pool, QueryResult } from 'pg';
import { dbConfig } from '../config';

export class DbService {
    private pool: Pool;

    constructor() {
        this.pool = new Pool(dbConfig);
    }

    async query<T>(sql: string): Promise<T[]> {
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