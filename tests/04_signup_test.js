var request = require("request");
var home_page = require("../pages/home_page.js");
var login_page = require("../pages/login_page.js");
var faker = require("faker");

beforeEach(function () {
    browser.timeouts('implicit', 3000);
})

before(function (done) {
    browser.reset();
})


describe("04 - Sign Up Test", function() {

    // var randomNumber = faker.random.number(1000);
    var randomFirstName = faker.random.first_name();
    var randomLastName = faker.random.last_name();
    var randomPrefixName = faker.random.name_prefix();
    var fName = randomFirstName;

    var userID;
    var userSessionToken;

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
    });

    it("04 - Enter a New Number", function(done) {
        browser.click("//android.widget.TextView[@text='+44']");
        browser.click("//android.widget.TextView[@text='Canada']");
        browser.click("#ed_mob_no");
        browser.setValue("#ed_mob_no", '5005550007');
        browser.hideDeviceKeyboard(); // taps outside to hide keyboard per default
        //browser.hideDeviceKeyboard('tapOutside');
        browser.click("//android.widget.Button[@text='LOG IN']");
        browser.pause(5000);
    });

    it("05 - Backend checks and Detects New Number", function(done) {
        var msg_new_number = browser.getText("#snackbar_text");
        console.log(msg_new_number);
        msg_new_number.should.equal('No account found for this number, please sign up providing your name and accepting our Terms');
        browser.pause(3000);
    });

    it("06 - Enter New User Full Name", function(done) {
        // var fName = randomFirstName;
        console.log(fName);
        console.log(randomLastName);
        browser.click("#ed_full_name");
        browser.setValue("#ed_full_name", randomPrefixName+' '+fName+' '+randomLastName);
        browser.hideDeviceKeyboard(); // taps outside to hide keyboard per default
        browser.click("#accept_policy_checkbox");
        browser.click("#btn_sign_up");
        browser.pause(1000);
    });

    it("07 - Enter SMS verification code", function(done) {
        browser.setValue("#ed_otp_1", '666666');
        browser.click("//android.widget.Button[@text='NEXT']");
        // browser.pause(3000);
    });

    it("08 - User sees notification - which network are you on?", function(done) {
        browser.isVisible("//android.widget.TextView[@text='Which network are you on?']");
        browser.isVisible("//android.widget.TextView[@text='We need to know your mobile network to show you relevant offers.']");
        browser.click("//android.widget.Button[@text='ALLOW MOBILE ACCESS']");
        browser.pause(2000);
    });

    it("09 - Allow ChargedUp to make and manage phone calls?", function(done) {
        browser.click("//android.widget.Button[@text='Allow']");
        // browser.click("#permission_allow_button");
    });

    it("10 - Find Charging Station", function(done) {
        console.log('Unlock Battery Test Started');
        browser.click("//android.widget.Button[@text='RENT BATTERY NOW']");
        browser.pause(2000);
    });

    it("11 - I see O2 priority rental ", function(done) {
        var msg1 = browser.getText("#o2LabelHeader");
        console.log(msg1);
        expect(msg1).to.equal('Your first hour rental is free every day.');

        var msg2 = browser.getText("//android.widget.TextView[@text='Find your nearest rental station']");
        console.log(msg2);
        expect(msg2).to.equal('Find your nearest rental station');

        var msg3 = browser.getText("//android.widget.TextView[@text='Scan its QR code to unlock a battery']");
        console.log(msg3);
        expect(msg3).to.equal('Scan its QR code to unlock a battery');

        var msg4 = browser.getText("//android.widget.TextView[@text='Plug in your phone using the cables provided and charge on the go']");
        console.log(msg4);
        expect(msg4).to.equal('Plug in your phone using the cables provided and charge on the go');

        var msg5 = browser.getText("//android.widget.TextView[@text='Return to any station in our map']");
        console.log(msg5);
        expect(msg5).to.equal('Return to any station in our map');

        var msg6 = browser.getText("#o2Subtext");
        console.log(msg6);
        expect(msg6).to.equal('Return your battery within the first hour or pay for the extra usage.');

        var msg7 = browser.getText("//android.widget.TextView[@text='Daily credit expires at midnight.']");
        console.log(msg7);
        expect(msg7).to.equal('Daily credit expires at midnight.');

        browser.click("#nextStepButton");

    });

    it("12 - Allow chargedUp to access photos, media and other files", function(done) {
        browser.click("//android.widget.Button[@text='Allow']");
        browser.pause(5000);
    });

    it('13 - Screenshot of the map showing stations', function () {
        browser.saveScreenshot('./screenshots/map_stations.png');
    });

    it("14 - Enter incorrect station ID", function(done) {
        browser.click("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.LinearLayout[3]/android.widget.LinearLayout/android.widget.ImageView[1]");  //works
        browser.setValue("#txt_code", '555006');
        browser.click("//android.widget.TextView[@text='UNLOCK']");
        browser.pause(1000);
        var StationID = browser.getText("//android.widget.TextView[@text='Confirm station ID?']");
        console.log(StationID);
        StationID.should.equal('Confirm station ID?');
    });

    it("15 - Error message displayed - station not found", function(done) {
        browser.click("//android.widget.Button[@text='YES']");
        var error = browser.getText("//android.widget.TextView[@text='Station not found']");
        expect(error).to.equal('Station not found');
    });

    it("16 - Re-enter station ID and select NO to confirm station ID", function(done) {
        browser.setValue("#txt_code", '7777');
        browser.click("//android.widget.TextView[@text='UNLOCK']");
        browser.click("//android.widget.Button[@text='NO']");
    });

    it("17 - Enter correct station ID and select YES to confirm station ID", function(done) {
        // browser.setValue("#txt_code", '75313');
        // browser.click("//android.widget.TextView[@text='UNLOCK']");
        // browser.click("//android.widget.Button[@text='YES']");
        // browser.pause(2000);

        browser.setValue("#txt_code", '501476');
        browser.click("//android.widget.TextView[@text='UNLOCK']");
        browser.click("//android.widget.Button[@text='YES']");
        browser.pause(2000);
    });

    it("18 - Pay as you go rental option is displayed", function(done) {
        var PayAsYouGo = "//android.widget.TextView[@text='Pay as you go']";
        browser.waitForExist(PayAsYouGo, false);
    });

    it("19 - 1 Day rental option is displayed", function(done) {
        var Day = "//android.widget.TextView[@text='1 Day']";
        browser.waitForExist(Day, false);
    });

    it("20 - Payment options is displayed - for hourly and daily rentals", function(done) {
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

    it("21 - User select Pay as you go", function(done) {
        browser.click("#payAsYouGoSelector");
    });

    it("22 - User taps Next button", function(done) {
        browser.click("#nextButton");
        browser.pause(3000);
    });

    it("23 - User select Card Payment", function(done) {
        browser.click("#addCardIV");
    });

    it("24 - Enter Name as shown on the card", function(done) {
        browser.setValue("#nameAsShowOnCardET", randomPrefixName+' '+fName+' '+randomLastName);
    });

    it("25 - Enter Card Number as shown on the card", function(done) {
        browser.setValue("#cardNumberET", '4242424242424242');
    });

    it("26 - Enter Expiry date", function(done) {
        browser.setValue("#expiryDateET", '11/2025');
    });

    it("27 - Enter CVV date", function(done) {
        browser.setValue("#cvcCvvET", '344');
    });
    //
    it("28 - Check box - accept", function(done) {
        browser.click("#acceptSavingCardCB");
    });

    it("29 - User click Set up", function(done) {
        browser.click("#nextButton");
        browser.pause(12000);
    });

    // it("30 - Battery is released to user", function(done) {
    //     browser.click("#done");
    // });
    //
    // it("31 - Forgot to return Battery? Keep the Battery more than 90 days? £30", function(done) {
    //     browser.isVisible("//android.widget.TextView[@text='Forgot to return your battery?']");
    //     browser.isVisible("//android.widget.TextView[@text='We cap your spending daily, no stress']");
    //     browser.isVisible("//android.widget.TextView[@text='We need to know your mobile network to show you relevant offers.']");
    // });
    //
    // it("32 - User close the forgot to return Battery screen", function(done) {
    //     browser.click("#autoBuycloseIV");
    // });
    //
    // it("33 - Current time rental is displayed to user", function(done) {
    //     var time_rental = browser.getText("//android.widget.TextView[@text='Current Rental Time']");
    //     expect(time_rental).to.equal('Current Rental Time');
    // });
    //
    // it("34 - User taps RETURN", function(done) {
    //     browser.click("//android.widget.TextView[@text='RETURN']");
    // });
    //
    // it("35 - User see How to return in 2 steps", function(done) {
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
    // it("36 - User Swipe to the right and verify information in step 2", function(done) {
    //     browser.click("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/androidx.drawerlayout.widget.DrawerLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout[1]/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.RelativeLayout[2]/android.widget.ImageView\n");
    //     browser.pause(2000);
    //
    //     var return_battery = "//android.widget.Button[@text='GOT IT!']";
    //     browser.waitForExist(return_battery, false);
    //
    //     var time_rental = "//android.widget.TextView[@text='Chat with us']";
    //     browser.waitForExist(time_rental, false);
    // });
    //
    // it("37 - User taps GOT IT Button", function(done) {
    //     browser.click("//android.widget.Button[@text='GOT IT!']");
    //     browser.pause(2000);
    // });
    //
    // it("38 - User verifies the timer on the map", function(done) {
    //     var top_timer_rental = "#timer_top";
    //     browser.waitForExist(top_timer_rental, false);
    // });
    //
    // it("39 - User verifies the Referesh Map button on the map", function(done) {
    //     var refresh_Btn = "#refreshBtn";
    //     browser.waitForExist(refresh_Btn, false);
    //
    // });
    //
    // it("40 - User verifies the Rent Timer Count", function(done) {
    //     var rent_timer = "#rent_timer_bg";
    //     browser.waitForExist(rent_timer, false);
    // });
    //
    // it("41 - And I tap the NAV Icon", function(done) {
    //     browser.click("#nav_icon");
    // });
    //
    // it("42 - And I tap the Settings", function(done) {
    //     browser.click("#nav_icon");
    //     browser.click("//android.widget.TextView[@text='Settings']");
    //     browser.pause(2000);
    // });
    //
    // it("43 - And I tap Sign Out", function(done) {
    //     browser.click("//android.widget.Button[@text='SIGN OUT']");
    //     browser.pause(1000);
    // });
    //
    // it("44 - And User is Logged Out", function(done) {
    //     browser.click("//android.widget.Button[@text='SIGN OUT']");
    // });

    it("45 - Delete user via API", function(done) {
        // Sign In Request
        var options = { method: 'POST',
            // url: 'https://api-v2-pre.dev.chargedup.systems/users/login',
            url: 'https://api-v2.prod.chargedup.systems/users/login',
            headers:
                // {'x-api-key': '2fec19e4-f911-4882-bce5-2824bf59aa49',
                {'x-api-key': 'a73644c1-c3f6-4f75-bfc9-59c28808bc36',
                    'content-type': 'application/json' },
            body: { mobileNumber: '5005550007', countryCode: '+1', code: '666666' },
            json: true };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);

            userSessionToken = body.userSessionToken;
            userID = body.id;

            console.log(userSessionToken);
            console.log(userID);

            var options = { method: 'DELETE',
                // url: 'https://api-v2-pre.dev.chargedup.systems/users/'+userID,
                url: 'https://api-v2.prod.chargedup.systems/users/'+userID,
                headers:
                    {authorization: 'Bearer '+userSessionToken,
                        // 'x-api-key': '2fec19e4-f911-4882-bce5-2824bf59aa49',
                        'x-api-key': 'a73644c1-c3f6-4f75-bfc9-59c28808bc36',
                        'content-type': 'application/json' } };

            request(options, function (error, response, body) {
                if (error) throw new Error(error);

                console.log(body);

            });

        });

    });

});
