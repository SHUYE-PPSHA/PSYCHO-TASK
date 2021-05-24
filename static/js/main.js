'use strict';

function dropDownFunction() {
  document.getElementById('myDropDown').classList.toggle('show');
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

class account {
  
  async signUp(mail, usrName, usrSurName, psswrd, repeatpsswrd) {
    if ( typeof mail, usrName, usrSurName, psswrd, repeatpsswrd !== 'string') 
    {
      throw new Error('Data has a wrong type');
    }

    if (accounts.includes(mail || psswrd) === true) 
    {
      throw new Error('This account already exist');
    }

    if (psswrd !== repeatpsswrd) 
    {
      throw new Error('Repeated password does not match the password')
    }
    alert('Work in progress');
    /*
    let mail = userMail.nodeValue;
    let usrName = userName.nodeValue;
    let usrSurName = userSurname.nodeValue;
    let psswrd = userPsswrd.nodeValue;
    let repeatpsswrd = userSecPsswrd.nodeValue;
    let acc = {mail, usrName, usrSurname, psswrd, repeatpsswrd};
    let verse = acc;
    */
  }

  async login (mail, usr, psswrd) {
    if (mail, usr, psswrd !== 'string') 
    {
      throw new Error('String is expected');
    }

    if (accounts.includes(mail || usr || psswrd) !== true) 
    {
      throw new Error('The account does not exist');
    }

  }
}

class task {

  async addTask(name, descrip, priority, deadline) 
  {
    if (name, descrip, deadline !== 'string' || priority !== 'number') 
    {
      throw new Error('Different types of input are expected');
    }

    if (!name) 
    {
      throw new Error('Task is expected to have a name');
    }
    if (1 > priority || priority > 5) 
    {
      throw new Error('Priority number is out of range');
    }

    if (Number(deadline) < Date.now) 
    {
      throw new Error('Deadline can not be earlier than today');
    }
  }

  async changeTask() {}
}

const createPostRequestObj = data => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

class User {
  static async getUserInfo(userId) {
    const url = '/user/getUserInfo';
    const requestdata = { userId };
    const response = await fetch(url, createPostRequestObj(requestdata));
    const result = await response.json();
    console.log(result);
  }

  static async getUsers() {
    const url = '/user/getUsers';
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
  }
}

class Task {
  static async getTaskInfo(taskId) {
    const url = '/task/getTaskInfo';
    const requestdata = { taskId };
    const response = await fetch(url, createPostRequestObj(requestdata));
    const result = await response.json();
    console.log(result);
  }
}

class TaskStatus {
  static async getStatuses() {
    const url = '/taskStatus/getStatuses';
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
  }
}