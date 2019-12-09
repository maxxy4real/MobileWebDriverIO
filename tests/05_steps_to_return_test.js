var home_page = require("../pages/home_page.js");
var login_page = require("../pages/login_page.js");
var request = require("request");

beforeEach(function () {
    browser.timeouts('implicit', 3000);
})

describe("STEPS TO RETURN BATTERY TEST", function() {

    it("01 - Forgot to return Battery? Keep the Battery more than 90 days? £30", function(done) {
        browser.isVisible("//android.widget.TextView[@text='Forgot to return your battery?']");
        browser.isVisible("//android.widget.TextView[@text='We cap your spending daily, no stress']");
        browser.isVisible("//android.widget.TextView[@text='We need to know your mobile network to show you relevant offers.']");
    });

    it("02 - User close the forgot to return Battery screen", function(done) {
        browser.click("#autoBuycloseIV");
    });

    it("03 - Current time rental is displayed to user", function(done) {
        var time_rental = browser.getText("//android.widget.TextView[@text='Current Rental Time']");
        expect(time_rental).to.equal('Current Rental Time');
    });

    it("04 - User taps RETURN", function(done) {
        browser.click("//android.widget.TextView[@text='RETURN']");
    });

    it("05 - User see How to return in 2 steps", function(done) {
        var step1 = "//android.widget.TextView[@text='Step 1']";
        browser.waitForExist(step1, false);

        var info1 = "//android.widget.TextView[@text='Return the cable into the battery']";
        browser.waitForExist(info1, false);

        var return_battery = "//android.widget.Button[@text='NEXT']";
        browser.waitForExist(return_battery, false);

        var time_rental = "//android.widget.TextView[@text='Chat with us']";
        browser.waitForExist(time_rental, false);
    });

    it("06 - User Swipe to the right and verify information in step 2", function(done) {
        browser.click("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/androidx.drawerlayout.widget.DrawerLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout[1]/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout[2]/android.widget.ImageView\n");
        browser.pause(2000);

        // var info1 = browser.getText("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/androidx.drawerlayout.widget.DrawerLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout[1]/android.widget.RelativeLayout/androidx.viewpager.widget.ViewPager/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.TextView[2]");
        // console.log(info1);
        // expect(info1).to.equal('Return the battery into the station. Make sure it clicks!\n');

        var return_battery = "//android.widget.Button[@text='GOT IT!']";
        browser.waitForExist(return_battery, false);

        var time_rental = "//android.widget.TextView[@text='Chat with us']";
        browser.waitForExist(time_rental, false);
    });

    it("07 - User taps GOT IT Button", function(done) {
        browser.click("//android.widget.Button[@text='GOT IT!']");
        browser.pause(2000);
    });

    it("08 - User verifies the timer on the map", function(done) {
        var top_timer_rental = "#timer_top";
        browser.waitForExist(top_timer_rental, false);
    });

    it("09 - User verifies the Referesh Map button on the map", function(done) {
        var refresh_Btn = "#refreshBtn";
        browser.waitForExist(refresh_Btn, false);

    });

    it("10 - User verifies the Rent Timer Count", function(done) {
        var rent_timer = "#rent_timer_bg";
        browser.waitForExist(rent_timer, false);
    });

});
