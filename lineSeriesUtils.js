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
            let dataPoint = createDataPoint(currentTimestamp, dataExists);
            dataOutput[location].push(dataPoint);
        }
    }
    return dataOutput;
};

const createDataPoint = (timestamp, data) => {
    return {
        timestamp: new Date(timestamp * 1000).toISOString(),
        wind_speed: data?.wind_speed ?? null,
        temperature: data?.temp ?? null,
        pressure: data?.pressure ?? null,
        humidity: data?.humidity ?? null
    };
};

module.exports = { generateLineSeriesData };