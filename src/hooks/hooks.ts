import {
  After,
  Before,
  setDefaultTimeout,
  Status
} from "@cucumber/cucumber";

import { createBrowserSession } from "../support/browserFactory";
import { CustomWorld } from "../support/CustomWorld";

setDefaultTimeout(30_000);

Before(
  {
    timeout: 60_000
  },
  async function (
    this: CustomWorld,
    scenario
  ): Promise<void> {
    this.scenarioName = scenario.pickle.name;

    const session = await createBrowserSession();

    this.browser = session.browser;
    this.context = session.context;
    this.isBrowserStackSession = session.isBrowserStack;
    this.page = await session.context.newPage();

    this.page.setDefaultTimeout(15_000);
    this.page.setDefaultNavigationTimeout(30_000);

    this.accountCreationRequestDetected = false;

    this.page.on("request", request => {
      const method = request.method().toUpperCase();
      const url = request.url().toLowerCase();

      const looksLikeAccountCreation =
        method === "POST" &&
        (
          url.includes("register") ||
          url.includes("registration") ||
          url.includes("signup") ||
          url.includes("sign-up") ||
          url.includes("account")
        );

      if (looksLikeAccountCreation) {
        this.accountCreationRequestDetected = true;
      }
    });
  }
);

After(
  {
    timeout: 60_000
  },
  async function (
    this: CustomWorld,
    scenario
  ): Promise<void> {
    try {
      if (this.page) {
        const screenshot = await this.page.screenshot({
          fullPage: true
        });

        await this.attach(screenshot, "image/png");
      }

      if (
        this.isBrowserStackSession &&
        this.page
      ) {
        const passed =
          scenario.result?.status === Status.PASSED;

        const status = passed
          ? "passed"
          : "failed";

        const reason = passed
          ? "Cucumber scenario passed"
          : scenario.result?.message ??
            "Cucumber scenario failed";

        console.log(
          `Marking BrowserStack session as ${status}`
        );

        const response = await this.page.evaluate(
          _ => {},
          `browserstack_executor: ${JSON.stringify({
            action: "setSessionStatus",
            arguments: {
              status,
              reason
            }
          })}`
        );

        console.log(
          "BrowserStack status response:",
          response
        );
      }
    } catch (error) {
      console.error(
        "BrowserStack After hook failed:",
        error
      );

      throw error;
    } finally {
      console.log("Closing browser context");
      await this.context?.close();

      console.log("Closing browser");
      await this.browser?.close();

      console.log("BrowserStack cleanup completed");
    }
  }
);