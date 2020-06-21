const router = require('express').Router()
const db = require('./stories-model');

router.get('/', (req, res) => {
  db.get()
    .then(res => {
      res.status(200).json(res)
    })
    .catch((err) => {
      res.status(500).json({error: 'Error getting.'})
    })
})

router.get('/:id', (req, res) => {

})