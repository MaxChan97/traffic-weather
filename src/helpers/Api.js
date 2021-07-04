const axios = require('axios');

const API1 = 'https://api.data.gov.sg/v1/transport/traffic-images';
const API2 = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast';
const reverseGeoCodeAPI =
  'http://open.mapquestapi.com/geocoding/v1/reverse?key=61aFSEQRpumlxku2y4EnwTanDc6787H5&location=';

let Api = {
  API1: API1,
  API2: API2,
  reverseGeoCodeAPI: reverseGeoCodeAPI,

  async getTrafficImageCaptures(dateTime) {
    let res1 = await axios.get(API1 + '?date_time=' + dateTime);
    let captures = res1.data.items[0].cameras;
    for (let i = 0; i < captures.length; i++) {
      let res2 = await Api.getLocationHumanReadableName(
        captures[i].location.latitude,
        captures[i].location.longitude
      );
      captures[i].locationName = res2.data.results[0].locations[0].street;
      captures[i].id = i;
    }
    return captures;
  },

  getLocationHumanReadableName(latitude, longitude) {
    return axios.get(reverseGeoCodeAPI + latitude + ',' + longitude);
  },
};

export default Api;
