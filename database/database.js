'use strict';

const pool = require('./pool.js');
const queries = require('./database_resources/queries.json');

class Database {
  constructor(pool) {
    this.pool = pool;
    this.user = new User(pool);
    this.task = new Task(pool);
    this.taskStatus = new TaskStatus(pool);
  }

  async initialization(sqlScript) {
    await this.pool.query(sqlScript);
  }

  close() {
    this.pool.end();
  }
}

class User {
  constructor(pool) {
    this.pool = pool;
  }

  async addUser(name, surname, password, maxWorkingTime) {
    if (
      typeof name !== 'string' ||
      typeof surname !== 'string' ||
      typeof password !== 'string'
    ) {
      throw new Error('The values of the variables name, surname, password must be string');
    }

    if (maxWorkingTime < 0) {
      throw new Error('User max working time must be greater than or equal to 0');
    }
    try {
      const query = queries['User.addUser'];
      const result = await this.pool.query(query, [name, surname, password, maxWorkingTime]);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async getUserInfo(userId) {
    if (typeof userId !== 'number') {
      throw new Error('Number expected');
    }
    if (userId < 1) {
      throw new Error('User ID must be greater than or equal to 1');
    }

    try {
      const query = queries['User.getUserInfo'];
      const result = await this.pool.query(query, [userId]);
      return result.rows;
    } catch (error) {
      console.log(error);
    }
  }

  async getUsers() {
    try {
      const query = queries['User.getUsers'];
      const result = await this.pool.query(query);
      console.log(result.rows);
      return result.rows;
    } catch (error) {
      console.log(error);
    }
  }

  async setMaxWorkingTime(userId, time) {
    if (typeof userId !== 'number' || typeof time !== 'number') {
      throw new Error('Number expected');
    }
    if (userId < 1) {
      throw new Error('User ID must be greater than or equal to 1');
    }
    if (time <= 0) {
      throw new Error('The time spent cannot be less than 0');
    }

    try {
      const query = queries['User.setMaxWorkingTime'];
      const result = await this.pool.query(query, [userId, time]);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async getUserTasks(userId) {
    try {
      const query = queries['User.getUserTasks'];
      const result = await this.pool.query(query, [userId]);
      console.log(result.rows);
      return result.rows;
    } catch (error) {
      console.log(error);
    }
  }

  async joinToTask(userId, taskId, timeSpent) {
    if ((userId < 1) || (taskId < 1)) {
      throw new Error('User ID and Task ID must be greater than or equal to 1');
    }
    if (timeSpent <= 0) {
      throw new Error('The time spent cannot be less than 0');
    }

    try {
      const query = queries['User.joinToTask'];
      const result = await this.pool.query(query, [userId, taskId, timeSpent]);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

class Task {
  constructor(pool) {
    this.pool = pool;
  }

  async getTaskInfo(taskId) {
    if (typeof taskId !== 'number') {
      throw new Error('Number expected');
    }
    if (taskId < 1) {
      throw new Error('User ID must be greater than or equal to 1');
    }
    try {
      const query = queries['Task.getTaskInfo'];
      const result = await this.pool.query(query, [taskId]);
      console.log(result.rows);
      console.log(result);
      return result.rows;
    } catch (error) {
      console.log(error.message);
      //throw new Error(error.message)
    }
  }

  async getTaskUsers(taskId) {
    try {
      const query = queries['Task.getTaskUsers'];
      const result = await this.pool.query(query, [taskId]);
      console.log(result.rows);
      return result.rows;
    } catch (error) {
      console.log(error);
    }
  }

  async setTaskStatus(taskId, statusId) {
    try {
      const query = queries['Task.setTaskStatus'];
      const result = await this.pool.query(query, [taskId, statusId]);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async addTask(name, descr, priority, executionTime, status) {
    if (typeof name !== 'string' || typeof descr !== 'string') {
      throw new Error('String expected');
    }
    if (!name || !descr) {
      throw new Error('Not empty string expected');
    }
    if ((priority < 1) || (status < 1)) {
      throw new Error('Task priority ID and Task status ID must be greater than or equal to 1');
    }
    if (executionTime <= 0) {
      throw new Error('The execution time cannot be less than 0');
    }

    try {
      const query = queries['Task.addTask'];
      const result = await this.pool.query(query, [name, descr, priority, executionTime, status]);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

}

class TaskStatus {
  constructor(pool) {
    this.pool = pool;
  }

  async getStatuses() {
    try {
      const query = queries['TaskStatus.getStatuses'];
      const result = await this.pool.query(query);
      console.log(result.rows);
      return result.rows;
    } catch (error) {
      console.log(error);
    }
  }

  async addNewStatus(name) {
    if (typeof name !== 'string') {
      throw new Error('String expected');
    }
    if (!name) {
      throw new Error('Not empty string expected');
    }

    try {
      const query = queries['TaskStatus.addNewStatus'];
      const result = await this.pool.query(query, [name]);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = { Database };
