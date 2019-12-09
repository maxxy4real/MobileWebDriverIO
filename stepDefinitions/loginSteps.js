const cucumber = require('cucumber');

    Given(/^I am on home screen$/, function(done) {
        const title = browser.getText('android.widget.TextView');
         expect(title).to.equal('100% green electricity');
         browser.pause(2000);
    });

it("I tap the NEXT button", function(done) {
    browser.click("//android.widget.Button[@text='NEXT']");
    browser.click("//android.widget.Button[@text='ALLOW']");
    expect("Discover deals", browser.isExisting("//android.widget.TextView[@text='Discover deals']"));
    browser.click("//android.widget.Button[@text='GOT IT!']");
    browser.click("//android.widget.Button[@text='ALLOW']");
});