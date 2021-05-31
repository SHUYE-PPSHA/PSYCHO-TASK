'use strict';

const http = require('http');
const fs = require('fs');
const scripts = require('./scripts.js');
const routing = require('./routing.js');
const PORT = 8000;

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

console.log(scripts);

const server = http.createServer(async (req, res) => {
  const url = req.url === '/' ? '/html/index.html' : req.url;
  console.log(url);

  const router = routing[url];
  //console.log(router)
  if(router) {
    const result = await router(req, res);
    console.log({ result });
    res.end(JSON.stringify(result));
    return;
  }

  const [ first, second ] = url.substring(1).split('/');
  const path = `./static/${first}/${second}`;
  console.log(path);
  try {
    let data;
    if (first === 'getScripts') {
      const [ htmlName ] = second.split('.');
      console.log(htmlName);
      data = scripts[htmlName];
      data = JSON.stringify(data);
    } else {
      data = await fs.promises.readFile(path);
    }
    if (second !== 'index.html' && path.includes('.html') && first !== 'getScripts') {
      data = getBody(data);
      data = JSON.stringify(data);
    }
    res.end(data);
  } catch (err) {
    httpError(res, 404, 'File is not found');
  }
}).listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
});

module.exports = { getBody, server };
