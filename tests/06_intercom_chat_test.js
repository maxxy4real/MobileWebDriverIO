var home_page = require("../pages/home_page.js");
var login_page = require("../pages/login_page.js");
var request = require("request");

beforeEach(function () {
    browser.timeouts('implicit', 3000);
})

describe("CHAT WITH INTERCOM TEST", function() {
    it("01 - Forgot to return Battery? Keep the Battery more than 90 days? £30", function(done) {
        browser.isVisible("//android.widget.TextView[@text='Forgot to return your battery?']");
        browser.isVisible("//android.widget.TextView[@text='We cap your spending daily, no stress']");
        browser.isVisible("//android.widget.TextView[@text='We need to know your mobile network to show you relevant offers.']");
    });

    it("02 - User close the forgot to return Battery screen", function(done) {
        browser.click("#autoBuycloseIV");
    });

    it("03 - User taps Chat with us", function(done) {
        browser.click("//android.widget.TextView[@text='Chat with us']");
    });

    it("04 - Screen opens up intercom Messaging platform", function(done) {
        browser.isExisting("#intercom_collapsing_team_bio");
    });

    it("05 - Start a conversation", function(done) {
        browser.click("#input_text");
        browser.setValue("#input_text", 'This is an automated, please acknowledge. Thanks ');
        browser.hideDeviceKeyboard(); // taps outside to hide keyboard per default
        // browser.click("#send_button").click();
    });

    it("06 - User closes intercom Messaging platform", function(done) {
        browser.click("#intercom_toolbar_close");
    });

    it("07 - And I tap the NAV Icon", function(done) {
        browser.click("#nav_icon");
    });

    it("08 - And I tap the Settings", function(done) {
        browser.click("#nav_icon");
        browser.click("//android.widget.TextView[@text='Settings']");
    });

    it("09 - And I tap Sign Out", function(done) {
        browser.click("//android.widget.Button[@text='SIGN OUT']");
        browser.pause(1000);
    });

    it("10 - And User is Logged Out", function(done) {
        browser.click("//android.widget.Button[@text='SIGN OUT']");
    });

});
