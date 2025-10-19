@api
Feature: API Testing

  Background:
    Given I have a valid access token "7d384327c8eee7f576ee1fb490e7f22796d59bbafd6065a59bf7c76c774becd1"

  Scenario: Successfully create a new user
    When I send a request to create a new user with unique name and unique email, and following details:
      | url                                  | gender | status |
      | https://gorest.co.in/public/v2/users | female | active |
    Then the user should be created successfully
    And I save the id

  Scenario: Retrieve the created user details
    When I send a request to get the user by ID from the previous creation using base URL "https://gorest.co.in/public/v2/users"
    Then the user details should match the data from the create user step

  Scenario: Update the created user details
    When I send a request to update the user with unique name and unique email, and following details:
      | baseUrl                              | gender | status   |
      | https://gorest.co.in/public/v2/users | male   | inactive |
    Then the user should be updated successfully
    And the updated user details should match the data
