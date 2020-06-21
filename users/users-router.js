const router = require('express').Router();

const Users = require('./users-model');
const restricted = require('../auth/restricted-middleware');

router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json({users, decodedToken: req.decodedToken})
    })
    .catch(err => res.send(err))
})

module.exports = router;