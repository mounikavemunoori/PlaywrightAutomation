import { Utils } from "./commonUtils";

export class BrowserUtils extends Utils {
    constructor(page) {
        super()
        this.page = page
    }

    async clickOnElement(element, timeOut) {
        timeOut = timeOut != undefined ? timeOut : 0
        await this.page.waitForTimeout(timeOut)
        await this.page.click(element)
    }

    async setInputField(element, value, timeOut) {
        timeOut = timeOut != undefined ? timeOut : 0
        await this.page.waitForTimeout(timeOut)
        await this.page.fill(element, value);
    }

    // Type the text character by character
    async setInputFieldCharByChar(element, textToType) {
        await this.page.locator(element).type(textToType)
    }

    async waitUntilElementDisAppeared(element, timeOut) {
        timeOut = timeOut != undefined ? timeOut : 0
        await this.page.waitForTimeout(timeOut)
        await this.page.waitForSelector(element, { state: 'hidden' });
    }

    // Get the text content of the last element
    async getElementTextContent(element, timeOut) {
        timeOut = timeOut != undefined ? timeOut : 0
        await this.page.waitForTimeout(timeOut)
        return await element.innerText();
    }

    async getAllElementText(selector, timeOut) {
        timeOut = timeOut != undefined ? timeOut : 0
        await this.page.waitForTimeout(timeOut)
        const elementTexts = await this.page.$$eval(selector, (elements) => {
            return elements.map((element) => element.innerText);
        });
        return elementTexts;
    }

    // Wait until the page's DOM content is loaded
    async waitUntilDOMLoaded() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async waitUntilElementDisplayed(element, timeOut) {
        timeOut = timeOut != undefined ? timeOut : 0
        await this.page.waitForTimeout(timeOut)
        await this.page.waitForSelector(element);
    }

    async scrollIntoViewElement(element) {
        await element.scrollIntoViewIfNeeded();
    }

    async navigateToBrowser() {
        await this.page.context().clearCookies()
        await this.page.goto('', { viewport: null });
        await this.waitUntilDOMLoaded()

    }

    async browserClose() {
        await this.page.close()
    }

    async takeScreenShot(testInfo) {
        const reprotsPath = await this.createReportDirectory()
        await this.page.screenshot({ path: `${reprotsPath}/${testInfo.title}.png` });
        console.log("Taken screenshot for failed test cases")
    }

    //  Check if the element is visible
    async isElementVisible(element) {
        return await this.page.isVisible(element)
    }

    async getElementContent(element) {
        return await this.page.locator(element).textContent()
    }

}