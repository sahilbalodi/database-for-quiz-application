const Hapi = require('hapi');
const server = require('./server.js');

describe('test server.js  ', () => {
  test('server.js should return a server object', () => {
    expect(server).toBeInstanceOf(Hapi.Server);
  });
});
describe('test server  ', () => {
  test('server should return statuscode 200', (done) => {
    server.inject('/ping', (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  test('server should return pong for a ping request', (done) => {
    server.inject('/ping', (response) => {
      expect(response.result).toBe('pong');
      done();
    });
  });
});
