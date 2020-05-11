const net = require('net');

/**
 * POST / HTTP/1.1
 * Host: 127.0.0.1
 * Content-Type: application/x-www-form-urlencoded
 * 
 * field1=aaa&code=x%3D1
 */

class Request {}

class Response {}

net.connect({
  address: '127.0.0.1',
  port: 8088,
  onread: {
    buffer: Buffer.alloc(4 * 1024),
    callback: function(nread, buf) {
      console.log(buf.toString('utf-8', 0, nread));
    }
  }
});