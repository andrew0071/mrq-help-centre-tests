import {
  expect,
  Locator,
  Page
} from "@playwright/test";

export abstract class BasePage {
  protected constructor(
    protected readonly page: Page
  ) {}

  async clickFirstVisible(
    locators: Locator[]
  ): Promise<void> {
    for (const locator of locators) {
      if (await locator.first().isVisible().catch(() => false)) {
        await locator.first().click();
        return;
      }
    }

    throw new Error(
      "None of the expected elements were visible."
    );
  }

  async expectPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/mrq\.com/i);
  }
}