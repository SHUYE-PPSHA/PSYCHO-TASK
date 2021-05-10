'use strict';

const http = require('http');
const fs = require('fs');

const receiveLogin = async req => new Promise(resolve => {
  const body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', async () => {
    const data = body.join('');
    const login = JSON.parse(data);
    resolve(login);
  });
});

const getBody = buffer => {
  const html = buffer.toString();
  const from = html.indexOf('<body>') + 6;

  const to = html.lastIndexOf('</body>');
  return html.substring(from, to);
}

const httpError = (res, status, message) => {
  res.statusCode = status;
  res.end(`"${message}"`);
};

http.createServer(async (req, res) => {
  const url = req.url === '/' ? '/index.html' : req.url;
  const path = `./static${url}`;
  try {
    let data = await fs.promises.readFile(path);
    if (url !== '/index.html' && path.includes('html')) {
      data = getBody(data);
      data = JSON.stringify(data);
    }
    res.end(data);
  } catch (err) {
    httpError(res, 404, 'File is not found');
  }
}).listen(8000);
