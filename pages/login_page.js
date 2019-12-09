class login_page {
    get myloginBtn() {return $("//android.widget.Button[@text='LOG IN']");
    }

    get signInError() {return $("//android.widget.TextView[@text='Please enter your mobile number without country code - tap to change it']");
    }

    clickMyLoginBtn() {
        this.myloginBtn.click();
    }

    expectedSignInError() {
        var errorMessage = this.signInError.getText();
        console.log(errorMessage);
    }

}

module.exports = new login_page();