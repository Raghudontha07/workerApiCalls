class workerCode {
    coreCode(param) {
        try {
            const Request = this.require('request')
            const options = {
                url: param,
                method: 'GET',
                json: true
            };
            return new Promise((resolve, reject) => {
                Request(options, (error, response) => {
                    if (error) {
                        console.log('error in request call : ', error);
                        reject(new RequestError(error, response));
                    } else {
                        console.log('Response in request call : ', response);
                        resolve(
                            response.body
                        );
                    }
                });
            });
        } catch (err) {
            console.log('err', err);
            throw err;
        }
    }
}
export const code = new workerCode();
