Feature: Sign Up

  @SignUp
  Scenario: User Already registered
    Given I am on home screen
    And I enter Full name
    And I enter already registered valid UK number
    And I agree to Terms and Conditions
    When I tap the Sign Up button
    Then I see error message "User already exists"

  See Screenshot

  @SignUp
  Scenario: Phone Number Input Validation
    Given I am on home screen
    And I enter Full name
    And I leave the phone number input field blank
    And I agree to Terms and Conditions
    When I tap the Sign Up button
    Then I see error message "Invalid Phone Number"

  See Screenshot


  @SignUp
  Scenario: Full name Input Validation
    Given I am on home screen
    And I leave Full name input field blank
    And I enter phone number
    And I agree to Terms and Conditions
    When I tap the Sign Up button
    Then I see error message "Invalid Name"

  See Screenshot


  @SignUp
  Scenario: Incorrect Country code
    Given I am on home screen
    And I enter full name
    And I enter phone number
    When I enter incorrect country code
    And I agree to Terms and Conditions
    And I tap the Sign Up button
    Then I see error message "Invalid Phone Number"

  See Screenshot


  @SignUp
  Scenario: Enter Incomplete phone number (example - 10 digit)
    Given I am on home screen
    And I enter full name
    And I enter incomplete phone number
    And I agree to Terms and Conditions
    When I tap the LOGIN button
    Then I see error message "Invalid Phone Number, Please enter a valid phone number"

  See Screenshot

  @Login
  Scenario: Enter Incomplete phone number (example - 12 digit)
    Given I am on home screen
    And I enter full name
    And I enter incomplete phone number
    And I agree to Terms and Conditions
    When I tap the LOGIN button
    Then I see error message "Invalid Phone Number, Please enter a valid phone number"

  See Screenshot


