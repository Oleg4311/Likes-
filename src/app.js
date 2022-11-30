require('dotenv').config();
require('@babel/register');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const main = require('./routers/mainRouter');
const registerRouter = require('./routers/registerRouter');
const loginRouter = require('./routers/loginRouter');
const logoutRouter = require('./routers/logoutRouter');
const allPosts = require('./routers/allPosts');
const cors = require('./middlewares/cors');

const { PORT } = process.env;
const { sequelize } = require('../db/models');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public/')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  name: 'Sessions',
  store: new FileStore(),
  secret: process.env.SECRET || 'privet samoobuchenie',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));

app.use('/signup', registerRouter);
app.use('/signin', loginRouter);
app.use('/', main);
app.use('/allPosts', cors, allPosts);
app.use('/logout', cors, logoutRouter);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database is connected!');
  } catch (error) {
    console.error('Database is not connected!', error.message);
  }
  console.log(`Server is started on ${PORT} port!`);
});
