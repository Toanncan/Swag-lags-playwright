# Swag Labs Playwright

Automation test project for [Sauce Demo](https://www.saucedemo.com/) using Playwright, TypeScript, Page Object Model, Excel test data, and Allure Report.

## Tech Stack

- Playwright Test
- TypeScript
- Page Object Model
- Allure Report
- Excel data-driven testing with `xlsx`
- GitHub Actions CI

## Project Structure

```text
.
|-- .github/workflows/      # GitHub Actions workflow
|-- fixtures/               # Custom Playwright fixtures
|-- playwright/.auth/       # Generated login storage state
|-- src/pages/              # Page Object classes
|-- test-data/              # Excel test data
|-- tests/                  # Test specs and setup
|-- utils/                  # Helpers and Excel reader
|-- playwright.config.ts    # Playwright configuration
|-- package.json
`-- tsconfig.json
```

## Prerequisites

- Node.js 20+
- npm

## Installation

```bash
npm ci
```

Install Playwright browser dependencies:

```bash
npx playwright install --with-deps chromium
```

On Windows local machine, you can use:

```bash
npx playwright install chromium
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/Login.spec.ts
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run with Playwright UI mode:

```bash
npx playwright test --ui
```

## Reports

This project is configured to generate Allure results in `allure-results`.

Generate Allure report:

```bash
npx allure generate allure-results --clean -o allure-report
```

Open Allure report:

```bash
npx allure open allure-report
```

Open Playwright HTML report:

```bash
npx playwright show-report
```

## Test Data

Test data is stored in:

```text
test-data/Data.xlsx
```

Example usage:

```ts
const usersLogin = readExcel("Data.xlsx", "Login");
```

## Authentication Setup

The setup project runs `tests/auth.setup.ts` and saves authenticated browser state to:

```text
playwright/.auth/user.json
```

This file is generated during test execution and should not be committed.

## CI

GitHub Actions workflow is located at:

```text
.github/workflows/playwright.yml
```

The workflow installs dependencies, installs Playwright browser dependencies, runs the regression suite, generates Allure report, and uploads test artifacts even when tests fail.

## Ignored Files

The following generated files are ignored by Git:

```text
node_modules/
allure-results/
allure-report/
test-results/
.env
playwright/.auth/
```
