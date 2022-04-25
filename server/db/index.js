const { Pool } = require('pg');
const { USER, HOST, DB, DBPORT } = require('../../config.js');

const db = new Pool({
  user: USER,
  host: HOST,
  database: DB,
  port: DBPORT,
});

db.connect((err) => console.log(err));

module.exports = { db };
