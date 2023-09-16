const fs = require('fs').promises;

const generateLineSeriesData = (weatherData, start, end) => {
    let initialTimestamp = new Date(start).getTime() / 1000;
    let endTimestamp = new Date(end).getTime() / 1000;
    const totalDataPoints = (endTimestamp - initialTimestamp) / 3600;
  
    let dataOutput = {};
    for (let location in weatherData) {
        dataOutput[location] = [];
        for (let i = 0; i < totalDataPoints; i++) {
            let currentTimestamp = initialTimestamp + (i * 3600);
    
            let dataExists = weatherData[location]?.hourly.find(item => item.dt === currentTimestamp);
            let dataPoint = {
                timestamp: new Date(currentTimestamp * 1000).toISOString(),
                wind_speed: dataExists ? dataExists.wind_speed : null,
                temperature: dataExists ? dataExists.temp : null,
                pressure: dataExists ? dataExists.pressure : null,
                humidity: dataExists ? dataExists.humidity : null
            };
            dataOutput[location].push(dataPoint);
        }
    }
    return dataOutput;
};
  
const readFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, {encoding: 'utf8'});
        return data;
    } catch (err) {
        console.error('Error reading the file:', err);
        throw err;
    }
};
  
const writeFile = async (filePath, data) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error writing the file:', err);
        throw err;
    }
};

// Define the start and end times in ISO format
const startTimeISO = '2023-09-10T00:00:00Z';
const endTimeISO = '2023-09-13T00:00:00Z';

(async () => {
    try {
        const data = await readFile('weather.json');
        const weatherData = JSON.parse(data);
        const dataOutput = await generateLineSeriesData(weatherData, startTimeISO, endTimeISO);
        await writeFile('output.json', dataOutput);

        console.log('File written successfully');
    } catch (err) {
        console.error('Error in processing:', err);
    }
})();