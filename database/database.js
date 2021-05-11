'use strict';

const pool = require('./pool.js');
const queries = require('./database_resources/queries.json');

class User {
  static async addUser(name, surname, password, maxWorkingTime) {
    try {
      const query = queries['User.addUser'];
      const result = await pool.query(query, [name, surname, password, maxWorkingTime]);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserInfo(userId) {
    try {
      const query = queries['User.getUserInfo'];
      const result = await pool.query(query, [userId]);
      console.log(result.rows);
      return result.rows;
    } catch (error) {
      console.log(error);
    }
  }

  static async getUsers() {
    try {
      const query = queries['User.getUsers'];
      const result = await pool.query(query);
      console.log(result.rows);
      return result.rows;
    } catch (error) {
      console.log(error);
    }
  }

  static async setMaxWorkingTime(userId, time) {
    try {
      const query = queries['User.setMaxWorkingTime'];
      const result = await pool.query(query, [userId, time]);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserTasks(userId) {
    try {
      const query = queries['User.getUserTasks'];
      const result = await pool.query(query, [userId]);
      console.log(result.rows);
      return result.rows;
    } catch (error) {
      console.log(error);
    }
  }

  static async joinToTask(userId, taskId, timeSpent) {
    try {
      const query = queries['User.joinToTask'];
      const result = await pool.query(query, [userId, taskId, timeSpent]);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

class Task {
  static async getTaskInfo(taskId) {
    try {
      const query = queries['Task.getTaskInfo'];
      const result = await pool.query(query, [taskId]);
      console.log(result.rows);
      return result.rows;
    } catch (error) {
      console.log(error);
    }
  }

  static async getTaskUsers(taskId) {
    try {
      const query = queries['Task.getTaskUsers'];
      const result = await pool.query(query, [taskId]);
      console.log(result.rows);
      return result.rows;
    } catch (error) {
      console.log(error);
    }
  }

  static async setTaskStatus(taskId, statusId) {
    try {
      const query = queries['Task.setTaskStatus'];
      const result = await pool.query(query, [taskId, statusId]);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  static async addTask(name, descr, complexity, executionTime, status) {
    try {
      const query = queries['Task.addTask'];
      const result = await pool.query(query, [name, descr, complexity, executionTime, status]);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }


}

class TaskStatus {
  static async getStatuses() {
    try {
      const query = queries['TaskStatus.getStatuses'];
      const result = await pool.query(query);
      console.log(result.rows);
      return result.rows;
    } catch (error) {
      console.log(error);
    }
  }

  static async addNewStatus(name) {
    try {
      const query = queries['TaskStatus.addNewStatus'];
      const result = await pool.query(query, [name]);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = { User, Task, TaskStatus };
