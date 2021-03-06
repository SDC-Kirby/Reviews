import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 }, // below normal load
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 }, // normal load
    { duration: '5m', target: 200 },
    { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  const BASE_URL = 'http://localhost:3000/reviews'; // make sure this is not production

  const responses = http.batch([
    ['GET', `${BASE_URL}/?product_id=350000`],
    ['GET', `${BASE_URL}/meta/?product_id=350000`],
  ]);

  sleep(1);
};


