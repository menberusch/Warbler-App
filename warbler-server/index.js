require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const router = require('./routes');

const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);

app.use((req,res,next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server us starting on port ${PORT}`);
});