'use strict';

const assert = require('assert').strict;
const { App } = require('../static/js/main.js');
const app1 = new App({});

describe('frontEnd tests', () => {
    it('account.signUp_wrongTypeOfInput', async () => {
      const acc = {
        email: 'suh@gmail.com',
        name: 'sqe',
        surname: 'fsf',
        password: 1234,
        repeatedPassword: 1234,
      };
      try {
        await app1.account.signUp(acc.email, acc.name, acc.surname, acc.password, acc.repeatedPassword);
      } catch (error) {
        assert.equal(error.message, 'Data has a wrong type');
      }
    });

    it('account.signUp_wrongRepeatedPassword', async () => {
      const acc = {
        email: 'suh@gmail.com',
        name: 'sqe',
        surname: 'fsf',
        password: '1234',
        repeatedPassword: '1224',
      };
      try {
        await app1.account.signUp(acc.email, acc.name, acc.surname, acc.password, acc.repeatedPassword);
      } catch (error) {
        assert.equal(error.message, 'Data has a wrong repeated password');
      }
    });

    it('account.signUp_RepeatpasswordWrongInput', async () => {
        const acc = {
            email: 'suh@gmail.com',
            name: 'sqe',
        surname: 'fsf',
            password: '123444242',
            repeatedPassword: '142532521',
        };
        try {
            await app1.account.signUp(acc.email, acc.name, acc.surname, acc.password, acc.repeatedPassword);
        } catch (e) {
            assert.equal(e.message, 'Data has a wrong repeated password');
        }
    });

    it('account.signUp_invalidEmail', async () => {
        const acc = {
            email: 'affafdljl',
            name: 'sqe',
            surname: 'fsf',
            password: '1234',
            repeatedPassword: '1234',
        };
        try {
            await app1.account.signUp(acc.email, acc.name, acc.surname, acc.password, acc.repeatedPassword);
        } catch (e) {
            assert.equal(e.message, 'Invalid Email');
        }
    });

    it('account.signUp_LongEmail', async () => {
        const acc = {
            email: 'affafdljlqewirioqreoitioqtyrteioty1234567890@gmail.com',
            name: 'sqe',
            surname: 'fsf',
            password: '1234',
            repeatedPassword: '1234',
        };
        try {
            await app1.account.signUp(acc.email,acc.name, acc.surname, acc.password, acc.repeatedPassword);
        } catch (e) {
            assert.equal(e.message, 'Long email');
        }
    });
    
    it('account.signUp_Long_name_surname', async () => {
        const acc = {
            email: 'suh@gmail.com',
            name: 'sqeggrgrdgsegfeagsehsr',
            surname: 'fsfggrgswgeahhsrhse',
            password: '1234',
            repeatedPassword: '1234',
        };
        try {
            await app1.account.signUp(acc.email, acc.name, acc.surname, acc.password, acc.repeatedPassword);
        } catch (e) {
            assert.equal(e.message, 'Long name or surname');
        }
    });

    it('account.login_notStringInput', async () => {
        const acc = {
            email: 'suh@gmail.com',
            username: 'sqe',
            password: 12344,
        };
        try {
            await app1.account.login(acc.email, acc.username, acc.password);
        } catch (e) {
            assert.equal(e.message, 'String is expected');
        }
    });
    
    it('account.login_NotExist', async () => {
        const acc = {
            email: '',
            username: '',
            password: '',
        };
        try {
            await app1.account.login(acc.email, acc.username, acc.password);
        } catch (e) {
            assert.equal(e.message, 'The account does not exist');
        }
    });
    
    it('task.addTask_WrongTypeInput', async () => {
        const tassk = {
            name: 'tests',
            descrip: 'fwefsgf',
            priority: 4,
            deadline: '11.06.2021',
        };
        try {
            await app1.task.addTask(tassk.name, tassk.descrip, tassk.priority, tassk.deadline);
        } catch (e) {
            assert.equal(e.message, 'Different types of input are expected');
        }
    });
    
    it('task.addTask_NoName', async () => {
        const tassk = {
            name: '',
            descrip: 'fwefsgf',
            priority: 4,
            deadline: '11.06.2021',
        };
        try {
            await app1.task.addTask(tassk.name, tassk.descrip, tassk.priority, tassk.deadline);
        } catch (e) {
            assert.equal(e.message, 'Task is expected to have a name');
        }
    });
	
    it('task.addTask_LongName', async () => {
        const tassk = {
            name: 'qwertyuiopasdfghjkl;zxcvbnm,mnbvcxzasdfghjklpoiuytrewqasdfghjkjhgfddfthgytrfghjutrdcvbk',
            descrip: 'fwefsgf',
            priority: 4,
            deadline: '11.06.2021',
        };
        try {
            await app1.task.addTask(tassk.name, tassk.descrip, tassk.priority, tassk.deadline);
        } catch (e) {
            assert.equal(e.message, 'Long task name');
        }
    });
    
    it('task.addTask_NoName', async () => {
        const tassk = {
            name: '',
            descrip: 'fwefsgf',
            priority: 4,
            deadline: '11.06.2021',
        };
        try {
            await app1.task.addTask(tassk.name, tassk.descrip, tassk.priority, tassk.deadline);
        } catch (e) {
            assert.equal(e.message, 'Task is expected to have a name');
        }
    });
    
    it('task.addTask_OutOfRange', async () => {
        const tassk = {
            name: 'tests',
            descrip: 'fwefsgf',
            priority: 424,
            deadline: '11.06.2021',
        };
        try {
            await app1.task.addTask(tassk.name, tassk.descrip, tassk.priority, tassk.deadline);
        } catch (e) {
            assert.equal(e.message, 'Priority number is out of range');
        }
    });

    it('task.addTask_UnexpectedDeadline', async () => {
        const tassk = {
            name: 'tests',
            descrip: 'fwefsgf',
            priority: 4,
            deadline: '11.01.2019',
        };
        try {
            await app1.task.addTask(tassk.name, tassk.descrip, tassk.priority, tassk.deadline);
        } catch (e) {
            assert.equal(e.message, 'Deadline can not be earlier than today');
        }
    });
})
