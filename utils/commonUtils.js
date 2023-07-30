
const faker = require('faker');
const fs = require('fs');
const path = require('path');


export class Utils {
    constructor() {
    }

    async generateRandomWordsList(minWords, maxWords) {
        const randomWordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
        const randomWordsList = [];
        for (let i = 0; i < randomWordCount; i++) {
            randomWordsList.push(faker.random.word());
        }
        return randomWordsList;
    }

    async generateRandomEmail() {
        const randomString = Math.random().toString(36).substring(7); // Generate a random string
        const randomNum = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
        const email = `example${randomString}${randomNum}@gmail.com`; // Combine the random string and number with a domain
        return email;
    }

    async createReportDirectory() {
        const projectDirectory = path.join(__dirname, '..');
        const directoryPath = path.join(projectDirectory, 'TestReports');
        console.log('Directory deleted.', directoryPath);

        // Check if the directory exists
        if (fs.existsSync(directoryPath)) {
            // If the directory exists, delete it
            fs.rmdirSync(directoryPath, { recursive: true });
            console.log('Directory deleted.');
        }

        // Create a new directory
        fs.mkdirSync(directoryPath);
        return directoryPath
    }

}