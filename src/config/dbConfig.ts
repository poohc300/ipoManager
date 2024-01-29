import dotenv from 'dotenv';

dotenv.config(); // .env 파일에서 환경 변수 로드

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

