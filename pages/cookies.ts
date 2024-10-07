import { BrowserContext } from '@playwright/test';

export class Cookies {
    context: BrowserContext;

    constructor(context: BrowserContext){
        this.context = context;
    }

    async deleteAddEventCookies(){
        await this.context.clearCookies({ domain: 'app.addevent.com' });
        await this.context.clearCookies({ domain: '.addevent.com' });
    }
}