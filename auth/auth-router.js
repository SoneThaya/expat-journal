const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

const Users = require('../users/users-model')
const { isValid } = require('../users/users-service')
const constants = require('../config/constants')

router.post('/register', (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8

    const hash = bcryptjs.hashSync(credentials.password, rounds)

    credentials.password = hash;

    Users.add(credentials)
      .then(user => {
        res.status(201).json({ data: user });
      })
      .catch(err => {
        res.status(500).json({ message: error.message })
      })
  } else {
    res.status(400).json({
      message: 'Please provide username and password.'
    })
  }
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = createToken(user);

          res.status(200).json({ token, message: 'Welcome' })
        } else {
          res.status(401).json({ message: 'Invalid credentials.' })
        }
      })
      .catch(err => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message: 'Please provide username and password.'
    });
  }
});

function createToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }
  const secret = constants.jwtSecret;
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(payload, secret, options)
}

module.exports = router;