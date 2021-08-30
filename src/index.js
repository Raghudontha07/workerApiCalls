import express from 'express';
import Boom from 'express-boom';
import { Router } from './routes';
import { Log, LogMiddleware } from './services';


export class Service {

  createApp() {
    const app = express();
    app.set('HEALTH_STATUS', 'INITIALIZING');

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json()) // To parse the incoming requests with JSON payloads
    app.use(Boom());
    app.use(LogMiddleware);

    // Add the routes to the app
    Router.build(app);

    return app;
  }

  init() {
    Log.info('Initializing atursapi App');
    this.app = this.createApp();
    const {
      PORT,
      NODE_ENV
    } = process.env;

    // ENV Argument Checks
    if (!PORT || !NODE_ENV) {
      const msg =
        'Configuration Error: you must specify these ENV variables: PORT, NODE_ENV';
      Log.error(msg);
      throw new Error(msg);
    }

    this.port = PORT;
    this.env = NODE_ENV;
  }

  start() {
    this.init();
    const DOCKER_HOST = '0.0.0.0';

    this.app.listen(this.port, DOCKER_HOST, err => {
      if (err) {
        this.app.set('HEALTH_STATUS', 'SERVER_LISTEN_FAILED');
        throw err;
      }

      Log.info(`Server started on http://${DOCKER_HOST}:${this.port}`);
    });

    if (
      this.env === 'development' ||
      this.env === 'testing' ||
      this.env === 'test'
    ) {
      process.env.isAppReadyForTest = true;


      // uncomment below line in local
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
    }

    this.app.set('HEALTH_STATUS', 'READY');
    Log.info('Initialization successful. Service is Ready.');

    // Shutdown Hook
    process.on('SIGTERM', () => {
      this.stop();
    });
    return Promise.resolve();
  }

  /**
   * Closes the connection and exits with status code 0 after 3000 ms.
   * Sets HEALTH_STATUS to SHUTTING_DOWN while in progress
   *
   * @memberof Service
   */
  stop() {
    Log.info('Starting graceful shutdown...');
    this.app.set('HEALTH_STATUS', 'SHUTTING_DOWN');

    //LoadingDock.readShutdown();

    setTimeout(() => {
      this.app.close(() => {
        Log.info('Shutdown Complete.');
        process.exit(0);
      });
    }, 3000);
  }
}


export const Server = new Service();
// Start the service when run from command line
if (
  require.main &&
  (process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'development')
) {
  Log.info('atursapiSvc: Server started');
  Server.start();
} else {
  Log.error('atursapiSvc: Server not started.');
}
