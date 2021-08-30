import { Router } from 'express';
import { DynamicPool } from "node-worker-threads-pool";
const router = new Router();
const workerTask = require('../services/worker.js');
console.log(typeof workerTask);
router.post('/', async (req, res) => {
  console.log('route');
  const pool = new DynamicPool(4);
  await pool.exec({
    task: workerTask,
    param: 'https://freegeoip.app/json/8.8.8.8?callback=test'
  }).then(result => {
    console.log('result', result);
    // res.sendStatus(status)
    res.status(200).send((result).toString());
    // res.send(result);
  });
})

export default router;
