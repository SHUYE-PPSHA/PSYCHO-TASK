'use strict';

function dropDownFunction() {
  document.getElementById('myDropDown').classList.toggle('show');
}

/*window.onclick = function(event) {
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
}*/

class account {
  
  async signUp(mail, name, surname, password, repeatpassword) {
    if ( typeof mail !== 'string' || typeof name !== 'string' || typeof surname !== 'string' || typeof password !== 'string' || typeof repeatpassword !== 'string') 
    {
      throw new Error('Data has a wrong type');
    } 

    if (password !== repeatpassword) 
    {
      throw new Error('Data has a wrong repeated password')
    }

  }

  async login (mail, user, password) {
    if (typeof mail !== 'string' || typeof user !== 'string' || typeof password !== 'string') 
    {
      throw new Error('String is expected');
    }

    if (!mail || !user || !password ) 
    {
      throw new Error('The account does not exist');
    }

  }
}

class task {

  async addTask(name, descrip, priority, deadline) 
  {
    if (typeof name !== 'string' || typeof descrip !== 'string' || typeof deadline !== 'string' || typeof priority !== 'number') 
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
//const arrObj = Task.getTaskInfo($1);

class App {
  constructor(){
  this.account = new account();
  this.task = new task();
  this.user = new User();
  this.taskStatus = new TaskStatus();
  }
}

module.exports = { App };
