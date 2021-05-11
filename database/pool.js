'use strict';

const { Pool } = require('pg');

const config = {
  host: 'localhost',
  port: 5432,
  database: 'psycho_task',
  user: 'psycho_task_user',
  password: '12345',
};

const pool = new Pool(config);

module.exports = pool;