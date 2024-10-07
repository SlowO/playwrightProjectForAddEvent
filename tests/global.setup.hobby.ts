import { test as setup } from '@playwright/test';
import { HelperFunctions } from '../pages/helperFunctions';
import { SignInPage } from '../pages/signInPage';
import { DashboardPage } from '../pages/dashboardPage';
import { Cookies } from '../pages/cookies';

setup('setup authentication state', async ({ page, context }) => {
    console.log('creating new authentication state');
    const helpers = new HelperFunctions();
    const secrets = helpers.getSecrets();
    const signIn = new SignInPage(page);
	await signIn.open();
    const cookies = new Cookies(context);
    await cookies.deleteAddEventCookies();
	await signIn.signIn(secrets.email, secrets.password);
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.waitForDashboardPageToLoad();
    await page.context().storageState({ path: 'storage-state.json' });
});