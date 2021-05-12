'use strict';


const removeScripts = () => {
  const length = document.scripts.length;
  for (let i = 0; i < length - 1; i++) {
    const src = document.scripts[0].src;
    console.log(document.scripts[1]);
    document.scripts[1].remove();
    
  }
}

const addScript = scr => {
  const script = document.createElement("script");
  script.setAttribute("src", scr);
  document.body.appendChild(script);
}

const getData = async url => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return await response.json();
};

const changeContent = content => document.body.innerHTML = content;

const loadPage = async pageName => {
  removeScripts();
  getData('/html/' + pageName).then(body => {
    changeContent(body);
  });
  getData('/getScripts/' + pageName).then(scripts => {
    for (const script of scripts) {
      addScript(script);
    }
  });
}
