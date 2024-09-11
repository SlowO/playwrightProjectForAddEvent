import { Page, Locator } from '@playwright/test';
import { Secrets, HelperFunctions } from './helperFunctions';

export class DashboardPage {
    private page: Page;
    readonly createLink: Locator;
    readonly createEventLink: Locator;
    readonly eventsLinksOnList: Locator;
    readonly deleteButton: Locator;
    readonly confirmDelete: Locator;
    private secrets: Secrets;
    private helpers: HelperFunctions;

    constructor(page: Page) {
        this.page = page;
        this.helpers = new HelperFunctions();
        this.secrets = this.helpers.getSecrets();

        // Elements
        this.createLink = page.getByRole('link', { name: 'Create' });
        this.createEventLink = page.getByRole('link', { name: 'Event category' });
        this.eventsLinksOnList = page.locator('#allevents-list').locator('.myevent.clickattached');
        this.deleteButton = page.getByText('delete', { exact: true })
        this.confirmDelete = page.locator('#confirm-delete-opts').getByText('Confirm');
    }

    getDashboardUrl() {
        return "/calendars/" + this.secrets.calendarId;
    }

    async open() {
        await this.page.goto(this.getDashboardUrl());
        await this.page.waitForURL(`${this.getDashboardUrl()}**`);

    }

    async openAllEvent() {
        const url = this.getDashboardUrl() + '/all-events/upcoming'
        await this.page.goto(url);
        await this.page.waitForURL(url);

    }

    async clickCreateLink() {
        await this.page.waitForURL(`${this.getDashboardUrl()}**`);
        await this.createLink.click();
    }

    async clickCreateEventLink() {
        await this.createEventLink.click();
    }

    async openCreateEvent() {
        await this.clickCreateLink();
        await this.clickCreateEventLink();
    }

    async deleteAllEvents() {
        const events = await this.eventsLinksOnList.count();
        if (events > 0) {
            for (const event of await this.eventsLinksOnList.all()) {
                await event.click({ delay: 200 });
                await this.deleteButton.click();
                await this.confirmDelete.click();
            };
        }
    }
}