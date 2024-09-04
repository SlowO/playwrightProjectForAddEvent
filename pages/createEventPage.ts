import { Page, Locator } from '@playwright/test';

export class CreateEventPage {
    page: Page;
    readonly titleField: Locator;
    readonly internalNameField: Locator;
    readonly startDateField: Locator;
    readonly startTimeField: Locator;
    readonly endDateField: Locator;
    readonly endTimeField: Locator;
    readonly descriptionField: Locator;
    readonly locationField: Locator;
    readonly createButton: Locator;
    readonly backToDashboardLink: Locator;

    constructor(page: Page){
        this.page = page;

        // Elements
        this.titleField = page.getByPlaceholder('Title of your event');
        this.internalNameField = page.getByPlaceholder('Internal name of event (only');
        this.startDateField = page.locator('#date_start');
        this.startTimeField = page.locator('#date_start_time');
        this.endDateField = page.locator('#date_end');
        this.endTimeField = page.locator('#date_end_time');
        this.descriptionField = page.frameLocator('#eventform1 iframe').locator('body');
        this.locationField = page.getByPlaceholder('Location of your event');
        this.createButton = page.getByRole('button', { name: 'Create' });
    }

    async open(){
        await this.page.goto('https://app.addevent.com/calendars/GL816827/event/new');
    }

    async fillTitleField(title: string){
        await this.titleField.clear();
        await this.titleField.fill(title);
    }

    async fillInternalNameField(internalName: string){
        await this.internalNameField.clear();
        await this.internalNameField.fill(internalName);
    }

    async fillStartDateFieldField(startDate: string){
        await this.startDateField.clear();
        await this.startDateField.fill(startDate);
    }

    async fillStartTimeFieldField(startTime: string){
        await this.startTimeField.clear();
        await this.startTimeField.fill(startTime);
    }

    async fillEndDateFieldField(endDate: string){
        await this.endDateField.clear();
        await this.endDateField.fill(endDate);
    }

    async fillEndTimeFieldField(endTime: string){
        await this.endTimeField.clear();
        await this.endTimeField.fill(endTime);
    }

    async fillDescriptionFieldField(text: string){
        await this.descriptionField.clear();
        await this.descriptionField.fill(text);
    }

    async fillLocationFieldField(location: string){
        await this.locationField.clear();
        await this.locationField.fill(location);
    }

    async clickCreateButton(){
        await this.createButton.click();
    }

    async createBasicEventForSpecificDates(title: string, internalName: string, startDate: string, endDate: string, description: string, location: string){
        await this.fillTitleField(title);
        await this.fillInternalNameField(internalName);
        await this.fillStartDateFieldField(startDate);
        await this.fillEndDateFieldField(endDate);
        await this.fillDescriptionFieldField(description);
        await this.fillLocationFieldField(location);
        await this.clickCreateButton();
    }

    async createBasicEventForSpecificTime(title: string, internalName: string, startTime: string, endTime: string, description: string, location: string){
        await this.fillTitleField(title);
        await this.fillInternalNameField(internalName);
        await this.fillStartTimeFieldField(startTime);
        await this.fillEndTimeFieldField(endTime);
        await this.fillDescriptionFieldField(description);
        await this.fillLocationFieldField(location);
        await this.clickCreateButton();
    }
}