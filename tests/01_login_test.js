var home_page = require("../pages/home_page.js");
var login_page = require("../pages/login_page.js");
var request = require("request");

beforeEach(function (done) {
    browser.timeouts('implicit', 3000);
})

before(function (done) {
    browser.reset();
})

describe("01 - LOGIN TEST", function() {

    it("01 - Apps loads - home screen verified successfully", function(done) {
        console.log('Login Test Started');
        if (browser.isLocked) {
            browser.unlock();
        } else {
            console.log("app is already open");
        }
        browser.waitForVisible("//android.widget.TextView[@text='£1 per hour']");
        var welcomeMessage = browser.getText("//android.widget.TextView[@text='£1 per hour']");
        console.log(welcomeMessage);
        expect(welcomeMessage).to.equal('£1 per hour');

        var QRMessage = browser.getText("//android.widget.TextView[@text='Scan QR code to rent a battery']");
        console.log(QRMessage);
        expect(QRMessage).to.equal('Scan QR code to rent a battery');
    });

    it("02 - User swipe to see onboarding process", function(done) {
        browser.click("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout[2]/android.widget.ImageView");
        var msg1 = browser.getText("//android.widget.TextView[@text='Cables included']");
        console.log(msg1);
        expect(msg1).to.equal('Cables included');

        var msg2 = browser.getText("//android.widget.TextView[@text='Find them on either side of the battery']");
        console.log(msg2);
        expect(msg2).to.equal('Find them on either side of the battery');

        browser.click("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout[3]/android.widget.ImageView");
        var msg3 = browser.getText("//android.widget.TextView[@text='Return anywhere']");
        console.log(msg3);
        expect(msg3).to.equal('Return anywhere');

        var msg4 = browser.getText("//android.widget.TextView[@text='Drop off at any of our stations across Europe']");
        console.log(msg4);
        expect(msg4).to.equal('Drop off at any of our stations across Europe');
    });

    it("03 - Check login validation", function(done) {
        home_page.clickLoginBtn();
        browser.pause(1000);
        login_page.clickMyLoginBtn();
        var ExpectedSignInError = browser.getText("//android.widget.TextView[@text='Please enter your mobile number without country code - tap to change it']");
        ExpectedSignInError.should.equal('Please enter your mobile number without country code - tap to change it');
        browser.pause(3000);
    });

    it("04 - Login in with Invalid details", function(done) {
        home_page.clickLoginBtn();
        browser.setValue("#ed_mob_no", '7895673420');
        browser.click("//android.widget.Button[@text='LOG IN']");
        browser.pause(5000);
        var ExpectedSignInError = browser.getText("#snackbar_text");
        console.log(ExpectedSignInError);
        ExpectedSignInError.should.equal('No account found for this number, please sign up providing your name and accepting our Terms');
        browser.pause(3000);
        browser.back();
    });

    it("05 - Login with valid details", function(done) {
        browser.click("//android.widget.TextView[@text='+44']");
        browser.click("//android.widget.TextView[@text='Canada']");
        browser.click("#ed_mob_no");
        browser.setValue("#ed_mob_no", '5005550006');
        browser.hideDeviceKeyboard(); // taps outside to hide keyboard per default
        //browser.hideDeviceKeyboard('tapOutside');
        browser.click("//android.widget.Button[@text='LOG IN']");
        browser.pause(2000);
    });

    // it("07 - Wait for Timer count down to 0Secs and Verify Resend code is enabled", function() {
    //     browser.waitUntil(function () {
    //         return browser.getText("#txt_resend_code") === 'Resend code'
    //         console.log(browser.getText("#txt_resend_code"));
    //     }, 60000, 'Expected Resend code to be enabled');
    // });

    it("08 - Enter SMS verification code", function(done) {
        browser.setValue("#ed_otp_1", '666666');
        browser.click("//android.widget.Button[@text='NEXT']");
        browser.pause(2000);
    });

    it("09 - User sees notification - which network are you on?", function(done) {
        browser.isVisible("//android.widget.TextView[@text='Which network are you on?']");
        browser.isVisible("//android.widget.TextView[@text='We need to know your mobile network to show you relevant offers.']");
        browser.click("//android.widget.Button[@text='ALLOW MOBILE ACCESS']");
        browser.pause(3000);
    });

    it("10 - Allow chargedUp to access photos, media and other files", function(done) {
        browser.click("//android.widget.Button[@text='ALLOW']");
    });

});
