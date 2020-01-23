var home_page = require("../pages/home_page.js");
var login_page = require("../pages/login_page.js");
var request = require("request");

beforeEach(function () {
    browser.timeouts('implicit', 3000);
})

describe("02 - UNLOCK BATTERY TEST", function() {

    it("01 - Wait for Find Charging Station to appear", function() {
        browser.waitUntil(function () {
            return browser.isVisible("//android.widget.Button[@text='FIND CHARGING STATION']")
        }, 60000, 'Element NOT visible after 60 seconds');
    });

    it("02 - Find Charging Station", function(done) {
        console.log('Unlock Battery Test Started');
        browser.click("//android.widget.Button[@text='FIND CHARGING STATION']");
        browser.pause(2000);
    });

    it("03 - Wait for Map to Appear", function() {
        browser.waitUntil(function () {
            return browser.isEnabled("#imgV_unlock")
        }, 60000, 'Map Failed to appear after 60 seconds');
    });

    it('04 - Screenshot of the map showing stations', function () {
        browser.saveScreenshot('./screenshots/map_stations.png');
    });

    it("05 - Unlock Battery", function(done) {
        browser.click("#imgV_unlock");
    });

    it("06 - Allow chargedUp to access photos, media and other files", function(done) {
        browser.click("//android.widget.Button[@text='Allow']");
    });

    it("07 - Enter incorrect station ID", function(done) {
        browser.click("#imgV_unlock");
        browser.click("//android.widget.Button[@text='Allow']");
        browser.click("#num_pad");
        browser.setValue("#txt_code", '555006');
        browser.click("//android.widget.TextView[@text='UNLOCK']");
        browser.pause(1000);
        var StationID = browser.getText("//android.widget.TextView[@text='Confirm station ID?']");
        console.log(StationID);
        StationID.should.equal('Confirm station ID?');
        browser.click("//android.widget.Button[@text='YES']");
        var error = browser.getText("//android.widget.TextView[@text='Station not found']");
        expect(error).to.equal('Station not found');
    });

    it("08 - Re-enter station ID and select NO to confirm station ID", function(done) {
        browser.setValue("#txt_code", '7777');
        browser.click("//android.widget.TextView[@text='UNLOCK']");
        browser.click("//android.widget.Button[@text='NO']");
    });

    it("09 - Enter correct station ID and select YES to confirm station ID", function(done) {
        browser.setValue("#txt_code", '501476');
        browser.click("//android.widget.TextView[@text='UNLOCK']");
        browser.click("//android.widget.Button[@text='YES']");
        browser.pause(1000);

        // *** This is DEV station ***

        // browser.setValue("#txt_code", '75313');
        // browser.click("//android.widget.TextView[@text='UNLOCK']");
        // browser.click("//android.widget.Button[@text='YES']");
        // browser.pause(2000);
    });

    it("10 - Screen loads - Displays Rental Plan", function(done) {
        var rentPlan = "//android.widget.TextView[@text='Choose Plan']";
        browser.waitForExist(rentPlan, false);
    });

    // it("11 - Swap Header is displayed", function(done) {
    //     // var swipeHeader = "#Swap past purchase";
    //     // browser.waitForExist(swipeHeader, false);
    //     var swipeHeader = browser.getText("#SwapHeader");
    //     expect(swipeHeader).to.equal('Swap past purchase');
    // });

    it("12 - Pay as you go rental option is displayed", function(done) {
        var PayAsYouGo = "//android.widget.TextView[@text='Pay as you go']";
        browser.waitForExist(PayAsYouGo, false);

    });

    it("13 - 1 Day rental option is displayed", function(done) {
        var Day = "//android.widget.TextView[@text='1 Day']";
        browser.waitForExist(Day, false);
    });

    it("14 - Payment options is displayed - for hourly and daily rentals", function(done) {
        var hourly_rate = browser.getText("#hourlyRateTV");
        expect(hourly_rate).to.equal('£1');

        var daily_charge = browser.getText("#dailyRateTV");
        expect(daily_charge).to.equal('£3');

        var daily_rate = browser.getText("//android.widget.TextView[@text='/24 hours']");
        expect(daily_rate).to.equal('/24 hours');

        var daily_rate = browser.getText("//android.widget.TextView[@text='Save 40%']");
        expect(daily_rate).to.equal('Save 40%');

        // var daily_rate = browser.getText("#buyBatterPrice");
        // expect(daily_rate).to.equal('£30.0');
        //
        // var hourly_charge = browser.getText("//android.widget.TextView[@text='Once purchased,you can swap the battery in any of our stations for a year or keep the battery and charge it at home']");
        // expect(hourly_charge).to.equal('Once purchased,you can swap the battery in any of our stations for a year or keep the battery and charge it at home');
    });

    it("15 - User select Pay as you go", function(done) {
        browser.click("#payAsYouGoSelector");
        browser.pause(1000);
    });

    it("16 - User taps Next button", function(done) {
        browser.click("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.Button\n");
        browser.pause(5000);
    });

    it("17 - Battery is released to user", function(done) {
        browser.click("//android.widget.Button[@text='DONE']");
    });

    it("18 - Forgot to return Battery? Keep the Battery more than 90 days? £30", function(done) {
        browser.isVisible("//android.widget.TextView[@text='Forgot to return your battery?']");
        browser.isVisible("//android.widget.TextView[@text='We cap your spending daily, no stress']");
        browser.isVisible("//android.widget.TextView[@text='We need to know your mobile network to show you relevant offers.']");
    });

    it("19 - User close the forgot to return Battery screen", function(done) {
        browser.click("#autoBuycloseIV");
    });

    it("20 - Current time rental is displayed to user", function(done) {
        var time_rental = browser.getText("//android.widget.TextView[@text='Current Rental Time']");
        expect(time_rental).to.equal('Current Rental Time');
    });

    it("21 - User taps RETURN", function(done) {
        browser.click("//android.widget.TextView[@text='RETURN']");
    });

    it("22 - User see How to return in 2 steps", function(done) {
        var step1 = "//android.widget.TextView[@text='Step 1']";
        browser.waitForExist(step1, false);

        var info1 = "//android.widget.TextView[@text='Return the cable into the battery']";
        browser.waitForExist(info1, false);

        var return_battery = "//android.widget.Button[@text='NEXT']";
        browser.waitForExist(return_battery, false);

        var time_rental = "//android.widget.TextView[@text='Chat with us']";
        browser.waitForExist(time_rental, false);
    });

    it("23 - User Swipe to the right and verify information in step 2", function(done) {
        browser.click("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/androidx.drawerlayout.widget.DrawerLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout[1]/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout[2]/android.widget.ImageView\n");
        browser.pause(2000);

        var return_battery = "//android.widget.Button[@text='GOT IT!']";
        browser.waitForExist(return_battery, false);

        var time_rental = "//android.widget.TextView[@text='Chat with us']";
        browser.waitForExist(time_rental, false);
    });

    it("24 - User taps GOT IT Button", function(done) {
        browser.click("//android.widget.Button[@text='GOT IT!']");
        browser.pause(2000);
    });

    it("25 - User verifies the timer on the map", function(done) {
        var top_timer_rental = "#timer_top";
        browser.waitForExist(top_timer_rental, false);
    });

    it("26 - User verifies the Referesh Map button on the map", function(done) {
        var refresh_Btn = "#refreshBtn";
        browser.waitForExist(refresh_Btn, false);
    });

    it("27 - User verifies the Rent Timer Count", function(done) {
        var rent_timer = "#rent_timer_bg";
        browser.waitForExist(rent_timer, false);
    });


});
