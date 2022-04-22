const express = require('express');
const router = require('./routes');
const { PORT } = require('../config');

const app = express();

app.use(express.json());

app.use('/', router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
