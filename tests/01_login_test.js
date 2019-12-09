var home_page = require("../pages/home_page.js");
var login_page = require("../pages/login_page.js");
var request = require("request");

beforeEach(function () {
    browser.timeouts('implicit', 3000);

    // console.log('New Test has started')
})

describe("ANDROID END TO END TEST", function() {

    it("01 - Apps loads - home screen verified successfully", function(done) {
        console.log('Onboarding Test Started');
        // if (browser.isLocked) {
        //     browser.unlock();
        // } else {
        //     console.log("browser is already open");
        // }
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
        browser.setValue("#ed_mob_no", '78956734209');
        browser.click("//android.widget.Button[@text='LOG IN']");
        browser.pause(3000);
        var ExpectedSignInError = browser.getText("//android.widget.TextView[@text='The number +4478956734209 is not matching the country code provided.']");
        ExpectedSignInError.should.equal('The number +4478956734209 is not matching the country code provided.');
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

    it("07 - Enter Incorrect OTP code", function(done) {
        browser.setValue("#ed_otp_1", '578724');
        browser.click("//android.widget.Button[@text='NEXT']");
        var OTPErrorMsg1 = browser.getText("#snackbar_text");
        console.log(OTPErrorMsg1);
        // var OTPErrorMsg1 = browser.getText("#snackbar_text");
        // expect(OTPErrorMsg1).to.equal('Please double-check the code you’ve entered matches the SMS we sent you');
        // browser.pause(1000);
    });

    it("08 - Wait for Timer count down to 0Secs and Verify Resend code is enabled", function() {
        browser.waitUntil(function () {
            return browser.getText("#txt_resend_code") === 'Resend code'
            console.log(browser.getText("#txt_resend_code"));
        }, 60000, 'Expected Resend code to be enabled');
    });


    it("09 - Enter SMS verification code", function(done) {
        browser.setValue("#ed_otp_1", '666666');
        browser.click("//android.widget.Button[@text='NEXT']");
        browser.pause(1000);
    });

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

    it("12 - Rent a battery", function(done) {
        browser.click("//android.widget.Button[@text='RENT BATTERY NOW']");
        browser.pause(2000);
    });

    // it("13 - Allow chargedUp to access photos, media and other files", function(done) {
    //     browser.click("//android.widget.Button[@text='ALLOW']");
    //     browser.pause(1000);
    //     browser.click("//android.widget.Button[@text='ALLOW']");
    //     console.log('Access to device authorized by the user');
    // });

    it("14 - Verify label - scan QR code", function(done) {
        var ScanCode = browser.getText("//android.widget.TextView[@text='You can find QR code here']");
        expect(ScanCode).to.equal('You can find QR code here');
    });

    it("15 Verify label - No QR code detected", function(done) {
        var NoCodeDetected = browser.getText("//android.widget.TextView[@text='No QR code detected']");
        NoCodeDetected.should.equal('No QR code detected');
    });

    it("16 - User Close the scan camera", function(done) {
        browser.click("#imgV_close");
        browser.pause(1000);
    });

    it("16 - And I tap the NAV Icon", function(done) {
        browser.click("#nav_icon");
        browser.pause(1000);
    });

    it("16 - And I tap the Settings", function(done) {
        browser.click("#nav_icon");
        browser.click("//android.widget.TextView[@text='Settings']");
        browser.pause(1000);
    });

    it("16 - And I tap Sign Out", function(done) {
        browser.click("//android.widget.Button[@text='SIGN OUT']");
        browser.pause(3000);
    });

    it("16 - And I see Alert title - Are you sure you want to sign out", function(done) {
        var alertTitle = browser.getText("#alertTitle");
        console.log(alertTitle);
        alertTitle.should.equal('Are you sure you want to sign out?');

        var alert_msg = browser.getText("//android.widget.TextView[@text='Staying logged in will make your next rental quick and easy']");
        alert_msg.should.equal('Staying logged in will make your next rental quick and easy');

        var cancelBtn = "//android.widget.Button[@text='CANCEL']";
        browser.waitForExist(cancelBtn, false);

        var signoutBtn = "//android.widget.Button[@text='SIGN OUT']";
        browser.waitForExist(cancelBtn, false);
    });

    it("16 - And User is Logged Out", function(done) {
        browser.click("//android.widget.Button[@text='SIGN OUT']");
        browser.pause(1000);
    });


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
    //
    // it("27 - Battery is released to user", function(done) {
    //     browser.click("//android.widget.Button[@text='DONE']");
    //     // browser.pause(3000);
    // });
    //
    // it("28 - Forgot to return Battery? Keep the Battery more than 90 days? £30", function(done) {
    //     browser.isVisible("//android.widget.TextView[@text='Forgot to return your battery?']");
    //     browser.isVisible("//android.widget.TextView[@text='We cap your spending daily, no stress']");
    //     browser.isVisible("//android.widget.TextView[@text='We need to know your mobile network to show you relevant offers.']");
    // });
    //
    // it("29 - User close the forgot to return Battery screen", function(done) {
    //     browser.click("#autoBuycloseIV");
    // });
    //
    // it("30 - Current time rental is displayed to user", function(done) {
    //     var time_rental = browser.getText("//android.widget.TextView[@text='Current Rental Time']");
    //     expect(time_rental).to.equal('Current Rental Time');
    // });
    //
    // it("31 - User taps RETURN", function(done) {
    //     browser.click("//android.widget.TextView[@text='RETURN']");
    // });
    //
    //
    // it("32 - User see How to return in 2 steps", function(done) {
    //     var header = browser.getText("#header");
    //     console.log(header);
    //     expect(header).to.equal('How to return' +
    //         'in 2 steps\n');
    //     // expect(header).to.equal('How to return\n' +
    //     //     'in 2 steps\n');
    //
    //     var step1 = "//android.widget.TextView[@text='Step 1']";
    //     browser.waitForExist(step1, false);
    //
    //     var info1 = "//android.widget.TextView[@text='Return the cable into the battery']";
    //     browser.waitForExist(info1, false);
    //
    //     var return_battery = "//android.widget.Button[@text='NEXT']";
    //     browser.waitForExist(return_battery, false);
    //
    //     var time_rental = "//android.widget.TextView[@text='Chat with us']";
    //     browser.waitForExist(time_rental, false);
    // });
    //
    // it("33 - User Swipe to the right and verify information in step 2", function(done) {
    //     browser.click("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/androidx.drawerlayout.widget.DrawerLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout[1]/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout[2]/android.widget.ImageView\n");
    //     browser.pause(2000);
    //
    //     var info1 = browser.getText("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/androidx.drawerlayout.widget.DrawerLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout[1]/android.widget.RelativeLayout/androidx.viewpager.widget.ViewPager/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.TextView[2]");
    //     console.log(info1);
    //     expect(info1).to.equal('Return the battery into the station. Make sure it clicks!\n');
    //
    //     var return_battery = "//android.widget.Button[@text='GOT IT!']";
    //     browser.waitForExist(return_battery, false);
    //
    //     var time_rental = "//android.widget.TextView[@text='Chat with us']";
    //     browser.waitForExist(time_rental, false);
    // });
    //
    // it("26 - User taps GOT IT Button", function(done) {
    //     browser.click("//android.widget.Button[@text='GOT IT!']");
    //     browser.pause(2000);
    // });
    //
    // it("27 - User verifies the timer on the map", function(done) {
    //     var top_timer_rental = "#timer_top";
    //     browser.waitForExist(top_timer_rental, false);
    //
    // });
    //
    // it("27 - User verifies the Referesh Map button on the map", function(done) {
    //     var refresh_Btn = "#refreshBtn";
    //     browser.waitForExist(refresh_Btn, false);
    //
    // });
    //
    // it("27 - User verifies the Rent Timer Count", function(done) {
    //     var rent_timer = "#rent_timer_bg";
    //     browser.waitForExist(rent_timer, false);
    //
    // });
    //
    // it("27 - User taps Chat with us", function(done) {
    //     browser.click("//android.widget.TextView[@text='Chat with us']");
    // });
    //
    // it("27 - Screen opens up intercom Messaging platform", function(done) {
    //     browser.isExisting("#intercom_collapsing_team_bio");
    //
    // });
    //
    // it("27 - User closes intercom Messaging platform", function(done) {
    //     browser.click("#intercom_toolbar_close");
    //
    //     var return_battery = "//android.widget.Button[@text='GOT IT!']";
    //     browser.waitForExist(return_battery, false);
    //
    //     var time_rental = "//android.widget.TextView[@text='Chat with us']";
    //     browser.waitForExist(time_rental, false);
    // });
    // //
    // // it("28 - Keep the battery and get free swaps at station for a year!", function(done) {
    // //     var keep_battery = browser.getText("//android.widget.TextView[@text='Keep the battery and get FREE swaps at all stations for a year!']");
    // //     console.log(keep_battery);
    // //     expect(keep_battery).to.equal('Keep the battery and get FREE swaps at all stations for a year!')
    // // });
    // //


});
