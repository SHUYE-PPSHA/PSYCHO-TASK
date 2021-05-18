'use strict';

const assert = require('assert').strict;

describe('frontEnd tests', () => {
    it('account.signUp_wrongTypeOfInput', async () => {
      const acc = {
        email: 'suh@gmail.com',
        username: 'sqe',
        password: 1234,
        repeatedPassword: 1234,
      };
      try {
        await acc.signUp(acc.email, acc.username, acc.password, acc.repeatedPassword);
      } catch (e) {
        assert.equal(e.message, 'Data has a wrong type. Expected string');
      }
    });

    it('account.signUp_wrongRepeatedPassword', async () => {
      const acc = {
        email: 'suh@gmail.com',
        username: 'sqe',
        password: '1234',
        repeatedPassword: '1224',
      };
      try {
        await acc.signUp(acc.email, acc.username, acc.password, acc.repeatedPassword);
      } catch (e) {
        assert.equal(e.message, 'Data has a wrong repeated password');
      }
    });


    it('account.signUp_AlreadyExist', async () => {
        const acc = {
            email: 'suh@gmail.com',
            username: 'sqe',
            password: '1234',
            repeatedPassword: '1234',
        };
        try {
            await acc.signUp(acc.email, acc.username, acc.password, acc.repeatedPassword);
        } catch (e) {
            assert.equal(e.message, 'This account already exist');
        }
    });

    it('account.signUp_ReapetpsswrdWrongInput', async () => {
        const acc = {
            email: 'suh@gmail.com',
            username: 'sqe',
            password: '123444242',
            repeatedPassword: '142532521',
        };
        try {
            await acc.signUp(acc.email, acc.username, acc.password, acc.repeatedPassword);
        } catch (e) {
            assert.equal(e.message, 'Repeated password does not match the password');
        }
    });

    it('account.signUp_invalidEmail', async () => {
        const acc = {
            email: 'affafdljl',
            username: 'sqe',
            password: '1234',
            repeatedPassword: '1234',
        };
        try {
            await acc.signUp(acc.email, acc.username, acc.password, acc.repeatedPassword);
        } catch (e) {
            assert.equal(e.message, 'Invalid Email');
        }
    });

    it('account.signUp_LongEmail', async () => {
        const acc = {
            email: 'affafdljlqewirioqreoitioqtyrteioty1234567890@gmail.com',
            username: 'sqe',
            password: '1234',
            repeatedPassword: '1234',
        };
        try {
            await acc.signUp(acc.email, acc.username, acc.password, acc.repeatedPassword);
        } catch (e) {
            assert.equal(e.message, 'Long email');
        }
    });
    
    it('account.signUp_LongUsername', async () => {
        const acc = {
            email: 'suh@gmail.com',
            username: 'sqeaffafdljlqewirioqreoitioqtyrteioty1234567890',
            password: '1234',
            repeatedPassword: '1234',
        };
        try {
            await acc.signUp(acc.email, acc.username, acc.password, acc.repeatedPassword);
        } catch (e) {
            assert.equal(e.message, 'Long username');
        }
    });

    it('account.login_notStringInput', async () => {
        const acc = {
            email: 'suh@gmail.com',
            username: sqe,
            password: 12344,
        };
        try {
            await acc.login(acc.email, acc.username, acc.password);
        } catch (e) {
            assert.equal(e.message, 'String is expected');
        }
    });
    
    it('account.login_NotExist', async () => {
        const acc = {
            email: 'suh@gmail.com',
            username: 'sqe',
            password: '123444242',
        };
        try {
            await acc.login(acc.email, acc.username, acc.password);
        } catch (e) {
            assert.equal(e.message, 'The account does not exist');
        }
    });
    
    it('task.addTask_WrongTypeInput', async () => {
        const task = {
            name: tests,
            priority: '4',
            deadline: '11.06.2021',
        };
        try {
            await task.addTask(task.name, task.priority, task.deadline);
        } catch (e) {
            assert.equal(e.message, 'Different types of input are expected');
        }
    });
    
    it('task.addTask_NoName', async () => {
        const task = {
            name: '',
            priority: 4,
            deadline: '11.06.2021',
        };
        try {
            await task.addTask(task.name, task.priority, task.deadline);
        } catch (e) {
            assert.equal(e.message, 'Task is expected to have a name');
        }
    });
	
    it('task.addTask_LongName', async () => {
        const task = {
            name: 'qwertyuiopasdfghjkl;zxcvbnm,mnbvcxzasdfghjkl;;poiuytrewqasdfghjkjhgfddfthgytrfghjutrdcvbk',
            priority: 4,
            deadline: '11.06.2021',
        };
        try {
            await task.addTask(task.name, task.priority, task.deadline);
        } catch (e) {
            assert.equal(e.message, 'Long task name');
        }
    });
    
    it('task.addTask_NoName', async () => {
        const task = {
            name: null,
            priority: 4,
            deadline: '11.06.2021',
        };
        try {
            await task.addTask(task.name, task.priority, task.deadline);
        } catch (e) {
            assert.equal(e.message, 'Task is expected to have a name');
        }
    });
    
    it('task.addTask_OutOfRange', async () => {
        const task = {
            name: 'tests',
            priority: 424,
            deadline: '11.06.2021',
        };
        try {
            await task.addTask(task.name, task.priority, task.deadline);
        } catch (e) {
            assert.equal(e.message, 'Priority number is out of range');
        }
    });

    it('task.addTask_UnexpectedDeadline', async () => {
        const task = {
            name: 'tests',
            priority: 4,
            deadline: '11.01.2019',
        };
        try {
            await task.addTask(task.name, task.priority, task.deadline);
        } catch (e) {
            assert.equal(e.message, 'Deadline can not be earlier than today');
        }
    });
})
