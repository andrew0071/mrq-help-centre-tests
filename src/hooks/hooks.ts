import "dotenv/config";

import {
  After,
  Before,
  setDefaultTimeout
} from "@cucumber/cucumber";

import {
  chromium,
  firefox,
  webkit
} from "playwright";

import { CustomWorld } from "../support/CustomWorld";

setDefaultTimeout(30_000);

Before(async function (
  this: CustomWorld
): Promise<void> {
  const browserName = (
    process.env.BROWSER ?? "chromium"
  ).toLowerCase();

  const headless =
    process.env.HEADLESS !== "false";

  const browserType =
    browserName === "firefox"
      ? firefox
      : browserName === "webkit"
        ? webkit
        : chromium;

  this.browser = await browserType.launch({
    headless
  });

  this.context = await this.browser.newContext({
    viewport: {
      width: 1440,
      height: 900
    },
    locale: "en-GB"
  });

  this.page = await this.context.newPage();

  this.page.setDefaultTimeout(15_000);
  this.page.setDefaultNavigationTimeout(30_000);
});

After(async function (
  this: CustomWorld
): Promise<void> {
  await this.context?.close();
  await this.browser?.close();
});