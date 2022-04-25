import http from 'k6/http';
const {TOKEN} = require('../../config.js');

export const options = {
  vus: 100,
  duration: '10s',
  headers: {
    Authorization: TOKEN
  }
};

export default function () {
  http.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=24');
};