import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

interface DbConfig {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
}

export const dbConfig: DbConfig = {
    user: process.env.DB_USER || '',
    host: process.env.DB_HOST || '',
    database: process.env.DB_DATABASE || '',
    password: process.env.DB_PASSWORD || '',
    port: parseInt(process.env.DB_PORT || '5432', 10),
};
