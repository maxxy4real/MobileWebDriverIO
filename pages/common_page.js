class common_page {
    get loginBtn() {
        return $("//android.widget.Button[@text='LOG IN']");
    }

    get signupBtn() {
        return $("//android.widget.Button[@text='SIGN UP']");
    }

    clickLoginBtn() {
        this.loginBtn.click();
    }

    clickSignUpBtn() {
        this.signupBtn.click();
    }

}

module.exports = new common_page();