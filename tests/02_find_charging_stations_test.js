var home_page = require("../pages/home_page.js");
var login_page = require("../pages/login_page.js");
var request = require("request");

beforeEach(function () {
    browser.timeouts('implicit', 3000);
})

describe("FIND CHARGING STATION TEST", function() {

    it("01 - Apps loads - home screen verified successfully", function(done) {
        console.log('Onboarding Test Started');
        browser.waitForVisible("//android.widget.TextView[@text='£1 per hour']");
        var welcomeMessage = browser.getText("//android.widget.TextView[@text='£1 per hour']");
        console.log(welcomeMessage);
    });

    it("02 - Login with valid details", function(done) {
        home_page.clickLoginBtn();
        browser.pause(1000);
        browser.click("//android.widget.TextView[@text='+44']");
        browser.click("//android.widget.TextView[@text='Canada']");
        browser.click("#ed_mob_no");
        browser.setValue("#ed_mob_no", '5005550006');
        browser.hideDeviceKeyboard(); // taps outside to hide keyboard per default
        //browser.hideDeviceKeyboard('tapOutside');
        browser.click("//android.widget.Button[@text='LOG IN']");
        browser.pause(2000);
    });

    it("03 - Enter SMS verification code", function(done) {
        browser.setValue("#ed_otp_1", '666666');
        browser.click("//android.widget.Button[@text='NEXT']");
        browser.pause(1000);
    });

    it("04 - Find Charging Station", function(done) {
        browser.click("//android.widget.Button[@text='FIND CHARGING STATION']");
        browser.pause(2000);
    });

    it("05 - Waiting for Map to Appear", function() {
        browser.waitUntil(function () {
            return browser.isEnabled("#refreshBtn")
        }, 60000, 'Map Failed to appear after 60 seconds');
    });

});
