'use strict';

const modal1 = document.getElementById('id01');
const modal2 = document.getElementById('id02');
const modal3 = document.getElementById('id03');

let accounts = [];

class account {
  
  async signUp(mail, usr, psswrd, repeatpsswrd) {
    if ( typeof mail, usr, psswrd, repeatpsswrd !== 'string') 
    {
      throw new Error('Data has a wrong type');
    }

    if (accounts.includes(mail || usr || psswrd) === true) 
    {
      throw new Error('This account already exist');
    }

    if (psswrd !== repeatpsswrd) 
    {
      throw new Error('Repeated password does not match the password')
    }

    let acc = {email: mail, username: usr, password: psswrd, repeatedPassword: repeatpsswrd};
    accounts.push[acc];
    return accounts;
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
