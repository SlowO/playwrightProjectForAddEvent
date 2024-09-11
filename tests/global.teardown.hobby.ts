import { test as teardown } from '@playwright/test';
import { DashboardPage } from '../pages/dashboardPage';

teardown('delete events', async ({ page }) => {
    console.log('deleting tests events');
    // Delete the events
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.openAllEvent();
    await dashboardPage.deleteAllEvents();
});