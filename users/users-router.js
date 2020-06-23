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

router.get('/:id', (req, res) => {
  const id = req.params.id
  Users.findById(id)
    .then(user => {
      res.status(200).json({user})
    })
    .catch(err => {
      res.status(500).json({message: err.message})
    })
})

module.exports = router;