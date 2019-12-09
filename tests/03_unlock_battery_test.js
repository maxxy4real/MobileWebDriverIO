var home_page = require("../pages/home_page.js");
var login_page = require("../pages/login_page.js");
var request = require("request");

beforeEach(function () {
    browser.timeouts('implicit', 3000);
})

describe("ANDROID END TO END TEST", function() {

    it("01 - Find Charging Station", function(done) {
        browser.click("//android.widget.Button[@text='FIND CHARGING STATION']");
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

    it("04 - Enter incorrect station ID", function(done) {
        browser.click("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.LinearLayout[3]/android.widget.LinearLayout/android.widget.ImageView[1]");  //works
        browser.setValue("#txt_code", '555006');
        browser.click("//android.widget.TextView[@text='UNLOCK']");
        browser.pause(1000);
        var StationID = browser.getText("//android.widget.TextView[@text='Confirm station ID?']");
        console.log(StationID);
        StationID.should.equal('Confirm station ID?');
    });

    it("05 - Error message displayed - station not found", function(done) {
        browser.click("//android.widget.Button[@text='YES']");
        var error = browser.getText("//android.widget.TextView[@text='Station 555006 not found']");
        expect(error).to.equal('Station 555006 not found');
    });

    it("06 - Re-enter station ID and select NO to confirm station ID", function(done) {
        browser.setValue("#txt_code", '7777');
        browser.click("//android.widget.TextView[@text='UNLOCK']");
        browser.click("//android.widget.Button[@text='NO']");
    });

    it("07 - Enter correct station ID and select YES to confirm station ID", function(done) {
        browser.setValue("#txt_code", '501476');
        browser.click("//android.widget.TextView[@text='UNLOCK']");
        browser.click("//android.widget.Button[@text='YES']");
        browser.pause(1000);
    });

});
