'use strict';

const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'psycho_task',
  user: 'psycho_task_user',
  password: '12345',
});

module.exports = pool;