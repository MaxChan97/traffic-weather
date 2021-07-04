const axios = require('axios');

const API1 = 'https://api.data.gov.sg/v1/transport/traffic-images';
const API2 = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast';
const reverseGeoCodeAPI =
  'http://open.mapquestapi.com/geocoding/v1/reverse?key=61aFSEQRpumlxku2y4EnwTanDc6787H5&location=';

let Api = {
  API1: API1,
  API2: API2,
  reverseGeoCodeAPI: reverseGeoCodeAPI,

  getLocationHumanReadableName(latitude, longitude) {
    return axios.get(reverseGeoCodeAPI + latitude + ',' + longitude);
  },

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

  distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

    return 12742 * Math.asin(Math.abs(Math.sqrt(a))); // 2 * R; R = 6371 km
  },

  async getTwoHourWeatherForecasts(dateTime, latitude, longitude) {
    let res = await axios.get(API2 + '?date_time=' + dateTime);
    let closestDistance;
    let closestArea;
    let locations = res.data.area_metadata;
    let forecasts = res.data.items[0].forecasts;
    for (let i = 0; i < locations.length; i++) {
      let locationLat = locations[i].label_location.latitude;
      let locationLong = locations[i].label_location.longitude;
      let distance = this.distance(
        latitude,
        longitude,
        locationLat,
        locationLong
      );
      let area = locations[i].name;
      if (!closestDistance || distance < closestDistance) {
        // this is the new closest area
        closestDistance = distance;
        closestArea = area;
      }
    }
    console.log(closestArea);
    const result = forecasts.filter(
      (forecast) => forecast.area === closestArea
    );
    return result[0].forecast;
  },
};

export default Api;
