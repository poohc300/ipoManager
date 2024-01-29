import puppeteer from 'puppeteer';
import { WebsiteInfo, IpoData } from '../models/ipoModel';
import moment from 'moment';

export default async function scrapeWebsiteData(websiteInfo: WebsiteInfo): Promise<IpoData[]> {
    /**
     * 
     * @param props 
     * @returns 
     */
    const { element, baseUrl, pageNumber } = websiteInfo;

    // const callPage = async (url: string, element: string) => {
    //     const browser = await puppeteer.launch({
    //         headless: false
    //     });
    //     const page = await browser.newPage();
    //     await page.goto(url);

    //     const content = await page.$eval(
    //         element,
    //         (el) => {
    //             return el.textContent;
    //         }
    //     )

    //     await page.close();
    //     await browser.close();

    //     return content;
    // }

    // id: number; // 시퀀스
    // ipo_name: string; // 공모주 이름
    // ipo_date: Date; // 공모주 기간
    // ipo_date_from: Date; // 공모주 시작날짜
    // ipo_date_to: Date; // 공모주 종료날짜
    // confirmed_public_offering_price: number; // 확정공모가
    // public_offering_price: number; // 희망공모가
    // competition_rate: string; // 청약경쟁률
    // under_writer: string; // 주간사

    let data = {
        ipo_name: '',
        ipo_date: '',
        confirmed_public_offering_price: 0,
        public_offering_price: 0,
        competition_rate: '',
        under_writer: '',

    };
    const result = [];
    const tbodyElement = element;

    const browser = await puppeteer.launch({
        headless: false
    });

    const page = await browser.newPage();
    await page.goto(baseUrl);

    const tbodtHandle = await page.$(tbodyElement);
    const trHandles = await tbodtHandle?.$$('tr');

    for (const trHandle of trHandles || []) {
        const tdHandles = await trHandle.$$('td');
        data = {
            ipo_name: await page.evaluate(td => td.textContent.trim(), tdHandles[0]),
            // ipo_date: moment(await page.evaluate(td => td.textContent.trim(), tdHandles[1])).toDate(),
            ipo_date: await page.evaluate(td => td.textContent.trim(), tdHandles[1]) || '',
            confirmed_public_offering_price: parseInt(await page.evaluate(td => td.textContent.trim().replace(/,/g, ''), tdHandles[2])) || 0,
            public_offering_price: parseInt(await page.evaluate(td => td.textContent.trim().replace(/,/g, ''), tdHandles[3])) || 0,
            competition_rate: await page.evaluate(td => td.textContent.trim(), tdHandles[4]) || '',
            under_writer: await page.evaluate(td => td.textContent.trim(), tdHandles[5]) || '',
        };
        result.push(data)
    }
    return result;


}
