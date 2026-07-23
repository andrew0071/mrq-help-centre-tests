import {
  IWorldOptions,
  World,
  setWorldConstructor
} from "@cucumber/cucumber";

import {
  Browser,
  BrowserContext,
  Page
} from "playwright";

export class CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }

  getPage(): Page {
    if (!this.page) {
      throw new Error(
        "The Playwright page has not been initialised."
      );
    }

    return this.page;
  }
}

setWorldConstructor(CustomWorld);