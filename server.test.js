const Hapi = require('hapi');
const server = require('./server.js');

describe('test server.js  ', () => {
  test('server.js should return a server object', () => {
    expect(server).toBeInstanceOf(Hapi.Server);
  });
});
