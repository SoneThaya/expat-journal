const router = require('express').Router()
const Stories = require('./stories-model');


router.get('/', (req, res) => {
  Stories.get()
    .then(stories => {
      res.status(200).json(stories)
    })
    .catch((err) => {
      res.status(500).json({error: 'Error getting stories.'})
    })
})

// router.get('/:id', (req, res) => {
//   res.status(200).json(req.story)
// })


module.exports = router;