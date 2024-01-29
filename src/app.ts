import dotenv from 'dotenv';
import express, { Express, NextFunction, Request, Response } from 'express';
import { createServer } from "http";
import { IpoController } from './controllers/ipoController';

dotenv.config(); // .env 파일에서 환경 변수 로드

const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;



app.use(function (req: Request, res: Response, next: NextFunction) {
    res.setHeader("Content-Type", "application/json");
    next();
});

app.use(express.json());

// express에는 json 데이터를 파싱하는 모듈이 내장되어있다.
// 하지만 json만 되고 x-www-form-urlencoded를 파싱하기 위해서 아래를 확장해야 한다.
app.use(express.urlencoded({
    extended: true
}))

const server = createServer(app);

// initialize controller
const ipoController = new IpoController(app)


server.listen(3000, () => {
    console.log("server listening on 3000");
})