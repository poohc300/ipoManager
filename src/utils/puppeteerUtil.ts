import puppeteer from 'puppeteer';

export default function puppeteerUtil(props: { url: string, element: string, index: number, baseUrl: string }) {
    /**
     * 
     * @param props 
     * @returns 
     */
    const { url, element, baseUrl } = props;

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

    const getOne = async (baseUrl: string) => {
        let data = {
            ipoName: '',
            ipoDate: '',
            confirmedPublicOfferingPrice: 0,
            publicOfferingPrice: 0,
            competitionRate: '',
            underWriter: '',

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
                ipoName: await page.evaluate(td => td.textContent.trim(), tdHandles[0]),
                ipoDate: await page.evaluate(td => td.textContent.trim(), tdHandles[1]),
                confirmedPublicOfferingPrice: parseInt(await page.evaluate(td => td.textContent.trim().replace(/,/g, ''), tdHandles[2])),
                publicOfferingPrice: parseInt(await page.evaluate(td => td.textContent.trim().replace(/,/g, ''), tdHandles[3])),
                competitionRate: await page.evaluate(td => td.textContent.trim(), tdHandles[4]),
                underWriter: await page.evaluate(td => td.textContent.trim(), tdHandles[5]),
            };
            result.push(data)
        }
        return result;
    }

}
