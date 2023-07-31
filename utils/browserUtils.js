import { Utils } from "./commonUtils";

export class BrowserUtils extends Utils {
    constructor(page) {
        super()
        this.page = page
    }
    /**
    * @Desc Clicks on element
    * @param {*} element - String
    * @param {*} timeout - Waits for some time to before do the browser action
    */
    async clickOnElement(element, timeOut) {
        timeOut = timeOut != undefined ? timeOut : 0
        await this.page.waitForTimeout(timeOut)
        await this.page.click(element)
    }

    /**
     * @Desc Inputs the value to the elements
     * @param element - String
     * @param value - value 
     * @param timeout - Waits for some time to before do the browser action
     * @return None
     */
    async setInputField(element, value, timeOut) {
        timeOut = timeOut != undefined ? timeOut : 0
        await this.page.waitForTimeout(timeOut)
        await this.page.fill(element, value);
    }

    /**
     * @Desc Types the text character by character
     * @param element - String
     * @param textToType - value 
     * @return None
     */
    async setInputFieldCharByChar(element, textToType) {
        await this.page.locator(element).type(textToType)
    }

    /**
    * @Desc waits until element is disappeared
    * @param element - String
    * @param timeout - Waits for some time to before do the browser action 
    * @return None
    */
    async waitUntilElementDisAppeared(element, timeOut) {
        timeOut = timeOut != undefined ? timeOut : 0
        await this.page.waitForTimeout(timeOut)
        await this.page.waitForSelector(element, { state: 'hidden' });
    }

    /**
     * @Desc Gets the element inner text
     * @param element
     * @returns {string}
     */
    async getElementTextContent(element, timeOut) {
        timeOut = timeOut != undefined ? timeOut : 0
        await this.page.waitForTimeout(timeOut)
        return await element.innerText();
    }

    /**
     * @Desc Gets the text of the elements
     * @param selector
     * @returns {*}
     */
    async getAllElementText(selector, timeOut) {
        timeOut = timeOut != undefined ? timeOut : 0
        await this.page.waitForTimeout(timeOut)
        const elementTexts = await this.page.$$eval(selector, (elements) => {
            return elements.map((element) => element.innerText);
        });
        return elementTexts;
    }

    /**
     * @Desc Wait until the page's DOM content is loaded
     * @returns None
     */
    async waitUntilDOMLoaded() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * @Desc waits until element is displayed
     * @param element - String
     * @param timeout - Waits for some time to before do the browser action 
     * @return None
     */
    async waitUntilElementDisplayed(element, timeOut) {
        timeOut = timeOut != undefined ? timeOut : 0
        await this.page.waitForTimeout(timeOut)
        await this.page.waitForSelector(element);
    }

    /**
     * @Desc scrolls  into the element
     * @param element
     * @return None
     */
    async scrollIntoViewElement(element) {
        await element.scrollIntoViewIfNeeded();
    }

    /**
     * @Desc Navigato to the main application URL
     * @param None
     * @returns None
     */
    async navigateToBrowser() {
        await this.page.context().clearCookies()
        await this.page.goto('', { viewport: null });
        await this.waitUntilDOMLoaded()
    }

    /**
     * @Desc Closing the opened browser
     * @param None
     * @returns None
     */
    async browserClose() {
        await this.page.close()
    }

    /**
     * @Desc Taken screenshot for failed test cases based on test case name
     * @param element
     * @returns None
     */
    async takeScreenShot(testInfo) {
        const reprotsPath = await this.createReportDirectory()
        await this.page.screenshot({ path: `${reprotsPath}/${testInfo.title}.png` });
        console.log("Taken screenshot for failed test cases")
    }

    /**
     * @Desc Check if the element is visible
     * @param element
     * @returns {boolean}
     */
    async isElementVisible(element) {
        return await this.page.isVisible(element)
    }

    /**
    * @Desc Gets the element text content
    * @param element
    * @returns {string}
    */
    async getElementContent(element) {
        return await this.page.locator(element).textContent()
    }

}