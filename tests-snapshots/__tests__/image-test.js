const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });

describe("My first snapshot test", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("homepage snapshot", async () => {
    await page.goto("https://google.com");
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });
});
