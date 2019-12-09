// var request = require("request");
var home_page = require("../pages/home_page.js");
var login_page = require("../pages/login_page.js");
var faker = require("faker");

    // beforeEach(function () {
    //     browser.timeouts('implicit', 5000);
    //     // console.log('Reload before each block')
    // })

describe("Sign Up Test", function() {

    var randomNumber = faker.random.number(1000);
    var randomFirstName = faker.random.first_name();
    var randomLastName = faker.random.last_name();
    var randomPrefixName = faker.random.name_prefix();


    it("01 - Apps loads - home screen verified successfully", function(done) {
        console.log('Onboarding Test Started');
        browser.waitForVisible("//android.widget.TextView[@text='£1 per hour']");
        var welcomeMessage = browser.getText("//android.widget.TextView[@text='£1 per hour']");
        console.log(welcomeMessage);
        expect(welcomeMessage).to.equal('£1 per hour');

        var QRMessage = browser.getText("//android.widget.TextView[@text='Scan QR code to rent a battery']");
        console.log(QRMessage);
        expect(QRMessage).to.equal('Scan QR code to rent a battery');
    });

    it("03 - Check login validation", function(done) {
        home_page.clickLoginBtn();
        browser.pause(1000);
        login_page.clickMyLoginBtn();
        var ExpectedSignInError = browser.getText("//android.widget.TextView[@text='Please enter your mobile number without country code - tap to change it']");
        ExpectedSignInError.should.equal('Please enter your mobile number without country code - tap to change it');
        // browser.pause(1000);
    });

    it("04 - Enter a New Number", function(done) {
        browser.click("//android.widget.TextView[@text='+44']");
        browser.click("//android.widget.TextView[@text='Canada']");
        browser.setValue("//android.widget.EditText[@text='0000000000']", '5005550'+randomNumber);
        browser.click("//android.widget.Button[@text='LOG IN']");
        browser.pause(3000);
    });

    // it("05 - Backend checks and Detects New Number", function(done) {
    //     var msg_new_number = browser.getText("#snackbar_text");
    //     msg_new_number.should.equal('No account found for this number, please sign up!');
    //     // browser.pause(1000);
    // });
    //
    // it("06 - Enter New User Full Name", function(done) {
    //     browser.click("#ed_full_name");
    //     console.log(randomFirstName);
    //     console.log(randomLastName);
    //     browser.setValue("#ed_full_name", randomPrefixName+' '+randomFirstName+' '+randomLastName);
    //     browser.hideDeviceKeyboard(); // taps outside to hide keyboard per default
    // });
    //
    // it("07 - Accept Policy Check Box", function(done) {
    //     browser.click("#accept_policy_checkbox");
    // });
    //
    // it("08 - Click Login Button", function(done) {
    //     browser.click("//android.widget.Button[@text='LOG IN']");
    //     browser.pause(3000);
    // });
    //
    // it("09 - Attempt to Login without OTP", function(done) {
    //     browser.click("//android.widget.Button[@text='NEXT']");
    //     var OTPErrorMsg = browser.getText("#snackbar_text");
    //     console.log(OTPErrorMsg);
    //     expect(OTPErrorMsg).to.equal('Please enter 6-digit code sent as a text (SMS) to the mobile number you\'ve provided.');
    //     browser.pause(3000);
    // });
    //
    // it("10 - Enter Incorrect OTP code", function(done) {
    //     browser.setValue("#ed_otp_1", '578724');
    //     browser.click("//android.widget.Button[@text='NEXT']");
    //     browser.pause(3000);
    //     var OTPErrorMsg1 = browser.getText("#snackbar_text");
    //     console.log(OTPErrorMsg1);
    //     expect(OTPErrorMsg1).to.equal('Please double-check the code you’ve entered matches the SMS we sent you');
    //     browser.pause(1000);
    // });
    //
    // // it("11 - Wait for Timer count down to 0Secs and Verify Resend code is enabled", function() {
    // //     browser.waitUntil(function () {
    // //         return browser.getText("#txt_resend_code") === 'Resend code'
    // //         console.log(browser.getText("#txt_resend_code"));
    // //     }, 50000, 'Expected Resend code to be enabled');
    // // });
    //
    // it("12 - Enter SMS verification code", function(done) {
    //     browser.setValue("#ed_otp_1", '666123');
    //     browser.click("//android.widget.Button[@text='NEXT']");
    //     browser.pause(1000);
    // });
    //
    // it("10 - User sees notification - which network are you on?", function(done) {
    //     browser.isVisible("//android.widget.TextView[@text='Which network are you on?']");
    //     browser.isVisible("//android.widget.TextView[@text='We need to know your mobile network to show you relevant offers.']");
    //     browser.click("//android.widget.Button[@text='ALLOW MOBILE ACCESS']");
    // });
    //
    // it("11 - Allow chargedUp to access photos, media and other files", function(done) {
    //     browser.click("//android.widget.Button[@text='ALLOW']");
    //     console.log('Access to device authorized by the user');
    // });
    //
    // it("12 - Rent a battery", function(done) {
    //     browser.click("//android.widget.Button[@text='RENT BATTERY NOW']");
    //     browser.pause(2000);
    // });
    //
    // it("13 - Allow chargedUp to access photos, media and other files", function(done) {
    //     browser.click("//android.widget.Button[@text='ALLOW']");
    //     browser.pause(1000);
    //     browser.click("//android.widget.Button[@text='ALLOW']");
    //     console.log('Access to device authorized by the user');
    // });
    //
    // it("14 - Verify label - scan QR code", function(done) {
    //     var ScanCode = browser.getText("//android.widget.TextView[@text='You can find QR code here']");
    //     expect(ScanCode).to.equal('You can find QR code here');
    // });
    //
    // it("15 Verify label - No QR code detected", function(done) {
    //     var NoCodeDetected = browser.getText("//android.widget.TextView[@text='No QR code detected']");
    //     NoCodeDetected.should.equal('No QR code detected');
    // });
    //
    // it("16 - Enter incorrect station ID", function(done) {
    //     browser.click("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.LinearLayout[3]/android.widget.LinearLayout/android.widget.ImageView[1]");  //works
    //     browser.setValue("//android.widget.EditText[@text='Enter Station ID']", '555006');
    //     browser.click("//android.widget.TextView[@text='UNLOCK']");
    //     browser.pause(1000);
    //     var StationID = browser.getText("//android.widget.TextView[@text='Confirm station ID?']");
    //     console.log(StationID);
    //     StationID.should.equal('Confirm station ID?');
    //
    // });
    //
    // it("17 - Error message displayed - station not found", function(done) {
    //     browser.click("//android.widget.Button[@text='YES']");
    //     var error = browser.getText("//android.widget.TextView[@text='Station 555006 not found']");
    //     expect(error).to.equal('Station 555006 not found');
    // });
    //
    // it("18 - Re-enter station ID and select NO to confirm station ID", function(done) {
    //     browser.setValue("//android.widget.EditText[@text='555006']", '7777');
    //     browser.click("//android.widget.TextView[@text='UNLOCK']");
    //     browser.click("//android.widget.Button[@text='NO']");
    // });
    //
    // it("19 - Enter correct station ID and select YES to confirm station ID", function(done) {
    //     browser.setValue("//android.widget.EditText[@text='7777']", '501476');
    //     browser.click("//android.widget.TextView[@text='UNLOCK']");
    //     browser.click("//android.widget.Button[@text='YES']");
    //     browser.pause(1000);
    // });
    //
    // it("20 - Screen loads - Displays Rental Plan", function(done) {
    //     var rentPlan = "//android.widget.TextView[@text='Choose Plan']";
    //     browser.waitForExist(rentPlan, false);
    // });
    //
    // it("21 - Swap Battery option is displayed", function(done) {
    //     var batterySwap = "//android.widget.TextView[@text='Swap past purchase']";
    //     browser.waitForExist(batterySwap, false);
    // });
    //
    // it("22 - Pay as you go rental option is displayed", function(done) {
    //     var PayAsYouGo = "//android.widget.TextView[@text='Pay as you go']";
    //     browser.waitForExist(PayAsYouGo, false);
    // });
    //
    // it("23 - 1 Day rental option is displayed", function(done) {
    //     var Day = "//android.widget.TextView[@text='1 Day']";
    //     browser.waitForExist(Day, false);
    // });
    //
    // it("24 - Payment options is displayed - for hourly and daily rentals", function(done) {
    //     var hourly_rate = browser.getText("//android.widget.TextView[@text='1 Day']");
    //     expect(hourly_rate).to.equal('1 Day');
    //
    //     var daily_charge = browser.getText("//android.widget.TextView[@text='£3']");
    //     expect(daily_charge).to.equal('£3');
    //
    //     var daily_rate = browser.getText("//android.widget.TextView[@text='/24 hours']");
    //     expect(daily_rate).to.equal('/24 hours');
    //
    //     var daily_rate = browser.getText("//android.widget.TextView[@text='Save 40%']");
    //     expect(daily_rate).to.equal('Save 40%');
    //
    //     var hourly_charge = browser.getText("//android.widget.TextView[@text='Pay as you go']");
    //     expect(hourly_charge).to.equal('Pay as you go');
    //
    //     var daily_charge = browser.getText("//android.widget.TextView[@text='£1']");
    //     expect(daily_charge).to.equal('£1');
    //
    //     var payment_type = browser.getText("//android.widget.TextView[@text='/hour']");
    //     expect(payment_type).to.equal('/hour');
    //
    // });
    //
    // it("25 - User select Pay as you go", function(done) {
    //     browser.click("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.ScrollView/android.view.ViewGroup/android.widget.FrameLayout[2]/android.view.ViewGroup/android.widget.ImageView\n");
    // });
    //
    // it("26 - User taps Next button", function(done) {
    //     // browser.click("//android.widget.Button[@text='LET\'S\ GO']");
    //     browser.click("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.Button\n");
    //     browser.pause(5000);
    // });


});
