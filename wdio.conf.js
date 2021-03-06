//create a baseUrl using camel case...
var baseUrl = 'https://chargedup.green/';
const video = require('wdio-video-reporter');
var request = require("request");



// if(process.env.server === 'prod'){
//     baseUrl = 'https://www.google.com';
//     }else{
//       baseUrl = 'http://www.webdriveruniversity.com';
//     }

    var timeout = process.env.DEBUG ? 99999999 : 10000;

//Here we have a variable called baseUrl, we have an if statement that checks to see if the server is equal to production during run time
// if it is, its set up baseUrl to google.com, else it will default to the next value set

exports.config = {
    
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //

    specs: [
        // './tests/01_login_test.js',
        // './tests/02_start_rental_test.js',
        // './tests/03_intercom_chat_test.js',
        './tests/04_signup_test.js'
    ],
    // Patterns to exclude.
    exclude: [
        './pages/*_page.js'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 1,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    // capabilities: [{
    //     // maxInstances can get overwritten per capability. So if you have an in-house Selenium
    //     // grid with only 5 firefox instances available you can make sure that not more than
    //     // 5 instances get started at a time.
    //     maxInstances: 1,
    //     //
    //     browserName: 'chrome'
    // }],
    capabilities: [

         {
        //     maxInstances: 1,
        //     // browserName: 'Safari',
        //     appiumVersion : '1.15.1',
        //     deviceName : 'iPhone 8',
        //     platformVersion : '13.1',
        //     platformName : 'iOS',
        //     deviceOrientation: 'portrait',
        //     automationName: 'XCUITest',
        //     noReset: 'true',
        //     autoAcceptAlerts: 'true',
        //     //udid: '00008020-000928121145002e', //Needed ONLY for real devices
        //     app: '/Users/maxwellnwajei/Library/Developer/Xcode/DerivedData/ChargedUp-ebvlfpjeqfvdmtawusmggmgvoxcl/Build/Products/Debug-iphonesimulator/ChargedUp.app'
        // },

            maxInstances: 1,
            platformName: "Android",
            // platformVersion : '9.0',
            // deviceName : 'Honor 10 Lite',
             platformVersion : '9.0',
             deviceName : 'maxDevice01',
            appiumVersion : '1.15.1',
             app: '/Users/maxwellnwajei/Documents/ChargedUp/android/app-debug.apk',
             // app: '/Users/maxwellnwajei/Documents/ChargedUp/android/app-prod-release.apk',
            automationName: 'UiAutomator2',
            noReset: 'true',  //Do not stop app, do not clear app data, and do not uninstall apk.
            // newCommandTimeout: 0, //How long (in seconds) Appium will wait for a new command from the client before assuming the client quit and ending the session
            autoAcceptAlerts: 'true', //Accept all iOS alerts automatically if they pop up. This includes privacy access permission alerts (e.g., location, contacts, photos). Default is false.
            sessionOverride: 'true',
        },
    ],

    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // By default WebdriverIO commands are executed in a synchronous way using
    // the wdio-sync package. If you still want to run your tests in an async way
    // e.g. using promises you can set the sync option to false.
    sync: true,
    //
    // Level of logging verbosity: silent | verbose | command | data | result | error
    logLevel: 'silent',
    //
    // Enables colors for log output.
    coloredLogs: true,
    //
    // Warns when a deprecated command is used
    deprecationWarnings: true,
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Saves a screenshot to a given path if a command fails.
    screenshotPath: './errorShots/',
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: baseUrl,
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Initialize the browser instance with a WebdriverIO plugin. The object should have the
    // plugin name as key and the desired plugin options as properties. Make sure you have
    // the plugin installed before running any tests. The following plugins are currently
    // available:
    // WebdriverCSS: https://github.com/webdriverio/webdrivercss
    // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
    // Browserevent: https://github.com/webdriverio/browserevent
    // plugins: {
    //     webdrivercss: {
    //         screenshotRoot: 'my-shots',
    //         failedComparisonsRoot: 'diffs',
    //         misMatchTolerance: 0.05,
    //         screenWidth: [320,480,640,1024]
    //     },
    //     webdriverrtc: {},
    //     browserevent: {}
    // },
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: ['selenium-standalone', 'appium'],
    appium: {
        args: {
            address: '127.0.0.1',
            commandTimeout: '7200',
            sessionOverride: true,
            debugLogSpacing: true
        }

    },

    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: http://webdriver.io/guide/testrunner/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'mocha',

    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: http://webdriver.io/guide/reporters/dot.html
    reporters: ['dot', 'junit', 'allure', 'spec'],

    reporterOptions: {
        junit: {
            outputDir: './reports/junit-results'
        },

        video: {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
        },

        allure: {
            outputDir: 'allure-results',
            // outputDir: './allure-results/'
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
            useCucumberStepReporter: false
        }
    },


    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: 99999999
    },
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: function (config, capabilities) {
        console.log('Preparing to run test *** Deleting all previous reports ***')
        const  del = require('del');
        // del(['errorShots', 'reports']);
        del(['allure-results', 'errorShots', 'reports']);
    },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
     beforeSession: function (config, capabilities, specs) {
        assert = require('chai').assert;
        expect = require('chai').expect;
        should = require('chai').should();
        // localStorage.clear();
        // browser.resetApp();

        // // Deleting Request
        // var options = { method: 'DELETE',
        //     url: 'https://api.prod.chargedup.systems/api/check_user_existance_sign_in',
        //     formData: { country_code: '+44', phone: '7424438203', name: 'Max' } };
        //
        // request(options, function (error, response, body) {
        //     if (error) throw new Error(error);
        //
        // });

        console.log('Calling before each Test');
        // const adb = ADB.createADB();
        // console.log(adb.getPIDsByName('com.android.phone'));
        // browser.shell(["cp", "-rp", "/sdcard/Android/data/com.chargedup.largestation.dev_backup", "/sdcard/Android/data/com.chargedup.largestation.dev"])
},
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // before: function (capabilities, specs) {
    //     const  del = require('del');
    //     del(['allure-results', 'errorShots', 'reports']);
    //     assert = require('chai').assert;
    //     expect = require('chai').expect;
    //     should = require('chai').should();
    //
    // },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    
    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    //beforeSuite: function (suite) {
    //},
    /**
     * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
     * @param {Object} test test details
     */
    // beforeTest: function (test) {
    // },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function () {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite ends (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function () {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) ends.
     * @param {Object} test test details
     */
    // afterTest: function (test) {
    // },
    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    afterSuite: function (suite) {
        console.log('First Test is completed running the second one');
        // browser.resetApp();
        // browser.quit
        //
        // if(browser !== null) {
        //     return browser;
        // }
    },
    
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */

    // onComplete: function(exitCode, config, capabilities) {
    // }
}
