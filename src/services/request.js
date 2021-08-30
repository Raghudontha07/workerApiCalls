import Request from 'request';
import {
  Log
} from './log';

//  Captures internal Request errors and creates a combined stack trace.
class RequestError extends Error {
  constructor(message, response, body) {
    super(message);

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    if (response) {
      this.status = response.statusCode;
      this.response = response;
    }
    this.body = body;
  }
}

/**
 * Promisify the request object.  Simplier than most npm packages.
 * @param {*} options some options
 * @returns {*} a promise
 */
export function request(options) {
  console.log('options', options);
  return new Promise((resolve, reject) => {
    Request(options, (error, response) => {
      console.log('options in', options);
      console.log('PAYLOAD in request call : ', error, response);
      if (error || response.statusCode > 300) {
        Log.info('throwing error in request call : ', error, options);
        reject(new RequestError(error, response));
      } else {
        console.log('PAYLOAD in request call : ', error, response);
        resolve(
          response
        );
      }
    });
  });
};
