import { defineConfig } from "@playwright/test";
import { HelperFunctions } from "./pages/helperFunctions";

const helpers = new HelperFunctions();

export default defineConfig({
	use: {
		headless: false,
	},
	timeout: 10000
});

export interface Secrets {
    email: string;
    password: string;
    calendarId: string;
}

export function globalSetup() {
    return helpers.readJsonFile('secrets.json') as Secrets;
}