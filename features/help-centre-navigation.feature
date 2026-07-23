@smoke
Feature: MrQ Help Centre navigation

  Scenario: Every article navigation link scrolls to the correct section
    Given I am viewing the "Withdrawals: How They Work" article
    Then every article navigation link should scroll to the correct section

  Scenario: Browse articles using category navigation
    Given I am on the MrQ Help Centre homepage
    When I open the "Getting Started" category
    And I open the "Creating an account" article
    And I navigate back to the category using the breadcrumb
    And I open the "Welcome offer" article
    Then the article heading should be "Welcome offer"