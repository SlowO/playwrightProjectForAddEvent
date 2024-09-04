import { Page, Locator } from '@playwright/test';
import { globalSetup, Secrets } from '../globalSetup';

export class DashboardPage {
    private page: Page;
    readonly createLink: Locator;
    readonly createEventLink: Locator;
    readonly eventsLinksOnList: Locator;
    readonly deleteButton: Locator;
    readonly confirmDelete: Locator;
    readonly baseUrl: string = 'https://app.addevent.com/calendars/';
    private secrets: Secrets;

    constructor(page: Page){
        this.page = page;
        this.secrets = globalSetup();
        // Elements
        this.createLink = page.getByRole('link', { name: 'Create' });
        this.createEventLink = page.getByRole('link', { name: 'Event category' });
        this.eventsLinksOnList = page.locator('#allevents-list >> .myevent.clickattached');//'#allevents-list').locator('.myevent.clickattached');
        this.deleteButton = page.getByText('delete', { exact: true })//locator('.delete');
        this.confirmDelete = page.locator('#confirm-delete-opts').getByText('Confirm'); 
    }

    getDashboardUrl(){
        return this.baseUrl + this.secrets.calendarId;
    }

    async open(){
        await this.page.goto(this.getDashboardUrl());
    }

    async openAllEvent(){
        await this.page.goto(this.getDashboardUrl() + '/all-events/upcoming');
    }

    async clickCreateLink(){
        await this.page.waitForLoadState("networkidle")
        await this.createLink.click();
    }

    async clickCreateEventLink(){
        await this.createEventLink.click();
    }

    async openCreateEvent(){
        await this.clickCreateLink();
        await this.clickCreateEventLink();
    }

    async deleteAllEvents(){
        for (const li of await this.eventsLinksOnList.all()) {
            await li.click();
            await this.deleteButton.click();
            await this.confirmDelete.click();
        };
    }
}