Feature: Login

  @Login
  Scenario: Error Message - leave form blank
    Given I am on home screen
    When I tap the LOGIN button
    Then I see error message "Invalid Phone Number, Please enter a valid phone number"

    See Screenshot


  @Login
  Scenario: Error message - Enter Invalid phone number
    Given I am on home screen
    When I tap the LOGIN button
    Then I see error message "Invalid Phone Number, Please enter a valid phone number"

  See Screenshot

  @Login
  Scenario: Error message - Enter Incomplete phone number (example - 10 digit)
    Given I am on home screen
    When I tap the LOGIN button
    Then I see error message "Invalid Phone Number, Please enter a valid phone number"

  See Screenshot

  @Login
  Scenario: Error message - Enter Incomplete phone number (example - 12 digit)
    Given I am on home screen
    When I tap the LOGIN button
    Then I see error message "Invalid Phone Number, Please enter a valid phone number"

  See Screenshot


  @Login
  Scenario: Error message - Enter a valid phone number and Incorrect country code
    Given I am on home screen
    When I tap the LOGIN button
    Then I see error message "User not found."

  See Screenshot


  @Login
  Scenario: Error message - Enter a valid phone number and valid country code
    Given I am on home screen
    When I tap the LOGIN button
    Then I see error message "User not found."

  See Screenshot