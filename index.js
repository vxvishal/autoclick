import puppeteer from 'puppeteer';
import axios from 'axios';
import fs from 'fs';

const url = "https://www.ijircce.com/get-current-issue.php?key=MTU0";
const path = "file.pdf";
const buttonSelector = 'a i[data-id="15338"]';

const downloadFile = async () => {
    const response = await axios.get(url, { responseType: 'stream' });
    response.data.pipe(fs.createWriteStream(path));
    console.log("Downloaded");
}

const clickButton = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Click the button and wait for navigation
    await Promise.all([
        page.waitForNavigation(),
        page.click(buttonSelector),
    ]);

    await browser.close();

    // Call downloadFile function
    await downloadFile();

    // Click the button every 5 seconds
    setTimeout(clickButton, 5000);
}

clickButton().catch(console.error);

clickButton().catch(console.error);