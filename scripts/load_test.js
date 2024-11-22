import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  scenarios: {
    load_test: {
      executor: 'constant-arrival-rate',
      rate: 50,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 10,
      maxVUs: 100,
    },
  },
};

export default function () {
    http.get(__ENV.URL);
    sleep(1);
  }
  