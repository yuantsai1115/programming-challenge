# Weather Data Transformation Project

## Description

This project is aimed at transforming and plotting weather data across a 72-hour period for multiple GPS locations. It reads data from a JSON file, processes it to include null values for missing data points over the specified period, and then exports the transformed data to a new JSON file. The resultant data can be utilized to generate line-series charts or for other data analysis tasks.

## Features

- Read input data from a `.json` file.
- Generate a complete set of data points for a period, including missing data points represented as null values.
- Supports multiple GPS locations.
- Export the transformed data to a new `.json` file.

## Requirements

- Node.js

## Setup

1. Install [Node.js](https://nodejs.org/) if not already installed.
2. Clone the repository or download the source code.
3. Navigate to the project directory in the terminal.
4. Run the command `node index.js` to execute the script.

## Usage

1. Place your input JSON file with the weather data in the project directory and name it 'weather.json'.
2. Run the script using the command `node index.js`.
3. Find the transformed data in the 'output.json' file in the project directory.

### Input File Format

The input JSON file should adhere to the following structure:

```json
{
  "location_1": {
    "name": "Location Name 1",
    "lat": "latitude",
    "lon": "longitude",
    "timezone": "timezone",
    "timezone_offset": "timezone_offset",
    "current": {
      ... // current weather data
    },
    "hourly": [
      ... // hourly weather data
    ]
  },
  "location_2": {
    ... // similar structure as location_1
  },
  ... // more locations
}

### Output File Format

The output JSON file will have the following structure:

```json
{
  "location_1": [
    {
      "timestamp": "ISO date formatted string",
      "wind_speed": "wind speed in m/s or null",
      "temperature": "temperature in °C or null",
      "pressure": "atmospheric pressure or null",
      "humidity": "humidity percentage or null"
    },
    ... // more data points
  ],
  "location_2": [
    ... // similar structure as location_1
  ],
  ... // more locations
}
