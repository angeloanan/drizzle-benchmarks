import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { scenario } from 'k6/execution';
import http from 'k6/http';

const data = new SharedArray('requests', function () {
  return JSON.parse(open('./data/requests.json'));
});

const host = `http://localhost:2999`; // baseline Hono bottleneck
// const host = `http://localhost:3000`; // drizzle
// const host = `http://localhost:3001`; // prisma
// const host = `http://localhost:3002`; // typeorm

export const options = {
  vus: 2500,
  iterations: 1e6,
};
  
export default function () {
  const params = data[scenario.iterationInTest % data.length];
  const url = `${host}${params}`;

  http.get(url, {
    tags: { name: 'fetch' },
    timeout: '30s',
  });

  sleep(0.1);
}
