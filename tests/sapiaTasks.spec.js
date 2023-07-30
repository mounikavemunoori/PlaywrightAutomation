const { test, expect } = require("@playwright/test");
const { SapiaPage } = require("../pageobjects/sapiaTasks.page")
import * as jsonData from '../testData/chatBotTestData.json';
import { Utils } from '../utils/commonUtils';
import { BrowserUtils } from '../utils/browserUtils';
import { AssertUtils } from '../utils/assertsUtils';

test.describe("Chat Bot test cases", () => {
  let utils = new Utils()
  let browserUtils;
  let assertUtils;

  test.beforeEach(async ({ page }) => {
    browserUtils = new BrowserUtils(page)
    assertUtils = new AssertUtils(page)
    browserUtils.navigateToBrowser()
  });

  test.afterEach(async ({ page }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
    // Take a screenshot and save it as 'based on test case name' in the current working directory
    if (testInfo.status == 'failed') {
      await browserUtils.takeScreenShot(testInfo)
    }
    await browserUtils.browserClose()
  })

  // Happy Path
  test('Verify that the chatbot can successfully interact with users', async ({ page }) => {
    const sapiaPage = new SapiaPage(page)
    let expectedBotResponse;
    const expectedChatBotTitle = jsonData['title']
    await assertUtils.assertChatBotTitle(expectedChatBotTitle)
    await sapiaPage.waitUntilGreetingMessageContentDisplayed()
    await sapiaPage.waitUntilTypingTextDisAppeared()
    // Validating the Greeting message when we lanched the first time a chatbot application
    const dialogContent = await sapiaPage.getDialogTextContent()
    let itemsLength = jsonData['greetingMessage'].length
    for (let i = 0; i < itemsLength; i++) {
      const actualTextContent = await dialogContent[i]
      const expectedContent = jsonData['greetingMessage'][i]
      await assertUtils.assertContain(actualTextContent, expectedContent)
    }
    // Entering the First Name and Last Name in chatbot application for bot response
    await sapiaPage.enterFirstLastNameInInputField(`${jsonData['firstName']} ${jsonData['lastName']}`)
    // Validate the bot response as "enter the First name and Last Name"
    let actualBotResponse = await sapiaPage.getBotResponse()
    expectedBotResponse = "Thanks! And your email?"
    await assertUtils.assertEqual(actualBotResponse, expectedBotResponse)

    // Generating the random email ID to avoid the conflicts
    const randomEmail = await utils.generateRandomEmail()
    // Entering the email address for bot response
    await sapiaPage.enterEmailField(randomEmail)
    // Validating bot response as  "Great, and your phone number?" Message"
    actualBotResponse = await sapiaPage.getBotResponse()
    await assertUtils.assertEqual(actualBotResponse, "Great, and your phone number?")

    // entering the phone number for bot response
    await sapiaPage.enterPhoneNumber(jsonData["phoneNumber"])
    actualBotResponse = await sapiaPage.getBotResponse()
    await assertUtils.assertEqual(actualBotResponse, "Just one more thing, where do you live?")

    // Entering the place name which you do live
    await sapiaPage.enterPlaceToLive(jsonData['placeName'])
    actualBotResponse = await sapiaPage.getBotResponse()
    const expectedPersonalInforeBeforeAcceptBtn = 'Please check your personal information above and click the Accept button if everything is correct. Please note, once you click Accept, you won’t be able to edit your personal information.'
    await assertUtils.assertEqual(actualBotResponse, expectedPersonalInforeBeforeAcceptBtn)
    await sapiaPage.clickOnAcceptButton()

    let randomWordsList = await utils.generateRandomWordsList(50, 51)
    await sapiaPage.enterWordsInFreeTextQuestions(randomWordsList)
    actualBotResponse = await sapiaPage.getBotResponse()
    expectedBotResponse = "Describe a time when you missed a deadline or personal commitment. How did that make you feel?"
    await assertUtils.assertEqual(actualBotResponse, expectedBotResponse)

    randomWordsList = await utils.generateRandomWordsList(50, 51)
    await sapiaPage.enterWordsInFreeTextQuestions(randomWordsList)
    actualBotResponse = await sapiaPage.getBotResponse()
    expectedBotResponse = "We are always hungry to learn and do things differently. Give an example of a time you have had to deal with change, professionally or personally?"
    await assertUtils.assertEqual(actualBotResponse, expectedBotResponse)

    randomWordsList = await utils.generateRandomWordsList(50, 51)
    await sapiaPage.enterWordsInFreeTextQuestions(randomWordsList)
    actualBotResponse = await sapiaPage.getBotResponse()
    expectedBotResponse = `Thanks for sharing that with us, ${jsonData['firstName']}.`
    console.log("Thanks message from bot response", expectedBotResponse)

    randomWordsList = await utils.generateRandomWordsList(50, 51)
    await sapiaPage.enterWordsInFreeTextQuestions(randomWordsList)
    randomWordsList = await utils.generateRandomWordsList(50, 51)
    await sapiaPage.enterWordsInFreeTextQuestions(randomWordsList)

    // Multi-choice option
    expectedBotResponse = 'Do you identify as Aboriginal or Torres Strait Islander?'
    actualBotResponse = await sapiaPage.getBotResponse()
    await assertUtils.assertEqual(actualBotResponse, expectedBotResponse)
    await sapiaPage.selectCommonDropDownOption(jsonData['nationalIdentityOption'])

    expectedBotResponse = 'Is English your second language?'
    actualBotResponse = await sapiaPage.getBotResponse()
    await assertUtils.assertEqual(actualBotResponse, expectedBotResponse)
    await sapiaPage.selectCommonDropDownOption(jsonData['secondLanguageOption'])

    expectedBotResponse = "Please select your age group"
    actualBotResponse = await sapiaPage.getBotResponse()
    await assertUtils.assertEqual(actualBotResponse, expectedBotResponse)
    await sapiaPage.selectCommonDropDownOption(jsonData['ageGroupBetween'])
    await sapiaPage.clickOnSubmitOption()

    // Using the slider for Rate your interview experience:
    await sapiaPage.dragAndDropRatingSliderHandle()
    await sapiaPage.clickOnSubmitRatingButton()
    await sapiaPage.waitUntilTypingTextDisAppeared()
    actualBotResponse = await sapiaPage.getBotResponse()
    console.log("Actual Bot Response", actualBotResponse)
    expectedBotResponse = 'Your feedback matters to us, share a few comments about your application and first interview experience.'
    await assertUtils.assertEqual(actualBotResponse, expectedBotResponse)

    // interviewFeedBack Section
    await sapiaPage.enterWordsInFreeTextQuestions(jsonData['interviewFeedBack'])
    actualBotResponse = await sapiaPage.getFirstBotResponse()
    console.log("Actual Bot Response", actualBotResponse)
    expectedBotResponse = `Thank you for your feedback ${jsonData['firstName']}!`
    await assertUtils.assertEqual(actualBotResponse, expectedBotResponse)
  })

  // Failed Path
  // The chatbot should display a pop-up message to prompt the user to provide a longer response.
  test('Verify that chatbot should display a pop-up message when user typing Less Than 50 Words for Free Text Question', async ({ page }) => {
    const sapiaPage = new SapiaPage(page)
    let expectedBotResponse;
    const expectedChatBotTitle = jsonData['title']
    await assertUtils.assertChatBotTitle(expectedChatBotTitle)
    await sapiaPage.waitUntilGreetingMessageContentDisplayed()
    await sapiaPage.waitUntilTypingTextDisAppeared()
    // Validating the Greeting message when we lanched the first time a chatbot application
    const dialogContent = await sapiaPage.getDialogTextContent()
    let itemsLength = jsonData['greetingMessage'].length
    for (let i = 0; i < itemsLength; i++) {
      const actualTextContent = await dialogContent[i]
      const expectedContent = jsonData['greetingMessage'][i]
      await assertUtils.assertContain(actualTextContent, expectedContent)
    }
    // Entering the First Name and Last Name in chatbot application for bot response
    await sapiaPage.enterFirstLastNameInInputField(`${jsonData['firstName']} ${jsonData['lastName']}`)
    // Validate the bot response as "enter the First name and Last Name"
    let actualBotResponse = await sapiaPage.getBotResponse()
    expectedBotResponse = "Thanks! And your email?"
    await assertUtils.assertEqual(actualBotResponse, expectedBotResponse)

    // Generating the random email ID to avoid the conflicts
    const randomEmail = await utils.generateRandomEmail()
    // Entering the email address for bot response
    await sapiaPage.enterEmailField(randomEmail)
    // Validating bot response as  "Great, and your phone number?" Message"
    actualBotResponse = await sapiaPage.getBotResponse()
    await assertUtils.assertEqual(actualBotResponse, "Great, and your phone number?")

    // entering the phone number for bot response
    await sapiaPage.enterPhoneNumber(jsonData["phoneNumber"])
    actualBotResponse = await sapiaPage.getBotResponse()
    await assertUtils.assertEqual(actualBotResponse, "Just one more thing, where do you live?")

    // Entering the place name which you do live
    await sapiaPage.enterPlaceToLive(jsonData['placeName'])
    actualBotResponse = await sapiaPage.getBotResponse()
    const expectedPersonalInforeBeforeAcceptBtn = 'Please check your personal information above and click the Accept button if everything is correct. Please note, once you click Accept, you won’t be able to edit your personal information.'
    await assertUtils.assertEqual(actualBotResponse, expectedPersonalInforeBeforeAcceptBtn)
    await sapiaPage.clickOnAcceptButton()

    // Entering the lessthan 50 words in free question
    let randomWordsList = await utils.generateRandomWordsList(5, 10)
    await sapiaPage.enterWordsInFreeTextQuestions(randomWordsList)
    await page.waitForTimeout(3000)
    // verify the pop up message if user enters the words less than 50 words in free questions
    const actualModalTite = await sapiaPage.getModalTitleInPopUpWindow()
    await assertUtils.assertContain(actualModalTite, "You’ve entered less than the recommended 50 words")
    // verify the edit button is displayed
    const isEditButtonDisplayed = await sapiaPage.isEditButtonIsDisplayedInPopUp()
    await assertUtils.assertTrue(isEditButtonDisplayed)
    // verify the continue button is displayed
    const isContinueDisplayed = await sapiaPage.isContinueButtonIsDisplayedInPopUp()
    await assertUtils.assertTrue(isContinueDisplayed)
  })

})