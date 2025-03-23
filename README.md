# Ultimate QA Consulting Page Test Automation

This project contains UI automation tests for the Ultimate QA Consulting page (https://ultimateqa.com/consulting/) using Playwright and TypeScript.

## Test Scenarios

The tests cover three main areas:

1. **CTA Button Testing**: Validates that all "SCHEDULE A FREE DISCOVERY SESSION" buttons are present, properly linked, and functional.

2. **Article Section Testing**: Ensures all service sections and their content are correctly displayed.

3. **Responsive Design Testing**: Verifies that the page displays correctly across different devices and viewport sizes.

## Project Structure

```
├── cta-button.spec.ts        # CTA button tests
├── article-sections.spec.ts  # Article section tests
├── responsive-design.spec.ts # Responsive design tests
├── playwright.config.ts      # Playwright configuration
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## Requirements

- Node.js 16+
- npm or yarn

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests with browser UI visible

```bash
npm run test:headed
```

### Run tests in specific browsers

```bash
# Chrome only
npm run test:chrome

# Firefox only
npm run test:firefox

# Safari only
npm run test:safari

# Mobile browsers
npm run test:mobile
```

## Test Reports

After running tests, you can view the HTML report:

```bash
npm run report
```

This will open the HTML report in your default browser.

## CI/CD Integration

The tests are configured to work in CI/CD environments. The Playwright configuration includes settings for:

- Parallel test execution
- Retries on failure in CI environments
- Screenshot capture on test failure
- HTML and list reporters for results visualization

## Notes

- The tests are designed to handle responsive behavior across different devices
- Test assertions are set up to be resilient against minor UI changes
- Proper logging is included for debugging purposes 