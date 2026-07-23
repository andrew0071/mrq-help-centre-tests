import {
  Given,
  Then,
  When,
  DataTable
} from "@cucumber/cucumber";

import { HelpCentrePage } from "../../src/pages/HelpCentrePage";
import { CustomWorld } from "../../src/support/CustomWorld";

function getHelpCentrePage(world: CustomWorld): HelpCentrePage {
  return new HelpCentrePage(world.getPage());
}

Given(
  "I am on the MrQ Help Centre homepage",
  async function (this: CustomWorld): Promise<void> {
    await getHelpCentrePage(this).openHomepage();
  }
);

When(
  "I search for {string}",
  async function (
    this: CustomWorld,
    searchTerm: string
  ): Promise<void> {
    await getHelpCentrePage(this).searchFor(searchTerm);
  }
);

Then(
  "I should see relevant search results",
  async function (this: CustomWorld): Promise<void> {
    await getHelpCentrePage(this).verifyRelevantResults();
  }
);

When(
  "I open the {string} article",
  async function (
    this: CustomWorld,
    articleName: string
  ): Promise<void> {
    await getHelpCentrePage(this).openArticle(articleName);
  }
);

Then(
  "the article heading should be {string}",
  async function (
    this: CustomWorld,
    expectedHeading: string
  ): Promise<void> {
    await getHelpCentrePage(this).verifyArticleHeading(expectedHeading);
  }
);

Given(
  "I am viewing the {string} article",
  async function (
    this: CustomWorld,
    articleName: string
  ): Promise<void> {
    await getHelpCentrePage(this).openArticleDirectly(articleName);
  }
);

Then(
  "every article navigation link should scroll to the correct section",
  async function (this: CustomWorld): Promise<void> {
    await getHelpCentrePage(this).verifyAllArticleNavigationLinks();
  }
);

Then(
  "the article should contain the following sections",
  async function (
    this: CustomWorld,
    dataTable: DataTable
  ): Promise<void> {
    const expectedSections = dataTable
      .hashes()
      .map((row) => row.Section);

    await getHelpCentrePage(this).verifyArticleSections(expectedSections);
  }
);

When(
  "I open the {string} category",
  async function (
    this: CustomWorld,
    categoryName: string
  ): Promise<void> {
    await getHelpCentrePage(this).openCategory(categoryName);
  }
);

When(
  "I navigate back to the category using the breadcrumb",
  async function (this: CustomWorld): Promise<void> {
    await getHelpCentrePage(this).navigateBackToCategory();
  }
);