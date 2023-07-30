# PlaywrightAutomation

### In this code challenge , I am using playwright with javascript
## step1:- Create a directory , use below command
 ```
 mkdir playwrightAutomation
 ```
 ## Step2 : Change to created directory, use below command

 ```
 cd playwrightAutomation
 ```
 ## Step3: Install the nodejs in system
 
 ## step4: Install the playwright use below command
 ```
  npm init playwright
 ```

 ##### Below commands will help to run different ways in playwright
 ##  Runs the end-to-end tests. 
 ```npx playwright test
 ```
##  Starts the interactive UI mode.
```
  npx playwright test --ui
```
## Runs the tests only on Desktop Chrome. 
```npx playwright test --project=chromium
```   
## Runs the tests in a specific file.
```
npx playwright test example
```
## Runs the tests in debug mode.
```npx playwright test --debug
```
## Auto generate tests with Codegen.
  ```npx playwright codegen
  ```
## Run the tests with headed mode
```
npx playwright  test --headed
```
## Run the tests with specific file and only on one particular platform use below command
Here Using "Chromium"
```
npx playwright  test --headed --project=chromium tests/sapiaTasks.spec.js
```
## Install the faker module use below command
It is for generate the random words  to answers to the free text questions
```
npm install faker
```

## Please update the below piece of code in playwright.config.js
Here Defining the BaseURL for accessing the gloabally in the framework
```
 use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    baseURL: 'https://fi.sandbox.sapia.ai/ap-southeast-2/cohorts/623a9ab72ad0b2561fecc7ae'
  },

```

## Increate the timeout in  playwright.config.js
I face the timeout issues  in test execution as chatbot app lil bit slow while giving the response

Earlier it had "30000" changed to "300000"
```
// Global test timeout (in milliseconds)
timeout: 300000,
```


