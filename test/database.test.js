'use strict';

const assert = require('assert').strict;
const { FakeDatabase } = require('../database/fakeDatabase.js');
const fakeDatabase = new FakeDatabase({});

describe('database tests', () => {
  it('User.addUser_notStringInput', async () => {
    const user = {
      user_id: 1,
      name: 'sqe',
      surname: null,
      password: 2,
      max_working_time: 200
    };
    try {
      await fakeDatabase.user.addUser(user.name, user.surname, user.password, user.max_working_time);
    } catch (error) {
      assert.equal(error.message, 'The values of the variables name, surname, password must be string');
    }
  });

  it('User.addUser_negativeWorkingTime', async () => {
    const user = {
      user_id: 1,
      name: 'sqe',
      surname: 'nds',
      password: 'jksd',
      max_working_time: -2
    };
    try {
      await fakeDatabase.user.addUser(user.name, user.surname, user.password, user.max_working_time);
    } catch (error) {
      assert.equal(error.message, 'User max working time must be greater than or equal to 0');
    }
  });

  it('User.addUser_correctInput', async () => {
    fakeDatabase.user.clearTables();
    const user = {
      user_id: 1,
      name: 'sqe',
      surname: 'nds',
      password: 'jksd',
      max_working_time: 100
    };
    try {
      await fakeDatabase.user.addUser(user.name, user.surname, user.password, user.max_working_time);
      const actualData = fakeDatabase.user.usersTable.get(user.user_id);
      //console.log(actualData);
      assert.deepEqual(actualData, user);
    } catch (error) {
      console.log(error);
      assert.fail();
    }
  });

  it('User.getUserInfo_correctInput', async () => {
    fakeDatabase.user.clearTables();
    const user = {
      user_id: 1,
      name: 'sqe',
      surname: 'nds',
      password: 'jksd',
      max_working_time: 100
    };
    fakeDatabase.user.usersTable.set(user.user_id, user);
    //fakeDatabase.user.addUser(user.name, user.surname, user.password, user.max_working_time);
    try {
      const actualData = await (await fakeDatabase.user.getUserInfo(user.user_id))[0];
      assert.deepEqual(actualData, user);
    } catch (error) {
      console.log(error);
      assert.fail();
    }
  });

  it('User.getUserInfo_string_userId', async () => {
    fakeDatabase.user.clearTables();
    const user = {
      user_id: 1,
      name: 'sqe',
      surname: 'nds',
      password: 'jksd',
      max_working_time: 100
    };
    fakeDatabase.user.usersTable.set(user.user_id, user);
    const stringUserId = 'beleberda';
    try {
      const actualData = await (await fakeDatabase.user.getUserInfo(stringUserId))[0];
    } catch (error) {
      //console.log(error)
      assert.equal(error.message, 'Number expected');
    }
  });

  it('User.getUserInfo_outOfRangeNumber_userId', async () => {
    fakeDatabase.user.clearTables();
    const user = {
      user_id: 1,
      name: 'sqe',
      surname: 'nds',
      password: 'jksd',
      max_working_time: 100
    };
    fakeDatabase.user.usersTable.set(user.user_id, user);
    const outOfRangeUserId = -100;
    try {
      const actualData = await (await fakeDatabase.user.getUserInfo(outOfRangeUserId))[0];
    } catch (error) {
      //console.log(error)
      assert.equal(error.message, 'User ID must be greater than or equal to 1');
    }
  });

  it('User.setMaxWorkingTime_correctInput', async () => {
    fakeDatabase.user.clearTables();
    const user = {
      user_id: 1,
      name: 'ssqe',
      surname: 'ndws',
      password: 'jksdd',
      max_working_time: 120
    };
    const user2 = {
      user_id: 1,
      name: 'ssqe',
      surname: 'ndws',
      password: 'jksdd',
      max_working_time: 200
    };


    fakeDatabase.user.usersTable.set(user.user_id, user);
    const newWorkingTime = user2.max_working_time;

    try {
      await fakeDatabase.user.setMaxWorkingTime(user.user_id, newWorkingTime);
      const actualData = fakeDatabase.user.usersTable.get(user2.user_id);
      assert.deepEqual(actualData, user2);
    } catch (error) {
      console.log(error);
      assert.fail();
    }
  });

  it('TaskStatus.addNewStatus_correctInput', async () => {
    fakeDatabase.taskStatus.clearTables();
    const newStatus = {
      status_id: 1,
      name: 'asdf'
    };

    try {
      await fakeDatabase.taskStatus.addNewStatus(newStatus.name);
      const actualData = fakeDatabase.taskStatus.taskStatusTable.get(newStatus.status_id);
      assert.deepEqual(actualData, newStatus);
    } catch (error) {
      console.log(error);
      assert.fail();
    }
  });

  it('TaskStatus.addNewStatus_emptyString_name', async () => {
    fakeDatabase.taskStatus.clearTables();
    const newStatus = {
      status_id: 1,
      name: ''
    };

    try {
      await fakeDatabase.taskStatus.addNewStatus(newStatus.name);
    } catch (error) {
      assert.equal(error.message, 'Not empty string expected');
    }
  });

  it('TaskStatus.addNewStatus_notString_name', async () => {
    fakeDatabase.taskStatus.clearTables();
    const newStatus = {
      status_id: 1,
      name: null
    };

    try {
      await fakeDatabase.taskStatus.addNewStatus(newStatus.name);
    } catch (error) {
      assert.equal(error.message, 'String expected');
    }
  });

  it('Task.addTask_correctInput', async () => {
    fakeDatabase.task.clearTables();
    const task = {
      task_id: 1,
      name: 'qdwd',
      description: 'descrd',
      complexity: 1,
      execution_time: 1200,
      status: 1
    };

    try {
      await fakeDatabase.task.addTask(task.name,
        task.description,
        task.complexity,
        task.execution_time,
        task.status);
      const actualData = fakeDatabase.task.tasksTable.get(task.task_id);
      assert.deepEqual(actualData, task);
    } catch (error) {
      console.log(error);
      assert.fail();
    }
  });

  it('Task.addTask_emptyString_name', async () => {
    fakeDatabase.task.clearTables();
    const task = {
      task_id: 1,
      name: '',
      description: 'descrd',
      complexity: 1,
      execution_time: 1200,
      status: 1
    };

    try {
      await fakeDatabase.task.addTask(task.name,
        task.description,
        task.complexity,
        task.execution_time,
        task.status);
      const actualData = fakeDatabase.task.tasksTable.get(task.task_id);
      assert.deepEqual(actualData, task);
    } catch (error) {
      assert.equal(error.message, 'Not empty string expected');
    }
  });
});

