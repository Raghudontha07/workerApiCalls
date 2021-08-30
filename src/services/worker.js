// console.log('requesttttttttt', equest);
import { Log } from "./log";
const { parentPort, workerData } = require("worker_threads");
console.log({ parentPort });
console.log({ workerData });
class workerCode {

    coreCode(param) {
        try {
            // const Request = require("request");
            import('request')
                .then((module) => {
                    console.log('module', module);
                    module.default();
                })
            console.log('param', param);
            const options = {
                url: param,
                method: 'GET',
                json: true
            };
            // // console.log('request', equest);
            // return new Promise((resolve, reject) => {
            //     Request(options, (error, response) => {
            //         console.log('options in', options);
            //         console.log('PAYLOAD in request call : ', error, response);
            //         if (error || response.statusCode > 300) {
            //             Log.info('throwing error in request call : ', error, options);
            //             reject(new RequestError(error, response));
            //         } else {
            //             console.log('PAYLOAD in request call : ', error, response);
            //             resolve(
            //                 response
            //             );
            //         }
            //     });
            // });
            // Log.info('Payload', payload);
            // request(payload).then(result => {
            //     console.log('result', result);
            //     return result
            // })
            // Log.info('result of task', result);
        } catch (err) {
            console.log('err', err);
            // Log.error('Exception occured at executing task', err);
        }
    }

}
export const code = new workerCode();
