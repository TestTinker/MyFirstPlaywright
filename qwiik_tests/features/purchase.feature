Feature: Purchase Products from Swag Labs
This feature tests the complete purchase flow on the Swag Labs website,
  starting from login to checkout confirmation.

  @smoke
  Scenario: Successfully purchase products with valid user credentials
    When I navigate to "<url>"
    Given I enter username "<username>"
    And I enter password "<password>"
    And I click on "Login"
    Then I should verify that the URL contains "/inventory.html" 
    And I should see the page title "Products"
    And I should see Shopping Cart icon
    When I sort products by "Price (low to high)"
    And I add the following products to the cart
      | Product Names         | Quantity | Product Price |
      | Sauce Labs Onesie     |        1 | $7.99         |
      | Sauce Labs Bike Light |        1 | $9.99         |
    And I click on "Shopping Cart"
    Then I should see the page title "Your Cart"
    And I should see all products added to the cart with the details below
      | Product Names         | Quantity | Product Price |
      | Sauce Labs Onesie     |        1 | $7.99         |
      | Sauce Labs Bike Light |        1 | $9.99         |
    When I click on "Checkout"
    Then I should see the page title "Checkout: Your Information"
    And I enter the following information
      | First Name | Last Name                   | Zip   |
      | Qwiik      | Digital Logistics Solutions | 62311 |
    And I click on "Continue"
    Then I should see the page title "Checkout: Overview"
    And I should see all products added to the cart with the details below
      | Product Names         | Quantity | Product Price |
      | Sauce Labs Onesie     |        1 | $7.99         |
      | Sauce Labs Bike Light |        1 | $9.99         |
    And I should see "Payment Information" is successfully generated
    And I should see "Shipping Information" is successfully generated
    And the price total should match the following details
      | Item total | Tax   | Total  |
      | $17.98     | $1.44 | $19.42 |
    When I click on "Finish"
    Then I should see the header message "Thank you for your order!"
    And I should see the text message "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    And I should see the button Back Home

    Examples:
      | url                        | username      | password     |
      | https://www.saucedemo.com/ | standard_user | secret_sauce |
