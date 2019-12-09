Feature: Add Payment

  @PaymentCard
  Scenario: Add Payment - Expired Card
    Given I am on home screen
    And I logged in successfully
    And I click the NAV Icon
    And I tap on Payments and Add Payment Method
    When I enter card details with an expired date
    And I tap ADD CARD button
    Then I see error message

  See Screenshot


  @PaymentCard
  Scenario: Add Payment - Wrong CVV
    Given I am on home screen
    And I logged in successfully
    And I click the NAV Icon
    And I tap on Payments and Add Payment Method
    When I enter card details with a wrong CVV
    And I tap ADD CARD button
    Then I see error message

  See Screenshot


  @Promocode
  Scenario: Add Wrong Promo Code
    Given I am on home screen
    And I logged in successfully
    And I click the NAV Icon
    And I tap on Redeem Code and enter Promo Code
    When I enter wrong promo code
    And I tap REDEEM button
    Then I see error message

  See Screenshot

  @RentalHistory
  Scenario: No Rental History
    Given I am on home screen
    And I logged in successfully
    And I click the NAV Icon
    And I tap on Rental History
    Then I see error message - No results found

  See Screenshot


