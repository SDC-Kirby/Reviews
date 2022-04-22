const { Pool } = require('pg');

const db = new Pool({
  user: 'kateanderson',
  host: 'localhost',
  database: 'sdc',
  port: '5432',
});

db.connect((err) => console.log(err));

module.exports = { db };
