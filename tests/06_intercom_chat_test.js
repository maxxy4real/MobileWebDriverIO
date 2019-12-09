var home_page = require("../pages/home_page.js");
var login_page = require("../pages/login_page.js");
var request = require("request");

beforeEach(function () {
    browser.timeouts('implicit', 3000);
})

describe("ANDROID END TO END TEST", function() {

    it("01 - User close the forgot to return Battery screen", function(done) {
        browser.click("#autoBuycloseIV");
    });

    it("02 - User taps Chat with us", function(done) {
        browser.click("//android.widget.TextView[@text='Chat with us']");
    });

    it("03 - Screen opens up intercom Messaging platform", function(done) {
        browser.isExisting("#intercom_collapsing_team_bio");
    });

    it("04 - Start a conversation", function(done) {
        browser.click("#input_text");
        browser.setValue("#input_text", 'This is an automated, please acknowledge. Thanks ');
        browser.hideDeviceKeyboard(); // taps outside to hide keyboard per default
        // browser.click("#send_button").click();
        browser.pause(2000);
    });

    it("05 - User closes intercom Messaging platform", function(done) {
        browser.click("#intercom_toolbar_close");
        browser.pause(3000);
        browser.click("#autoBuycloseIV");

        var return_battery = "//android.widget.Button[@text='RETURN']";
        browser.waitForExist(return_battery, false);

        var time_rental = "//android.widget.TextView[@text='Chat with us']";
        browser.waitForExist(time_rental, false);
    });

});
