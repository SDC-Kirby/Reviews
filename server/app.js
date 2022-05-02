require('newrelic');
const express = require('express');
const router = require('./routes');
const { PORT } = require('../config');

const app = express();

app.use(express.json());

app.options("/*", function(req, res){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});

app.use('/', router);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
