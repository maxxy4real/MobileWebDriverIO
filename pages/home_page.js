class home_page {
    get loginBtn() {return $("//android.widget.Button[@text='GET CHARGEDUP']");
    }

    get signupBtn() {return $("//android.widget.Button[@text='SIGN UP']");
    }

    clickLoginBtn() {
        this.loginBtn.click();
    }

    clickSignUpBtn() {
        this.signupBtn.click();
    }

}

module.exports = new home_page();