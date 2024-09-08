import { expect, test } from '@playwright/test';
import { SignInPage } from '../pages/signInPage';
import { Secrets, HelperFunctions } from '../pages/helperFunctions';
import { DashboardPage } from '../pages/dashboardPage';

let signIn: SignInPage;
const helpers = new HelperFunctions();

test.beforeEach('Login', async ({ page }) => {
	signIn = new SignInPage(page);
	await signIn.open();
})

test.describe('group', {
	tag: '@signIn',
}, () => {
	test.describe('Should Successfully sign in', () => {
		const accountInfo: Secrets = helpers.getSecrets();
		const testCases = [
			{ name: 'With a Hobby account', email: accountInfo.email, password: accountInfo.password, calendarId: accountInfo.calendarId },
		];
		for (const testCase of testCases) {
			test(testCase.name, async ({ page }) => {
				await signIn.signIn(testCase.email, testCase.password)
				const dashboardPage = new DashboardPage(page);
				await dashboardPage.openAllEvent();
				expect(page.url().includes(testCase.calendarId)).toBeTruthy()
			});
		}
	});

	test.describe('Should fail sign in', () => {
		const secrets: Secrets = helpers.getSecrets();
		const testCases = [
			{ name: 'Without any input', email: "", password: "", image: 'fillOutEmailPassword.png' },
			{ name: 'With invalid email format only', email: "lkaja.com", password: "", image: 'fillOutEmailPassword.png' },
			{ name: 'With unknown email and password', email: "asd@m.co", password: "re3", image: 'emailPasswordIncorrect.png' },
			{ name: 'With known email and unknown password', email: secrets.email, password: "reKI@3", image: 'emailPasswordIncorrect.png' },
			{ name: 'With invalid email and valid password', email: 'test!gmail.gnome', password: secrets.password, image: 'fillOutEmailPassword.png' },
		];
		for (const testCase of testCases) {
			test(testCase.name, async () => {
				await signIn.signIn(testCase.email, testCase.password)
				await expect(signIn.errorLocator).toHaveScreenshot(testCase.image);
			});
		}
	});
})