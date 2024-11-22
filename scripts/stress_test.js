import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  scenarios: {
    stress_test: {
      executor: 'ramping-vus',
      stages: [
        { duration: '2m', target: 100 },
        { duration: '2m', target: 500 },
        { duration: '2m', target: 1000 },
      ],
    },
  },
};
export default function () {
    http.get(__ENV.URL);
    sleep(1);
  }
  