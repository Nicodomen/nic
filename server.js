const http = require('http');

const menu = [
  { id: 1, name: 'Spaghetti Bolognese', price: 12.5 },
  { id: 2, name: 'Caesar Salad', price: 8.0 },
  { id: 3, name: 'Margherita Pizza', price: 10.0 }
];

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to the Restaurant');
  } else if (req.method === 'GET' && req.url === '/menu') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(menu));
  } else if (req.method === 'POST' && req.url === '/reservation') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const data = JSON.parse(body || '{}');
      const message = `Reservation confirmed for ${data.name || 'guest'}`;
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message }));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

module.exports = { server, menu };

