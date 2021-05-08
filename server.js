'use strict';

const http = require('http');
const fs = require('fs');

const httpError = (res, status, message) => {
  res.statusCode = status;
  res.end(`"${message}"`);
};

http.createServer(async (req, res) => {
  const url = req.url === '/' ? '/index.html' : req.url;
  const path = `./static${url}`;
  try {
    console.log(url);
    console.log(path);
    const data = await fs.promises.readFile(path);
    res.end(data);
  } catch (err) {
    httpError(res, 404, 'File is not found');
  }
}).listen(8000);
