import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  scenarios: {
    soak_test: {
      executor: 'constant-vus',
      vus: 50,
      duration: '5m',
    },
  },
};

export default function () {
  http.get(__ENV.URL);
  sleep(1);
}
