const eoProxy = require('@eo-sdk/proxy');
const fs = require('fs');
const path = require('path');

let conn = process.argv[2];
let connections;
try {
  connections = fs.readFileSync(path.resolve(__dirname, './proxy.connections.json'));
} catch (error) {
  console.error(
    JSON.stringify(
      {
        default: {
          tenant: '',
          userName: '',
          password: '',
          target: ''
        }
      },
      null,
      2
    )
  );
  console.error('No connection specified. Please check your proxy.connections.json');
  return;
}

const conf = JSON.parse(connections.toString('utf-8'));

let data = conf[conn || 'default'];

let options = {
  tenant: data.tenant,
  basicCredentials: Buffer.from(data.userName + ':' + data.password).toString('base64'),
  target: data.target,
  level: 'silent',
  onError: function (err) {
    console.error('Proxy could not start.', err);
  }
};

let targetParts = options.target.split('://');
options.protocol = targetParts[0];
options.hostname = targetParts[1];

const eopx = eoProxy.createProxy(options);

eopx.listen(() => {});
