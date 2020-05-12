const net = require('net');

/**
 * POST / HTTP/1.1
 * Host: 127.0.0.1
 * Content-Type: application/x-www-form-urlencoded
 * （注意这有一个空格）
 * field1=aaa&code=x%3D1
 */

class Request {
  // method, url = host + port + path
  // body: k/v
  // headers: Content-Type Content-Length
  constructor(options) {
    this.method = options.method || 'GET';
    this.host = options.host;
    this.port = options.port || 80;
    this.path = options.path || '/';
    this.body = options.body || {};
    this.headers = options.headers || {};

    if (!this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    if (this.headers['Content-Type'] === 'application/json')
      this.bodyText = JSON.stringify(this.body)
    else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded')
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');

    console.log(this.bodyText);
    this.headers['Content-Length'] = this.bodyText.length;
  }

  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`
  }

  
  send() {}
}

class Response {}

const client = net.createConnection({
  host: '127.0.0.1',
  port: 8088,
}, () => {
  console.log('connected to server!');
  // client.write('POST / HTTP/1,1\r\n');
  // client.write('Host: 127.0.0.1\r\n');
  // client.write('Content-Lenght: 20\r\n');
  // client.write('Content-Type: application/x-www-form-urlencoded\r\n');
  // client.write('\r\n');
  // client.write('field1=aaa&code=x%3D1\r\n');
  let request = new Request({
    method: 'POST',
    host: '127.0.0.1',
    port: '8088',
    body: {
      name: 'liji'
    }
  });

  console.log(request.toString());
});

client.on('data', data => {
  console.log(data.toString());
  client.end();
});

client.end('end', () => {
  console.log('disconnected from server');
});

client.on('error', err => {
  console.log(err);
  client.end();
});