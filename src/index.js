const ReadFile = require('./read-file');
const weatherFileName = './src/data/weather.dat';
const footallFileName = './src/data/football.dat';

const weatherCalculator = require('./weather');
const weatherData = new ReadFile(weatherFileName);

const footballCalculator = require('./football');
const footballPromise = new ReadFile(footallFileName);

const footballOutput = (data) => {
    console.log('Football ==========');
    console.log(`The team with the smallest spread is ${data.team} with scored ${data.for} and took ${data.against}`)
    console.log('');
};

const weatherOutput = (data) => {
    console.log('Weather ==========');
    console.log(`The day ${data.day} had the smallest spread ${data.spread}`);
    console.log('');
};

weatherCalculator(weatherData, weatherOutput);
footballCalculator(footballPromise, footballOutput);
