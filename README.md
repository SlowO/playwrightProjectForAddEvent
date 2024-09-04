# Hi!

## This is a *basic* Playwright project in TypeScript for AddEvent's app.

### Follow these steps to run the tests:

1. Clone the repo.
2. Create a 'secrets.json' file in the project directory with your production's "hobby" credentials:
```
{
  "email": "<your_email>",
  "password": "<your_password>",
  "calendarId": "<your_calendar_id>"
}
```
3. Run all the tests (defaulted to headless)
```
npx playwright test
```
- In headed mode:
```
npx playwright test --headed
```
- See [running-tests docs](https://playwright.dev/docs/running-tests) for more options.

## Note:
- The tests might fail due to the captcha on the sign in page.
- The SignIn tests use screenshot comparison. If screenshots are missing, initial runs will generate reference screenshots, which will be used for subsequent comparisons.
See [test-snapshots docs](https://playwright.dev/docs/test-snapshots) for more details.
