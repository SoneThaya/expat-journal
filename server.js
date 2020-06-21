const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router')
const storiesRouter = require('./stories/stories-router')

const server = express();

server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/stories', storiesRouter);

server.get('/', (req, res) => {
  res.json({api: 'up and running'})
})

module.exports = server;