import http from 'node:http'

http
  .createServer((req, res) => {
    res.end('Node ts template')
  })
  .listen(3333, () => console.log('HTTP Server Running!'))
