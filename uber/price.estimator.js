'use strict'

const https = require('https');
const fs = require('fs');
const path = require('path');
const filePath = `${__dirname}${path.sep}mock${path.sep}price_estimation.json`;

/*
curl -H 'Authorization: Bearer <USER_ACCESS_TOKEN>' \
     -H 'Accept-Language: en_US' \
     -H 'Content-Type: application/json' \
     'https://api.uber.com/v1.2/estimates/price?start_latitude=37.7752315&start_longitude=-122.418075&end_latitude=37.7752415&end_longitude=-122.518075'
*/

module.exports = async function getRoutePrices(params) {
  let endpoint = 'https://api.uber.com/v1.2/estimates/price?';
  let startLatitude = 37.7752315;
  let startLongitude = -122.418075;
  let endLatitude = 37.7752415;
  let endLongitude = -122.518075;
  let seatCount = 2;
  let apiResponse;
  if (process.env.TRANSPORT_COMPARATIVE_UBER_ENDPOINT !== undefined) {
    endpoint = process.env.TRANSPORT_COMPARATIVE_UBER_ENDPOINT;
  }
  if (params !== undefined) {
    if (params.startLatitude != undefined) {
      startLatitude = params.startLatitude;
    }
    if (params.startLongitude != undefined) {
      startLongitude = params.startLatitude;
    }
    if (params.endLatitude != undefined) {
      endLatitude = params.endLatitude;
    }
    if (params.endLongitude != undefined) {
      endLongitude = params.endLatitude;
    }
    if (params.seatCount != undefined) {
      seatCount = params.seatCount;
    }
  }
  let request = `${endpoint}start_latitude=${startLatitude}&start_longitude=${startLongitude}&end_latitude=${endLatitude}&end_longitude=${endLongitude}&seat_count=${seatCount}`;
  console.log(`request: ${request}`)
  if (process.env.TRANSPORT_COMPARATIVE_UBER_USE_MOCK !== undefined) {
    apiResponse = JSON.parse(fs.readFileSync(filePath));
    console.log(`Result ${apiResponse.prices[0]}`)
    return {
      app: 'uber',
      high_estimate: apiResponse.prices[0].high_estimate,
      low_estimate: apiResponse.prices[0].low_estimate,
      duration: apiResponse.prices[0].duration,
      route: '',
      currency: apiResponse.prices[0].currency_code
    }
  } else {
    // Call Uber API
    https.get(request, () => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        apiResponse = JSON.parse(data);
        console.log(`Result ${apiResponse.prices[0]}`)
        return {
          app: 'uber',
          high_estimate: apiResponse.prices[0].high_estimate,
          low_estimate: apiResponse.prices[0].low_estimate,
          duration: apiResponse.prices[0].duration,
          route: ''
        }
      });
    }).on('error', (error) => {
      console.log("Error: " + error.message);
    })
  }
}
