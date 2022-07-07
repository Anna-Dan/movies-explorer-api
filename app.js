require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const router = require('./routes/index');
const { developDataBaseUrl } = require('./utils/config');

const { PORT = 3000, NODE_ENV, DATA_BASE_URL } = process.env;
const app = express();

mongoose.connect(
  NODE_ENV === 'production' ? DATA_BASE_URL : developDataBaseUrl,
  {
    useNewUrlParser: true,
  },
);

app.listen(PORT);

app.use(bodyParser.json());
app.use(cors);
app.use(helmet());

app.use(requestLogger);
app.use(limiter);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
