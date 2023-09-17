const { readFile, writeFile } = require('./fileUtils');
const {generateLineSeriesData} = require('./lineSeriesUtils');

// Define the start and end times in ISO format
const startTimeISO = '2023-09-10T00:00:00Z';
const endTimeISO = '2023-09-13T00:00:00Z';

(async () => {
    try {
        const data = await readFile('weather.json');
        const weatherData = JSON.parse(data);
        const dataOutput = generateLineSeriesData(weatherData, startTimeISO, endTimeISO);
        await writeFile('output.json', dataOutput);

        console.log('File written successfully');
    } catch (err) {
        console.error('Error in processing:', err);
    }
})();