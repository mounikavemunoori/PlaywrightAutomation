import { BrowserUtils } from "../utils/browserUtils"

export class SapiaPage extends BrowserUtils {
    constructor(page) {
        super(page)
        this.page = page
        this.typingText = '//*[contains(text(), "Typing")]'
        this.dialogBoxContent = '[data-testid="text-bubble"] p'
        this.enterNameInputField = 'div[role="textbox"]'
        this.submitButton = 'span[aria-label="send"]'
        this.emailInputField = '//*[contains(@placeholder,"Enter your response")]'
        this.phoneInputField = 'div input[class="ant-input phone-editor"]'
        this.placeInputField = 'div.DraftEditor-editorContainer div[role="textbox"]'
        this.placeOption = function (location) {
            return `//div[@class='option-item']//*[text()='${location}']`
        }
        this.acceptButton = '//span[contains(text(), "Accept")]',
            this.DropDownOption = function (value) {
                return `//div[@class='option-list']//span[contains(text(), '${value}')]`
            }
        this.submitOption = "//div[@class='option-list']//span[contains(text(), 'SUBMIT')]"
        this.submitRating = 'div.submit-button-box'
        this.sliderHandle = 'div.ant-slider-handle'
        this.sliderBar = 'div.ant-slider-track'
        this.thankYouForFeedBack = '//*[contains(text(),"Thank you for your feedback")]'

        // failed path locators
        this.modalTitle = 'div.ant-modal-title p'
        this.editButton = '//span[contains(text(), "EDIT")]'
        this.continueButton = '//span[contains(text(), "Continue")]'
    }

    async waitUntilTypingTextDisAppeared() {
        await this.waitUntilElementDisAppeared(this.typingText)
    }

    async waitUntilTypingElementIsDisplayed() {
        await this.waitUntilElementDisplayed(this.typingText)
    }

    async enterFirstLastNameInInputField(firstLastName) {
        await this.setInputField(this.enterNameInputField, firstLastName)
        console.log('Entered the first and last name as', firstLastName)
        await this.clickOnSubmitButton()
        await this.waitUntilTypingElementIsDisplayed()
        await this.waitUntilTypingTextDisAppeared()
        await this.page.waitForTimeout(3000)
    }

    async clickOnSubmitButton() {
        await this.clickOnElement(this.submitButton)
    }

    async enterEmailField(email) {
        await this.waitUntilElementDisplayed(this.emailInputField)
        await this.setInputField(this.emailInputField, email)
        console.log('Entered the email id as', email)
        await this.clickOnSubmitButton()
        await this.waitUntilTypingElementIsDisplayed()
        await this.waitUntilTypingTextDisAppeared()
    }

    async enterPhoneNumber(phoneNumber) {
        await this.setInputField(this.phoneInputField, phoneNumber)
        console.log('Entered the phone number as', phoneNumber)
        await this.clickOnSubmitButton()
        await this.waitUntilTypingTextDisAppeared()
        await this.page.waitForTimeout(3000)
    }

    async getDialogTextContent(jsonData) {
        return await this.getAllElementText(this.dialogBoxContent)
    }

    async getBotResponse() {
        return await this.getElementTextContent(await this.page.locator(this.dialogBoxContent).last())
    }

    async waitUntilGreetingMessageContentDisplayed() {
        await this.waitUntilElementDisplayed(this.dialogBoxContent)
    }

    async enterPlaceToLive(location) {
        await this.setInputField(this.placeInputField, location)
        await this.clickOnElement(this.placeOption(location))
        await this.waitUntilTypingElementIsDisplayed()
        await this.waitUntilTypingTextDisAppeared()
        await this.page.waitForTimeout(3000)
    }

    async clickOnAcceptButton() {
        await this.clickOnElement(this.acceptButton)
        await this.waitUntilTypingElementIsDisplayed()
        await this.waitUntilTypingTextDisAppeared()
    }

    async getDialogtextContentAfterAcceptButton() {
        const dialogContent = await this.getAllElementText(this.page.locator("//p[text()='Accept']").locator(".."))
        console.log("valueee of verify content", typeof (dialogContent))
        return dialogContent
    }

    async enterWordsInFreeTextQuestions(randomWordsList) {
        // Check if variable is an array (list)
        if (Array.isArray(randomWordsList)) {
            for (let i = 0; i < randomWordsList.length; i++) {
                await this.waitUntilElementDisplayed(this.placeInputField)
                await this.setInputFieldCharByChar(this.placeInputField, randomWordsList[i] + ' ')
                console.log("Entered the word as ", randomWordsList[i])
            }
        } else {
            await this.setInputField(this.placeInputField, randomWordsList)
            console.log("Entered the word as ", randomWordsList)
        }
        await this.clickOnSubmitButton()
        await this.page.waitForTimeout(3000)
        await this.waitUntilTypingTextDisAppeared()
    }

    async selectCommonDropDownOption(option) {
        await this.clickOnElement(this.DropDownOption(option))
        await this.page.waitForTimeout(5000)
    }

    async clickOnSubmitOption() {
        await this.clickOnElement(this.submitOption)
        await this.page.waitForTimeout(30000)
    }

    async clickOnSubmitRatingButton() {
        await this.clickOnElement(this.submitRating)
        await this.waitUntilTypingElementIsDisplayed()
    }

    async dragAndDropRatingSliderHandle() {
        // the value corresponding to the 100% of the slider
        const maxValue = 10;
        // drag-and-drop target value in percentage
        const targetValue = 0.8; // 80%

        // retrieving the slider handle HTML element
        const sliderHandle = this.page.locator(this.sliderHandle).first();
        // retrieving the slider HTML element
        const slider = this.page.locator(this.sliderBar).first();

        // getting the slider bounding box size
        const sliderBoundingBox = await slider.boundingBox();

        // performing the drag-and-drop interaction
        await sliderHandle.dragTo(sliderHandle, {
            force: true,
            targetPosition: {
                // moving the slider to the target value in %
                x: sliderBoundingBox.width * targetValue,
                y: 0,
            },
        });
    }

    async getFirstBotResponse() {
        const lastElementText = await this.getElementTextContent(await this.page.locator(this.thankYouForFeedBack).first())
        return lastElementText
    }

    async getModalTitleInPopUpWindow() {
        const modalTitle = await this.getElementContent(this.modalTitle)
        return modalTitle
    }

    async isEditButtonIsDisplayedInPopUp() {
        return this.isElementVisible(this.editButton)
    }

    async isContinueButtonIsDisplayedInPopUp() {
        return this.isElementVisible(this.continueButton)
    }
}