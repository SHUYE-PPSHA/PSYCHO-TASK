'use strict';

class User {
  constructor(pool) {
    this.pool = pool;
    this.usersTable = new Map();
    this.userTasksTable = new Set();
    //this.currentRecordNumberInUsersTable = 1;
    //this.currentRecordNumberInUserTasksTable = 1;
    this.currentUserId = 1;
  }

  clearTables() {
    this.usersTable.clear();
    this.userTasksTable.clear();
    this.currentUserId = 1;
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
    this.usersTable.set(
      this.currentUserId,
      { user_id: this.currentUserId,
        name,
        surname,
        password,
        max_working_time: maxWorkingTime
      });
    this.currentUserId++;
  }

  async getUserInfo(userId) {
    if (typeof userId !== 'number') {
      throw new Error('Number expected');
    }
    if (userId < 1) {
      throw new Error('User ID must be greater than or equal to 1');
    }
    const result = this.usersTable.get(userId);
    return [result];
  }

  async getUsers() {
    return this.usersTable.values();
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
    this.usersTable.get(userId).max_working_time = time;
  }

  async getUserTasks(userId) {
    //TODO
  }

  async joinToTask(userId, taskId, timeSpent) {
    if ((userId < 1) || (taskId < 1)) {
      throw new Error('User ID and Task ID must be greater than or equal to 1');
    }
    if (timeSpent <= 0) {
      throw new Error('The time spent cannot be less than 0');
    }

    this.userTasksTable.add({ user_id: userId, task_id: taskId, time_spent: timeSpent });
  }
}

class TaskStatus {
  constructor(pool) {
    this.pool = pool;
    this.taskStatusTable = new Map();
    this.currentStatusId = 1;
  }

  clearTables() {
    this.taskStatusTable.clear();
    this.currentStatusId = 1;
  }


  async getStatuses() {
    return this.taskStatusTable.values();
  }

  async addNewStatus(name) {
    if (typeof name !== 'string') {
      throw new Error('String expected');
    }
    if (!name) {
      throw new Error('Not empty string expected');
    }
    this.taskStatusTable.set(this.currentStatusId, { status_id: this.currentStatusId, name });
    this.currentStatusId++;
  }
}

class Task {
  constructor(pool) {
    this.pool = pool;
    this.tasksTable = new Map();
    this.currentTaskId = 1;

  }

  clearTables() {
    this.tasksTable.clear();
    this.currentTaskId = 1;
  }


  async getTaskInfo(taskId) {
    if (typeof taskId !== 'number') {
      throw new Error('Number expected');
    }
    if (taskId < 1) {
      throw new Error('User ID must be greater than or equal to 1');
    }

    const result = this.tasksTable.get(taskId);
    return [result];
  }

  async getTaskUsers(taskId) {
    //TODO
  }

  async setTaskStatus(taskId, statusId) {
    //TODO
  }

  async addTask(name, descr, complexity, executionTime, status) {
    if (typeof name !== 'string' || typeof descr !== 'string') {
      throw new Error('String expected');
    }
    if (!name || !descr) {
      throw new Error('Not empty string expected');
    }
    if ((complexity < 1) || (status < 1)) {
      throw new Error('Task complexity ID and Task status ID must be greater than or equal to 1');
    }
    if (executionTime <= 0) {
      throw new Error('The execution time cannot be less than 0');
    }

    this.tasksTable.set(this.currentTaskId, { task_id: this.currentTaskId,
      name,
      description: descr,
      complexity,
      execution_time: executionTime,
      status });
  }
}

class FakeDatabase {
  constructor(pool) {
    this.pool = pool;
    this.user = new User(pool);
    this.task = new Task(pool);
    this.taskStatus = new TaskStatus(pool);
  }
}

module.exports = { FakeDatabase };
