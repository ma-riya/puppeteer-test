const puppeteer = require("puppeteer");
const expect = require("chai").expect;

const config = require("../lib/config");
const click = require("../lib/helpers").click;
const typeText = require("../lib/helpers").typeText;
const loadUrl = require("../lib/helpers").loadUrl;
const waitForText = require("../lib/helpers").waitForText;
const pressKey = require("../lib/helpers").pressKey;
const shouldExist = require("../lib/helpers").shouldExist;
const getCount = require("../lib/helpers").getCount;

const utils = require("../lib/utils");
const homepage = require("../page-objects/home-page");
const loginPage = require("../page-objects/login-page");
const searchResultsPage = require("../page-objects/searchResult_page");
const feedbackPage = require("../page-objects/feedback-page");
const feedbackResultsPage = require("../page-objects/feedbackResults-page");

describe("My first puppeteer test", () => {
  let browser;
  let page;

  before(async function() {
    browser = await puppeteer.launch({
      headless: config.isHeadless,
      slowMo: config.slowMo,
      devTools: config.isDevToolss,
    });
    page = await browser.newPage();
    await page.setViewport({
      width: config.viewportWidth,
      height: config.viewportHeight,
    });
  });

  after(async function() {
    await browser.close();
  });

  describe("Login Test", () => {
    it("should navigate to homepage", async () => {
      await loadUrl(page, config.baseUrl);
      await shouldExist(page, homepage.BANKING_FEATURES);
    });

    it("should click on signin button", async () => {
      await click(page, homepage.SIGN_IN_BUTTON);
      await shouldExist(page, loginPage.LOGIN_FORM);
    });

    it("should submit login form", async () => {
      await typeText(page, utils.generateID(20), loginPage.USER_NAME);
      await typeText(page, utils.generateNumbers(), loginPage.USER_PASSWORD);
      await click(page, loginPage.SUBMIT_BUTTON);
    });

    it("should get error message", async () => {
      await waitForText(page, "body", "Login and/or password are wrong");
      await shouldExist(page, loginPage.LOGIN_FORM);
    });
  });

  describe("Login Test", () => {
    it("should navigate to homepage", async () => {
      await loadUrl(page, config.baseUrl);
      await shouldExist(page, homepage.BANKING_FEATURES);
    });

    it("should submit search phrase", async () => {
      await typeText(page, "hello world", homepage.SEARCH_BAR);
      await pressKey(page, "Enter");
    });

    it("should submit search phrase", async () => {
      await typeText(page, "hello world", homepage.SEARCH_BAR);
      await pressKey(page, "Enter");
    });

    it("should display search results", async () => {
      await waitForText(page, searchResultsPage.SEARCH_RESULTS_TITLE, "Search Results");
      await waitForText(page, searchResultsPage.sEARCH_RESULTS_CONTENT, "No results were found for the query");
    });
  });

  describe("Navbar Links test", () => {
    it("should navigate to homepage", async () => {
      await loadUrl(page, config.baseUrl);
      await shouldExist(page, homepage.BANKING_FEATURES);
    });

    it("should have correct number of Links", async () => {
      const numberOfLinks = await getCount(page, "#pages-nav > li");
      expect(numberOfLinks).to.equal(3);
    });
  });

  describe("Feedback Test", () => {
    it("should navigate to homepage", async () => {
      await loadUrl(page, config.baseUrl);
      await shouldExist(page, homepage.BANKING_FEATURES);
    });

    it("should click on feedback", async () => {
      await click(page, homepage.LINK_FEEDBACK);
      await shouldExist(page, feedbackPage.FEEDBACK_FORM);
    });

    it("should submit feedback form", async () => {
      await typeText(page, "Kaniel", feedbackPage.FORM_NAME);
      await typeText(page, utils.generateEmail(), feedbackPage.FORM_EMAIL);
      await typeText(page, "Just subject", feedbackPage.FORM_SUBJECT);
      await typeText(page, utils.generateID(50), feedbackPage.FORM_COMMENT);
      await click(page, feedbackPage.FORM_SUBMIT_BUTTON);
    });

    it("should display success message", async () => {
      await shouldExist(page, feedbackResultsPage.FEEDBACK_RESULTS_TITLE);
      await waitForText(page, "body", feedbackResultsPage.FEEDBACK_RESULTS_CONTENT);
    });
  });

  describe("Forgotten Passowrd", () => {
    it("should navigate to homepage", async () => {
      await loadUrl(page, config.baseUrl);
      await shouldExist(page, homepage.BANKING_FEATURES);
    });

    it("should load forgotten password form", async () => {
      await loadUrl(
        page,
        "http://zero.webappsecurity.com/forgot-password.html"
      );
      await waitForText(page, "h3", "Forgotten Password");
    });

    it("should navigate to homepage", async () => {
      await typeText(page, utils.generateEmail(), "#user_email");
      await click(page, ".btn-primary");
    });

    it("should display success message", async () => {
      await waitForText(
        page,
        "body",
        "Your password will be sent to the following email"
      );
    });
  });
});

//});
