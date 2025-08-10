const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('http');
const { server, menu } = require('./server');

test('GET /menu returns menu items', async () => {
  await new Promise((resolve, reject) => {
    server.listen(0, () => {
      const { port } = server.address();
      http.get(`http://localhost:${port}/menu`, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            assert.equal(res.statusCode, 200);
            assert.deepEqual(JSON.parse(data), menu);
            server.close(resolve);
          } catch (err) {
            server.close(() => reject(err));
          }
        });
      }).on('error', err => {
        server.close(() => reject(err));
      });
    });
  });
});

