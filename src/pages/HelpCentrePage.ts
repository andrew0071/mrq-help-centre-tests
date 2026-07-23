import { expect, Locator, Page } from "@playwright/test";
import { StringHelper } from "../helpers/stringHelper";

export class HelpCentrePage {
  private readonly page: Page;
  private readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchInput = page.getByRole("textbox", {name: "Search for articles..."});
  }

  async openHomepage(): Promise<void> {
    const baseUrl =process.env.BASE_URL ?? "https://help.mrq.com/en/";

    await this.page.goto(baseUrl);
  }

  async searchFor(searchTerm: string): Promise<void> {
    await this.searchInput.fill(searchTerm);
  }

  async verifyRelevantResults(): Promise<void> {
    const searchResults = this.page.getByRole("link");

    await expect(searchResults.first(),"Expected at least one search result to be visible").toBeVisible();

    const visibleResultCount = await searchResults.count();

    expect(visibleResultCount,"Expected at least one search result").toBeGreaterThan(0);
  }

  async openArticle(articleName: string): Promise<void> {
    const articleLink = this.page.locator("a").filter({ hasText: articleName }).first();

    await articleLink.waitFor({ state: "visible" });
    await articleLink.click();
  }

  async verifyArticleHeading(expectedHeading: string): Promise<void> {
    await expect(this.page.getByRole("heading", {name: expectedHeading,exact: true}),`Expected article heading "${expectedHeading}" to be visible`).toBeVisible();
  }

  async openArticleDirectly(articleName: string): Promise<void> {
    await this.openHomepage();
    await this.searchFor(articleName);
    await this.openArticle(articleName);
    await this.verifyArticleHeading(articleName);
  }

  async selectArticleSection(sectionName: string): Promise<void> {
    await this.page.getByRole("link", {name: sectionName,exact: true}).click();
  }

  async verifyAllArticleNavigationLinks(): Promise<void> {
    const tocBody = this.page.locator('[data-testid="toc-body"]:visible');

    await tocBody.waitFor({ state: "visible" });

    const navigationLinks = tocBody.locator("a");
    const linkCount = await navigationLinks.count();

    expect(linkCount,"Expected exactly four article navigation links").toBe(4);

    for (let index = 0; index < linkCount; index++) {
      const link = navigationLinks.nth(index);

      const linkText = (await link.innerText()).trim();
      const href = await link.getAttribute("href");

      if (!href) {throw new Error(`Navigation link "${linkText}" has no href`);}

      expect(href,`Navigation link "${linkText}" should contain a section hash`).toMatch(/^#/);

      console.log(`Checking navigation link ${index + 1}/${linkCount}: ${linkText}`);

      await link.scrollIntoViewIfNeeded();
      await link.click();

      await expect.poll(() => new URL(this.page.url()).hash,{message: `Expected URL hash to update to "${href}" after clicking "${linkText}"`}).toBe(href);

      const targetId = href.substring(1);

      const targetSection = this.page.locator(`[id="${StringHelper.escapeRegExp(targetId)}"]`);

      await expect(targetSection,`Expected target section "${targetId}" to exist`).toHaveCount(1);

      await expect(targetSection,`Expected "${linkText}" to scroll into view`).toBeInViewport();

    }
  }

  async verifyArticleSections(expectedSections: string[]): Promise<void> {
    for (const sectionName of expectedSections) {
      const sectionHeading = this.page.getByRole("heading", {name: sectionName,exact: true});

      await expect(sectionHeading,`Expected article section "${sectionName}" to be displayed`).toBeVisible();
    }
  }

  async openCategory(categoryName: string): Promise<void> {
    await this.page.getByRole("link", {name: new RegExp(`^${StringHelper.escapeRegExp(categoryName)}`)}).click();
  }

  async openCategoryArticle(articleName: string): Promise<void> {
    await this.page.getByRole("link", {name: articleName,exact: true}).click();
  }

  async navigateBackToCategory(): Promise<void> {
    await this.page.getByTestId("breadcrumb-0").click();
  }
}