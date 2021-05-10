'use strict';

const { body } = document;

body.innerHTML += '<h2>asdfasdf</h2>';

console.log(document.scripts);

const removeScripts = () => {
  const length = document.scripts.length;
  for (let i = 0; i < length; i++) {
    console.log(i);
    document.scripts[0].remove();
  }
}

const getBody = async url => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return await response.json();
};

const changeContent = content => body.innerHTML = content;

document.addEventListener('click', event => {
  getBody('/1.html').then(content => {
    changeContent(content);
  });
});

removeScripts();

console.log(document.scripts);


// let myScript = document.createElement("script");
// myScript.setAttribute("src", "nxtpage.js");
// document.body.appendChild(myScript);

