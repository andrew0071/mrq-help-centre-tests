@smoke
Feature: MrQ Help Centre search

  Scenario: Search and open a help article
    Given I am on the MrQ Help Centre homepage
    When I search for "withdraw"
    Then I should see relevant search results
    And I open the "Withdrawals: How They Work" article
    Then the article heading should be "Withdrawals: How They Work"

  Scenario: Withdrawals article displays the expected sections
    Given I am viewing the "Withdrawals: How They Work" article
    Then the article should contain the following sections
      | Section                                             |
      | How do I withdraw my money?                         |
      | Can I choose where my withdrawal goes?              |
      | How long does it take to receive my withdrawal?     |
      | How will my withdrawal appear on my bank statement? |