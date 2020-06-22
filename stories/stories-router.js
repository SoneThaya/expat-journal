const router = require('express').Router()
const Stories = require('./stories-model');
const { isLoggedIn } = require('../middleware/authMiddleware')



router.get('/', (req, res) => {
  Stories.get()
    .then(stories => {
      res.status(200).json(stories)
    })
    .catch((err) => {
      res.status(500).json({errMessage: err.message})
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id;

  Stories.getByStoryId(id)
    .then(story => {
      res.status(200).json({story})
    })
    .catch(err => {
      res.status(500).json({message: err.message})
    })
})

router.get('/my-stories', isLoggedIn, (req, res) => {
  Stories.getStoriesByUserId(req.user_id)
    .then(stories => {
      res.status(200).json(stories)
    })
    .catch(err => {
      res.status(500).json({errMessage: err.message})
    })
})

router.post('/', isLoggedIn, (req, res) => {
  const newStory = {
    ...req.body,
    user_id: req.user_id
  };

  Stories.insert(newStory)
    .then(([response]) => {
      if (response) {
        Stories.getByStoryId(response)
          .then(response => {
            res.status(200).json(response)
          })
          .catch(err => {
            res.status(401).json({errMessage: err.message})
          })
      } else {
        res.status(400).json({message: 'No user id provided'})
      }
    })
    .catch(err => {
      res.status(500).json({errMessage: err.message})
    })
})

router.put('/:id', isLoggedIn, (req, res) => {
  const changes = req.body;
  const id = req.params.id;

  Stories.update(id, changes)
    .then(updateStory => {
      if (updateStory) {
        Stories.getByStoryId(id)
          .then(newStory => {
            res.status(200).json(newStory)
          })
          .catch(err => {
            res.status(500).json({errMessage: err.message})
          })
      } else {
        res.status(400).json({message: 'That story id does not exist.'})
      }
    })
    .catch(err => {
      res.status(500).json({errMessage: err.message})
    })
})

router.delete('/:id', isLoggedIn, (req, res) => {
  Stories.remove(req.params.id)
    .then(() => {
      res.status(200).json({message: 'Successfully deleted story'})
    })
    .catch(err => {
      res.status(500).json({errMessage: err.message})
    })
})


module.exports = router;