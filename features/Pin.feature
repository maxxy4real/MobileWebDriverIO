Feature: PIN

  @PIN
  Scenario: PIN Verification
    Given I am on home screen
    And I logged in successfully
    When I enter an incorrect 6-digit code
    And I tap the Sign In button
    Then I see error message "Verification failed: status is pending, valid is false"

  See Screenshot

  @PIN
  Scenario: PIN Verification
    Given I am on home screen
    And I logged in successfully
    When I enter an incorrect 6-digit code multiple times
    And I tap the Sign In button
    Then I see error message "Verification failed: status is pending, valid is false"

  See Screenshot


  @PIN
  Scenario: Expired PIN code
    Given I am on home screen
    And I logged in successfully
    When I enter an expired 6 digit code
    And I tap the Sign In button
    Then ??????






