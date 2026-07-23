# MrQ Help Centre Test Automation

Automated UI tests for the MrQ Help Centre using **Playwright**, **Cucumber.js** and **TypeScript**.

---

## Technology Stack

- Playwright
- Cucumber.js
- TypeScript
- GitHub Actions
- Node.js

---

## Project Structure

```text
.
├── .github
│   └── workflows
├── features
│   ├── help-centre-search.feature
│   ├── help-centre-navigation.feature
│   └── step-definitions
│       └── help-centre.steps.ts
├── src
│   ├── helpers
│   │   └── stringHelper.ts
│   ├── hooks
│   │   └── hooks.ts
│   ├── pages
│   │   └── HelpCentrePage.ts
│   └── support
│       └── CustomWorld.ts
├── .env.example
├── package.json
└── README.md
```

---

## Design Decisions

The framework follows the **Page Object Model (POM)** to separate test logic from page interactions.

The current covers a single cohesive Help Centre experience, therefore a single `HelpCentrePage` object is used to encapsulate page interactions, selectors and assertions as the pages are the same but with different content. As the application grows, this could naturally be separated into dedicated page objects such as `HomePage`, `CategoryPage` and `ArticlePage`.

The test scenarios are organised into two feature files:

- **Help Centre Search**
- **Help Centre Navigation**

A single step definition file is used as all scenarios belong to the same functional area. This keeps related behaviour together and avoids duplicate step definitions.

Assertions are encapsulated within the page object, allowing the step definitions to remain concise and focused on business behaviour.

---

## Prerequisites

- Node.js 22 or later
- npm

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd mrq-help-centre-tests
```

Install project dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

## Environment Variables

Create a `.env` file in the project root.

Example:

```env
BASE_URL=https://help.mrq.com/en/
HEADLESS=false
BROWSER=chromium
```

Alternatively, copy the provided example:

```bash
cp .env.example .env
```

---

## Running the Tests

Run all tests:

```bash
npm test
```

Run in headed mode:

```bash
HEADLESS=false npm test
```

Run in headless mode:

```bash
HEADLESS=true npm test
```

Run the TypeScript compiler:

```bash
npx tsc --noEmit
```

---

## Test Coverage

Current automated scenarios include:

- Search for a Help Centre article
- Open an article from search results
- Verify article headings
- Verify expected article sections
- Verify article navigation links scroll to the correct section
- Browse articles using category navigation

---

## GitHub Actions

A GitHub Actions workflow is included to allow the test suite to be executed manually using **workflow_dispatch**.

The workflow:

- Checks out the repository
- Installs Node.js dependencies
- Installs Playwright browsers
- Runs the TypeScript compilation
- Executes the Cucumber test suite

---

## Future Improvements

Potential future enhancements include:

- Cross-browser execution
- Parallel test execution
- HTML reporting
- Screenshot and video capture on failure
- Additional page objects as application complexity increases
- API integration tests