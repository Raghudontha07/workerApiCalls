import { Log } from '../services';
import { ErrorMessageService } from '../services';
import { StaticPool } from 'node-worker-threads-pool';

const pool = new StaticPool({
  size: 4,
  task: filePath,
  workerData: 'workerData!'
});
export class UsersController {

  constructor(realm) {
    this.realm = realm;
    this.urls = {
      geoIp: 'https://freegeoip.app/json/8.8.8.8?callback=test',
      rdap: 'https://rdap.arin.net/registry/ip/8.8.8.8',
      reverseDNS: 'https://rapidapi.com/whoisapi/api/dns-lookup/'
    };
  }

  async getUser(req) {
    try {
      const res = await pool.exec(this.urls.geoIp);
      Log.child('res----', res);
      return res;
    } catch (e) {
      Log.child({ message: e.message, stack: e.stack }).info('Error running getUser');
      throw e;
    }
  }

}
