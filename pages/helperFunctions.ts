import * as fs from 'fs';

export interface Time {
    time: Date;
    timeString: string;
    plainTimeString: string;
}

export class HelperFunctions {

    getDateFormatOptions() {
        return { month: 'short', day: 'numeric', year: 'numeric' } as Intl.DateTimeFormatOptions;
    }

    getTimeFormatOptions() {
        return { hour: 'numeric', minute: 'numeric', hour12: true, amPm: true } as Intl.DateTimeFormatOptions;
    }

    getTimeStringWithoutAmPm(timeString: string) {
        return timeString.slice(0, -3);
    }
    
    getTimeFromNow(minutesOffset: number): Time {
        const now = new Date();
        const timeFromNow: Date = new Date(now.setMinutes(now.getMinutes() + minutesOffset));

        return { 
            time: timeFromNow as Date, 
            timeString: timeFromNow.toLocaleString('en-US', this.getTimeFormatOptions()).replace(/\s/g, '').toLowerCase() as string,
            plainTimeString: this.getTimeStringWithoutAmPm(timeFromNow.toLocaleString('en-US', this.getTimeFormatOptions()))
        };
    }

    generateRandomFutureDate() {
        const now = new Date();
        const randomDaysToAdd = Math.floor(Math.random() * 365); // Adjust the range as needed
        const futureDate = new Date(now.getTime() + randomDaysToAdd * 24 * 60 * 60 * 1000);

        return futureDate.toLocaleDateString('en-US', this.getDateFormatOptions());
    }

    addDaysToDate(dateString: string | number | Date, daysToAdd: number) {
        const originalDate = new Date(dateString);
        const newDate = new Date(originalDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

        return newDate.toLocaleDateString('en-US', this.getDateFormatOptions());
    }

    readJsonFile(filePath: string): any {
        try {
            const data = fs.readFileSync(filePath, 'utf8');

            return JSON.parse(data);
        } catch (error) {
            console.error("Looks like you are missing the secrets' JSON file (secrets.json) in the project directory:", error);

            return null;
        }
    }
}