var home_page = require("../pages/home_page.js");
var login_page = require("../pages/login_page.js");
var request = require("request");

beforeEach(function () {
    browser.timeouts('implicit', 3000);
})

describe("ANDROID END TO END TEST", function() {

    it("01 - Find Charging Station", function(done) {
        browser.click("//android.widget.Button[@text='FIND CHARGING STATION']");
        //progress
        browser.pause(2000);
    });

    it("02 - Wait for Map to Appear", function() {
        browser.waitUntil(function () {
            return browser.isEnabled("#imgV_unlock")
        }, 60000, 'Map Failed to appear after 60 seconds');
    });

    it("03 - Unlock Battery", function(done) {
        browser.click("#imgV_unlock");
        browser.pause(1000);
    });

    it("04 - Enter correct station ID and select YES to confirm station ID", function(done) {
        browser.click("#num_pad");
        browser.setValue("#txt_code", '501476');
        browser.click("//android.widget.TextView[@text='UNLOCK']");
        browser.click("//android.widget.Button[@text='YES']");
        browser.pause(1000);
    });

    it("05 - Screen loads - Displays Rental Plan", function(done) {
        var rentPlan = "//android.widget.TextView[@text='Choose Plan']";
        browser.waitForExist(rentPlan, false);
    });

    it("06 - Swap Battery option is displayed", function(done) {
        var batterySwap = "//android.widget.TextView[@text='Swap past purchase']";
        browser.waitForExist(batterySwap, false);
    });

    it("07 - Pay as you go rental option is displayed", function(done) {
        var PayAsYouGo = "//android.widget.TextView[@text='Pay as you go']";
        browser.waitForExist(PayAsYouGo, false);
    });

    it("08 - 1 Day rental option is displayed", function(done) {
        var Day = "//android.widget.TextView[@text='1 Day']";
        browser.waitForExist(Day, false);
    });

    it("09 - Payment options is displayed - for hourly and daily rentals", function(done) {
        var hourly_rate = browser.getText("//android.widget.TextView[@text='1 Day']");
        expect(hourly_rate).to.equal('1 Day');

        var daily_charge = browser.getText("//android.widget.TextView[@text='£3']");
        expect(daily_charge).to.equal('£3');

        var daily_rate = browser.getText("//android.widget.TextView[@text='/24 hours']");
        expect(daily_rate).to.equal('/24 hours');

        var daily_rate = browser.getText("//android.widget.TextView[@text='Save 40%']");
        expect(daily_rate).to.equal('Save 40%');

        var hourly_charge = browser.getText("//android.widget.TextView[@text='Pay as you go']");
        expect(hourly_charge).to.equal('Pay as you go');

        var daily_charge = browser.getText("//android.widget.TextView[@text='£1']");
        expect(daily_charge).to.equal('£1');

        var payment_type = browser.getText("//android.widget.TextView[@text='/hour']");
        expect(payment_type).to.equal('/hour');

    });

    it("10 - User select Pay as you go", function(done) {
        browser.click("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.ScrollView/android.view.ViewGroup/android.widget.FrameLayout[2]/android.view.ViewGroup/android.widget.ImageView\n");
    });

    it("11 - User taps Next button", function(done) {
        browser.click("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.Button\n");
        browser.pause(5000);
    });

    it("12 - Battery is released to user", function(done) {
        browser.click("//android.widget.Button[@text='DONE']");
    });

    it("13 - Forgot to return Battery? Keep the Battery more than 90 days? £30", function(done) {
        browser.isVisible("//android.widget.TextView[@text='Forgot to return your battery?']");
        browser.isVisible("//android.widget.TextView[@text='We cap your spending daily, no stress']");
        browser.isVisible("//android.widget.TextView[@text='We need to know your mobile network to show you relevant offers.']");
    });

    it("14 - User close the forgot to return Battery screen", function(done) {
        browser.click("#autoBuycloseIV");
    });

    it("15 - Current time rental is displayed to user", function(done) {
        var time_rental = browser.getText("//android.widget.TextView[@text='Current Rental Time']");
        expect(time_rental).to.equal('Current Rental Time');
    });

});
