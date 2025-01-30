import { expect, test } from '@playwright/test';
import { DashboardPage } from '../pages/dashboardPage';
import { CreateEventPage } from '../pages/createEventPage';
import { EventViewPage } from '../pages/eventViewPage';
import { HelperFunctions, Time } from '../pages/helperFunctions';

const helpers = new HelperFunctions();
let dashboardPage: DashboardPage;
let createEventPage: CreateEventPage;
let eventViewPage: EventViewPage;

const fiveMinutesAhead: Time = helpers.getTimeFromNow(5);
const tenMinutesAhead: Time = helpers.getTimeFromNow(10);
const fifteenMinutesAhead: Time = helpers.getTimeFromNow(15);
const thirtyMinutesAhead: Time = helpers.getTimeFromNow(30);
const sixtyMinutesAhead: Time = helpers.getTimeFromNow(60);

test.beforeEach('Login', async ({ page }) => {
	dashboardPage = new DashboardPage(page);
	await dashboardPage.open();
	createEventPage = new CreateEventPage(page);
	eventViewPage = new EventViewPage(page);
})

test.describe('group', {
	tag: '@createEvent',
}, () => {
	test('Add new event with random start and end dates', async ({ page }) => {
		// Verify no errors in console during test run
		const errors: Error[] = [];
		page.on("pageerror", (error) => {
			errors.push(error);
		});

		const randomFutureDate = helpers.generateRandomFutureDate();
		const endDate = helpers.addDaysToDate(randomFutureDate, Math.random() * 5);
		const title = `My Event for ${randomFutureDate} to ${endDate}`;
		const internalName = `Internal Name ${randomFutureDate}`;
		const description = `Description for ${randomFutureDate}`;
		const location = 'Locations';
		await dashboardPage.openCreateEvent();
		await createEventPage.createBasicEventForSpecificDates(title, internalName, randomFutureDate, endDate, description, location);

		const titleOnPage = await eventViewPage.getEventTitleString();
		const dateOnPage = await eventViewPage.getEventDateString();
		const eventId = await eventViewPage.getEventIdString();
		const eventLink = await eventViewPage.getEventPageUrlString();

		expect(titleOnPage.includes(title)).toBeTruthy()
		expect(dateOnPage?.includes(randomFutureDate)).toBeTruthy()
		expect(dateOnPage?.includes(endDate)).toBeTruthy()
		expect(eventLink?.includes(eventId)).toBeTruthy()
		// Assert no errors exist in console
		expect(errors).toHaveLength(0);
	});

	test.describe('Add new event with a specific time frame for today', () => {
		const testCases = [
			{ name: 'Should create with start time offset of five minute and end time of sixty minutes from current time', startTime: fiveMinutesAhead, endTime: sixtyMinutesAhead },
			{ name: 'Should create with start time offset of ten minute and end time of sixty minutes from current time', startTime: tenMinutesAhead, endTime: sixtyMinutesAhead },
			{ name: 'Should create with start time offset of fifteen minute and end time of thirty minutes from current time', startTime: fifteenMinutesAhead, endTime: thirtyMinutesAhead },
			{ name: 'Should create with start time offset of thirty minute and end time of sixty minutes from current time', startTime: thirtyMinutesAhead, endTime: sixtyMinutesAhead }
		];
		for (const testCase of testCases) {
			test(testCase.name, async () => {
				const title = `My Event for ${testCase.startTime.timeString} to ${testCase.endTime.timeString}`;
				const internalName = `Internal Name ${testCase.startTime.time}`;
				const description = `Description for ${testCase.startTime.time}`;
				const location = 'Locations';
				await dashboardPage.openCreateEvent();
				await createEventPage.createBasicEventForSpecificTime(title, internalName, testCase.startTime.timeString, testCase.endTime.timeString, description, location);

				const titleOnPage = await eventViewPage.getEventTitleString();
				const dateOnPage = await eventViewPage.getEventDateString();
				const eventId = await eventViewPage.getEventIdString();
				const eventLink = await eventViewPage.getEventPageUrlString();

				expect(titleOnPage.includes(title)).toBeTruthy()
				expect(dateOnPage?.includes(testCase.startTime.plainTimeString)).toBeTruthy()
				expect(dateOnPage?.includes(testCase.endTime.timeString)).toBeTruthy()
				expect(eventLink?.includes(eventId)).toBeTruthy()
			});
		}
	});
})