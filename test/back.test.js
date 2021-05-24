'use strict';

const fs = require('fs');
const assert = require('assert').strict;

const server = require('../server.js');
const getBody = server.getBody;

const htmlf = [
  ['../static/html/1.html', 
  `<h1>html1</h1>
  <button id="12345">html2</button>`],
  ['../static/html/2.html', 
  '<h1>html2</h1>'],
  ['../static/html/index.html', 
  `<h1>hi ksta</h1>
  <button id="12345">1.html</button>

  <script src="../js/index.js"></script>
  <script src="../js/nxtpage.js"></script>`],
];

for (const html of htmlf) {
  const [ path, content ] = html;
  fs.promises.readFile(path).then((buffer) => {
    const result = getBody(buffer).trim();
    try {
      assert.strictEqual(result, content, 'Failed in test');
    } catch (err) {
      console.log(err);
    }
  });
}
