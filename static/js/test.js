'use strict'

{
  const cases = [
    ['/html/1.html', `<h1>html1</h1>
    <button id="12345">html2</button>`],
    ['/html/2.html', `<h1>html2</h1>`],
    ['/html/index.html', `<h1>hi ksta</h1>
    <button id="12345">1.html</button>

    <script src="../js/index.js"></script>
    <script src="../js/nxtpage.js"></script>`],
    ['aboba', ' File is not found']
  ];

  for (const event of cases) {
    const [ entering, expected ] = event;
    getData(entering).then(result => {
      if (result.trim() !== expected.trim()) {
        console.error(`test failed(getData)\n
                      value: ${entering}\n
                      expected: ${expected}\n
                      result: ${result}`);
      }
    })
  }

}


const events = [
  '../js/nxtpage.js',
  '../js/test.js',
  '../js/smth.js'
]

for (const event of events) {
  addScript(event);
  const srcArr = document.body.lastChild.src.split('/');
  const srcResult = srcArr[srcArr.length - 1];
  const eventArr = event.split('/');
  const srcEvent = eventArr[eventArr.length - 1];
  if (srcEvent !== srcResult) {
    console.error(`test failed(addScript)\n
                      value: ${srcResult}\n
                      expected: ${srcEvent}\n`);
  }
}

{
  removeScripts();
  if (document.scripts.length !== 1) console.error('test failed(removeScript)');
}

{
  const contents = [
    `<h1>html1</h1>
    <button id="12345">html2</button>`,
    `<h1>html2</h1>`,
    `<h1>hi ksta</h1>
    <button id="12345">1.html</button>

    <script src="../js/index.js"></script>
    <script src="../js/nxtpage.js"></script>`
  ];
  
  for (const content of contents) {
    changeContent(content);
    const result = document.body.innerHTML.trim();
    if (document.body.innerHTML.trim() !== content.trim()) {
      console.error(`test failed(getData)\n
                      expected: ${context}\n
                      result: ${result}`);
    }
  }
}

