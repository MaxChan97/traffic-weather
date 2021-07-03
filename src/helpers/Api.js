const axios = require('axios');

const API1 = 'https://api.data.gov.sg/v1/transport/traffic-images';

let Api = {
  API1: API1,

  getTrafficImageCaptures(dateTime) {
    return axios.get(API1 + '?date_time=' + dateTime);
  },
};

export default Api;
