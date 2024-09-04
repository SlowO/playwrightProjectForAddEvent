import { Page, Locator } from '@playwright/test';

export class EventViewPage {
    page: Page;
    readonly eventTitle: Locator;
    readonly eventDate: Locator;
    readonly eventId: Locator;
    readonly eventPageUrl: Locator;

    constructor(page: Page){
        this.page = page;

        // Elements
        this.eventTitle = page.locator('#anchor-details p');
        this.eventDate = page.locator('.dat-t1 p');
        this.eventId = page.locator('#eidt3');
        this.eventPageUrl = page.getByText('Event page', { exact: true }).locator('~ input');
    }

    async getEventTitleString(){
        return await this.eventTitle.textContent() as string;
    }

    async getEventDateString(){
        return await this.eventDate.textContent() as string;
    }

    async getEventIdString(){
        return await this.eventId.textContent() as string;
    }

    async getEventPageUrlString(){
        return await this.eventPageUrl.getAttribute('value') as string;
    }
}