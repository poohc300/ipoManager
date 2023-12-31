import { Client } from 'pg';

export class DbService {
    private client: Client;

    constructor(private dbConfig: Record<string, any>) {
        this.client = new Client(dbConfig)''
    }

    async connect() {
        try {
            await this.client.connect();
        } catch (err) {
            console.error('Error connectiong to PostgreSQL:', err);
            throw err;
        }
    }

    async disconnect() {
        try {
            await this.client.end();
            console.log("Disconnected from PostrgreSQL");
            
        } catch (err) {
            console.error("Error disconnection from PostgreSQL: ", err);
            throw err;
        }
    }

    async query(sql: string) {
        try {
            const result = await this.client.query(sql);
            console.log('Query Result: ', result.rows)
        } catch (err) {
            console.error('Error executing query: ', err);
            throw err;
        }
    }
}