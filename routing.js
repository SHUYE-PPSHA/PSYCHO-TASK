'use strict';
const { Database } = require('./database/database.js');
const pool = require('./database/pool.js');
const database = new Database(pool);

const getRequestBody = async req => new Promise(resolve => {
  const body = [];
  req.on('data', chunk => {
    body.push(chunk);
  }).on('end', async () => {
    const data = body.join('');
    const args = JSON.parse(data);
    resolve(args);
  });
});

const routing = {
  '/user/getUserInfo': async (req, res) => {
    const body = await getRequestBody(req);
    //console.log(body);
    const arrData = await database.user.getUserInfo(body.userId);
    console.log(arrData)
    if (arrData.length === 0) {
      return arrData;
    }
    const data = arrData[0];
    const result = { userId: data.user_id,
      name: data.name, 
      surname: data.surname,
      maxWorkingTime: data.max_working_time
    }
    return [result]
  },

  '/user/getUsers': async (req, res) => {
    const arrData = await database.user.getUsers();
    console.log(arrData)
    if (arrData.length === 0) {
      return arrData;
    }
    const result = []
    for (const dataObj of arrData) {
      const obj = { userId: dataObj.user_id,
        name: dataObj.name, 
        surname: dataObj.surname,
        maxWorkingTime: dataObj.max_working_time
      }
      result.push(obj)
    }
    console.log(result)
    return result
  },

  '/task/getTaskInfo': async (req, res) => {
    const body = await getRequestBody(req);
    //console.log(body);
    const arrData = await database.task.getTaskInfo(body.taskId);
    console.log(arrData)
    return arrData;
  },

  '/taskStatus/getStatuses': async (req, res) => {
    const arrData = await database.taskStatus.getStatuses();
    console.log(arrData)
    return arrData;
  },
}

module.exports = routing;
