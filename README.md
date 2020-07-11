Appium, JavaScript, WebdriverIO & Mocha Automation Test
====================

## Technologies
• JavaScript
• WebdriverIO 
• Mocha
• Appium
• Chai
• WDIO File.

## Download dependencies
Ensure you have Node Version 10.12.0
Clone the project
Go to the root folder and do `npm install 
(This will download all the packages needed for the project)

## To Run the test
type `npm test`

## Generate Allure Reports
navigate to the root folder and type the command below type

    allure generate ./allure-results --clean && allure open
    
Reports should open in a browser

## Test Device 
Before running your test ensure your device matches the capabilities in the WDIO file
Desired Capabilities are a set of keys and values sent to the Appium server during session initialization, 
that tells Appium what kind of thing we want to automate. 
The minimum set of required capabilities for any Appium driver should include:

•	platformName: the name of the platform to automate
•	platformVersion: the version of the platform to automate
•	deviceName: the kind of device to automate
•	app: the path to the app apk you want to automate
•	appiumVersion the version of the Appium used
•	automationName: the name of the driver you wish to used.


## Note 
I HAVE already set capabilities to RUN on Android Version 9, 
Galaxy S9+ (Therefore you don’t have to modify anything to RUN the test, just plug the device to your computer and ensure your PC recognises the device.)


## Adding New Test
If you add a New JavaScript test file, please ensure you add it to the specs in the WDIO file as seen below:

specs: [
    './tests/01_login_test.js',
    './tests/02_start_rental_test.js',
    './tests/03_intercom_chat_test.js',
    './tests/04_signup_test.js'
],

## References
https://webdriver.io/docs/api/appium.html
http://appium.io/docs/en/writing-running-appium/caps/index.html
