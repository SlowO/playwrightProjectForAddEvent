import { Page, Locator } from '@playwright/test';

export class SignInPage {
    page: Page;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly signInButton: Locator;

    constructor(page: Page){
        this.page = page;

        // Elements
        this.emailField = page.getByPlaceholder('E-mail');
        this.passwordField = page.getByPlaceholder('Password');
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
    }

    async open(){
        await this.page.goto('https://app.addevent.com/signin', { waitUntil: "domcontentloaded", timeout: 15000 });
    }

    async fillEmail(email: string){
        await this.emailField.click();
        await this.emailField.clear();
        await this.emailField.fill(email);
    }

    async fillPassword(password: string){
        await this.passwordField.click();
        await this.passwordField.fill(password);
    }

    async clickSignInButton(){
        await this.signInButton.click();
    }

    async signIn(email: string, password: string){
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickSignInButton();
    }
}