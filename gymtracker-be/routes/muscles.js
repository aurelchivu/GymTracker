const router = require('express').Router();
let Muscle = require('../models/muscle.model');

router.route('/').get((req, res) => {
  Muscle.find()
    .then(muscle => res.json(muscle))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const date = Date.parse(req.body.date);

  const newMuscle = new Muscle({
    username,
    description,
    date,
  });

  newMuscle.save()
  .then(() => res.json('Muscle added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Muscle.findById(req.params.id)
    .then(muscle => res.json(muscle))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Muscle.findByIdAndDelete(req.params.id)
    .then(() => res.json('Muscle deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Muscle.findById(req.params.id)
    .then(muscle => {
      muscle.username = req.body.username;
      muscle.description = req.body.description;
      muscle.date = Date.parse(req.body.date);

      muscle.save()
        .then(() => res.json('Muscle updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
      })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
