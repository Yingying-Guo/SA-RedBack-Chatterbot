// test/server.test.js

import request from 'supertest';
import app from '../Server/server.js';

describe('GET /heartbeat', () => {
  it('should return a status message indicating the server is alive', (done) => {
    request(app)
      .get('/heartbeat')
      .expect('Content-Type', /text/)
      .expect(200)
      .expect('Server is alive!', done);
  });
});
  
