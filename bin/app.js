"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const puppeteer_1 = __importDefault(require("puppeteer"));
const ipoController_1 = require("./controllers/ipoController");
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 3000;
// initialize controller
const ipoController = new ipoController_1.IpoController();
app.use(function (req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
});
app.use(express_1.default.json());
// express에는 json 데이터를 파싱하는 모듈이 내장되어있다.
// 하지만 json만 되고 x-www-form-urlencoded를 파싱하기 위해서 아래를 확장해야 한다.
app.use(express_1.default.urlencoded({
    extended: true
}));
const server = (0, http_1.createServer)(app);
const callPage = (url, element) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({
        headless: false
    });
    const page = yield browser.newPage();
    yield page.goto(url);
    const content = yield page.$eval(element, (el) => {
        return el.textContent;
    });
    yield page.close();
    yield browser.close();
    return content;
});
app.get('/ipoSchedule', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 공모주 청약 일정
    const baseUrl = 'http://www.38.co.kr/html/fund/index.htm?o=k&page=1';
    const element = 'body > table:nth-child(9) > tbody > tr > td > table:nth-child(2) > tbody > tr > td:nth-child(1) > table:nth-child(11) > tbody > tr:nth-child(2) > td > table > tbody > tr';
    const element2 = 'body > table:nth-child(9) > tbody > tr > td > table:nth-child(2) > tbody > tr > td:nth-child(1) > table:nth-child(11) > tbody > tr:nth-child(2) > td > table > tbody';
    let result = yield callPage(baseUrl, element2);
    console.log(result);
    res.json(result);
}));
app.get('/thinkpool/marketFeatureNote', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'https://www.thinkpool.com/';
    const element = '#content > div:nth-child(6) > div > div > div.main-items-tab > div:nth-child(2) > div.tab-pane.in.active > div.table_w.mt-20 > table';
    let result = yield callPage(url, element);
    console.log(result);
    res.json(result);
}));
app.get('/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("들어왔다");
    const result = yield ipoController.fetchAllData(req, res);
    console.log(result);
    res.json(result);
}));
app.get('/welcome', (req, res, next) => {
    res.send('welcome!');
});
server.listen(3000, () => {
    console.log("server listening on 3000");
});
