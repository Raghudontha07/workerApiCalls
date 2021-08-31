import { Router } from 'express';
import { DynamicPool } from "node-worker-threads-pool";
const router = new Router();
const { code } = require('../services/worker.js');
router.post('/', (req, res) => {
  try {
    const pool = new DynamicPool(4);
    Promise.allSettled([pool.exec({
      task: code.coreCode,
      param: 'https://freegeoip.app/json/8.8.8.8?callback=test'
    }), pool.exec({
      task: code.coreCode,
      param: 'https://rdap.arin.net/registry/ip/8.8.8.8'
    }),
    pool.exec({
      task: code.coreCode,
      param: 'https://rapidapi.com/whoisapi/api/dns-lookup/'
    })])
      .then(results => {
        res.json(results);
      });

  } catch (err) {
    res.statusCode('400').send('bad request');
  }

})
export default router;
