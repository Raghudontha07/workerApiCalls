import { Router } from 'express';
const router = new Router();

router.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain');
  const status = req.app.get('HEALTH_STATUS');
  return res.send(status);
});

router.get('/ready', (req, res) => {
  res.set('Content-Type', 'text/plain');
  const status = req.app.get('HEALTH_STATUS');
  if (status === 'READY') {
    return res.send(status);
  } else {
    return res.status(417).send(status);
  }
});

router.get('/json', (req, res) => {
  res.set('Content-Type', 'application/json');
  const status = req.app.get('HEALTH_STATUS');
  return res.status(200).send({
    status: status,
  });
});

export default router;
