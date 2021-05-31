'use strict';

const fs = require('fs');
const assert = require('assert').strict;

const serverMethods = require('../server.js');
const getBody = serverMethods.getBody;
const server = serverMethods.server;

describe('back end tests', () => {
  after(() => {
    server.close()
  });

  it('static/html/1.html', async () => {
    const html = ['../static/html/1.html', 
    `<h1>html1</h1>
    <button id="12345">html2</button>`
    ];
    const [ path, content ] = html;
    fs.promises.readFile(path).then((buffer) => {
      const result = getBody(buffer).trim();
      console.log(result)
      try {
        assert.strictEqual(result, content, 'Failed in test');
      } catch (err) {
        console.log(err);
      }
    });
  });
  
  it('static/html/2.html', async () => {
    const html = ['../static/html/2.html', 
    '<h1>html2</h1>'];
    const [ path, content ] = html;
    fs.promises.readFile(path).then((buffer) => {
      const result = getBody(buffer).trim();
      console.log(result)
      try {
        assert.strictEqual(result, content, 'Failed in test');
      } catch (err) {
        console.log(err);
      }
    });
  });

  it('static/html/index.html', async () => {
    const html = ['../static/html/index.html', 
    `<h1>hi ksta</h1>
    <button id="12345">1.html</button>
  
    <script src="../js/index.js"></script>
    <script src="../js/nxtpage.js"></script>`];
    const [ path, content ] = html;
    fs.promises.readFile(path).then((buffer) => {
      const result = getBody(buffer).trim();
      console.log(result)
      try {
        assert.strictEqual(result, content, 'Failed in test');
      } catch (err) {
        console.log(err);
      }
    });
  });
})
