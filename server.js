const http = require('http');
const app = require('./app');

const hostname = '127.0.0.1';
const port = 30113;

// const hostname = '192.168.100.246';
// const port = 30113;

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
