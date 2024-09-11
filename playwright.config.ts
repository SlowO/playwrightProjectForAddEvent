import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 10000,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: false,
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: 'https://app.addevent.com',
    //storageState: 'storage-state.json',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  // path to the global teardown files.
  //globalTeardown: require.resolve('./global-teardown'),

  /* Configured projects according to test's needs */
  projects: [
    {
      name: 'setup event creation for hobby account',
      testMatch: /global\.setup\.hobby\.ts/,
      teardown: 'cleanup event creation for hobby account',
      use: {
        storageState: 'storage-state.json',
      },
    },
    {
      name: 'cleanup event creation for hobby account',
      testMatch: /global\.teardown\.hobby\.ts/,
      use: {
        storageState: 'storage-state.json',
      },
    },

    {
      name: 'add event hobby account > firefox',
      use: { 
        ...devices['Desktop Firefox'],
        storageState: 'storage-state.json',
       },
      testIgnore: /.*signIn.spec.ts/,
      dependencies: ['setup event creation for hobby account'],
    },

    {
      name: 'add event hobby account > chrome',
      use: { 
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        storageState: 'storage-state.json',
      },
      testIgnore: /.*signIn.spec.ts/,
      dependencies: ['setup event creation for hobby account'],
    },

    {
      name: 'add event hobby account > edge',
      use: { 
        ...devices['Desktop Edge'],
        channel: 'msedge',
        storageState: 'storage-state.json',
      },
      testIgnore: /.*signIn.spec.ts/,
      dependencies: ['setup event creation for hobby account'],
    },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*signIn.spec.ts/,
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testMatch: /.*signIn.spec.ts/,
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testMatch: /.*signIn.spec.ts/,
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
