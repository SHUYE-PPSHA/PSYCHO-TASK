'use strict';

setTimeout(() => {
  getBody('/2.html').then(content => {
    changeContent(content);
  });
}, 5000);
