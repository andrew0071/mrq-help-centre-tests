import {
  Browser,
  BrowserContext,
  chromium,
  firefox,
  webkit
} from "playwright";

export interface BrowserSession {
  browser: Browser;
  context: BrowserContext;
  isBrowserStack: boolean;
}

export async function createBrowserSession(): Promise<BrowserSession> {
  const testEnvironment = (
    process.env.TEST_ENV ?? "local"
  ).toLowerCase();

  if (testEnvironment === "browserstack") {
    return createBrowserStackSession();
  }

  return createLocalBrowserSession();
}

async function createLocalBrowserSession(): Promise<BrowserSession> {
  const browserName = (
    process.env.BROWSER ?? "chromium"
  ).toLowerCase();

  const headless = process.env.HEADLESS !== "false";

  let browser: Browser;

  switch (browserName) {
    case "firefox":
      browser = await firefox.launch({
        headless
      });
      break;

    case "webkit":
      browser = await webkit.launch({
        headless
      });
      break;

    case "chromium":
      browser = await chromium.launch({
        headless
      });
      break;

    default:
      throw new Error(
        `Unsupported local browser: ${browserName}`
      );
  }

  const context = await createBrowserContext(browser);

  return {
    browser,
    context,
    isBrowserStack: false
  };
}

async function createBrowserStackSession(): Promise<BrowserSession> {
  const username = process.env.BROWSERSTACK_USERNAME;
  const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;

  if (!username) {
    throw new Error(
      "BROWSERSTACK_USERNAME has not been configured."
    );
  }

  if (!accessKey) {
    throw new Error(
      "BROWSERSTACK_ACCESS_KEY has not been configured."
    );
  }

  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-");

  const buildName =
    process.env.BROWSERSTACK_BUILD_NAME ??
    `MrQ Registration ${timestamp}`;

  const sessionName =
    process.env.BROWSERSTACK_SESSION_NAME ??
    "MrQ registration journey";

  const capabilities = {
    os: "Windows",
    os_version: "11",
    browser: "chrome",
    browser_version: "latest",

    project: "MrQ Test Automation",
    build: buildName,
    name: sessionName,

    "browserstack.username": username,
    "browserstack.accessKey": accessKey,

    "browserstack.debug": true,
    "browserstack.video": true,
    "browserstack.console": "info",
    "browserstack.networkLogs": true,
    "browserstack.interactiveDebugging": true
  };

  console.log(`BrowserStack build: ${buildName}`);
  console.log(`BrowserStack session: ${sessionName}`);

  const wsEndpoint =
    "wss://cdp.browserstack.com/playwright" +
    `?caps=${encodeURIComponent(
      JSON.stringify(capabilities)
    )}`;

  const browser = await chromium.connect({
    wsEndpoint
  });

  const context = await createBrowserContext(browser);

  return {
    browser,
    context,
    isBrowserStack: true
  };
}

async function createBrowserContext(
  browser: Browser
): Promise<BrowserContext> {
  return browser.newContext({
    viewport: {
      width: 1440,
      height: 900
    },
    locale: "en-GB",
    timezoneId: "Europe/London",
    ignoreHTTPSErrors: false
  });
}