const router = require('express').Router()
const Stories = require('./stories-model');
const { isLoggedIn, isValidUserEditStory  } = require('../middleware/authMiddleware')



router.get('/', (req, res) => {
  console.log(req.decodedToken)
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

router.get('/:id/my-stories', isLoggedIn, (req, res) => {
  Stories.getStoriesByUserId(req.params.id)
    .then(stories => {
      res.status(200).json(stories)
    })
    .catch(err => {
      res.status(500).json({errMessage: err.message})
    })
})

// router.post('/', isLoggedIn, (req, res) => {
//   const newStory = {
//     ...req.body,
//     user_id: req.user_id
//   };

//   Stories.insert(newStory)
//     .then(([response]) => {
//       if (response) {
//         Stories.getByStoryId(response)
//           .then(response => {
//             res.status(200).json(response)
//           })
//           .catch(err => {
//             res.status(401).json({errMessage: err.message})
//           })
//       } else {
//         res.status(400).json({message: 'No user id provided'})
//       }
//     })
//     .catch(err => {
//       res.status(500).json({errMessage: err.message})
//     })
// })

router.post("/", isLoggedIn, (req, res) => {
  const story = req.body
  story.user_id = req.decodedToken.subject
  
  Stories.insert(story)
    .then((result) => {
      res.status(201).send();
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: "error connecting to database" });
    });
});

router.put('/:id', isLoggedIn, (req, res) => {
  
  // req.body.user_id = req.decodedToken.subject
  const changes = { ...req.body,  user_id: req.decodedToken.subject };
  const id = req.params.id;

  Stories.update(Number(id), changes)
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
  const id = req.params.id

  Stories.remove(Number(id))
    .then((result) => {
      if (result === 1) {
        res.status(202).json({message: 'Successfully deleted story'})
      }
    })
    .catch(err => {
      res.status(500).json({errMessage: err.message})
    })
})


module.exports = router;