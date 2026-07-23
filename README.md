# Installation

Clone the repository:

```bash
git clone https://github.com/andrew0071/mrq-playwright-framework.git
cd mrq-playwright-framework
```

Install dependencies:

```bash
npm install
```

---

# Configuration

Create a `.env` file in the project root (or copy `.env.example`):

```text
BROWSERSTACK_USERNAME=your_username
BROWSERSTACK_ACCESS_KEY=your_access_key
TEST_ENV=local
HEADLESS=true
```

---

# Running Tests

## Run locally

Execute the registration journey locally using Playwright:

```bash
npm run test:registration
```

---

## Run against BrowserStack

Execute the same test remotely on BrowserStack:

```bash
npm run test:browserstack
```

---

## Tagged execution

Run only the registration tests:

```bash
npm run test:browserstack:registration
```

Run the smoke suite:

```bash
npm run test:browserstack:smoke
```

---

# Test Reports

After execution, an HTML report is generated containing:

- Scenario results
- Execution time
- Embedded screenshots
- Step-by-step execution details

---

# Project Structure

```
config/
features/
src/
├── hooks/
├── pages/
├── step-definitions/
├── support/
└── utils/
```

---

# Framework Design

The framework has been built using modern automation design principles:

- Playwright + TypeScript
- Cucumber (BDD)
- Page Object Model
- Browser Factory pattern
- BrowserStack integration
- Randomised test data
- Stable locator strategy (`data-test-id` where available)
- Thin step definitions
- HTML reporting with screenshots

---

# Current Automated Journey

The current automation covers the MrQ registration journey:

1. Open homepage
2. Click **Join Now**
3. Complete Account Details
4. Complete Personal Details
5. Reach the final confirmation page
6. Select required checkboxes
7. Verify the **Complete Signup** button becomes enabled

The test deliberately **does not click Complete Signup**, ensuring no account is created.