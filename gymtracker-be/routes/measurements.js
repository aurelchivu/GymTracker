const router = require('express').Router();
let Measurement = require('../models/measurement.model');

router.route('/').get((req, res) => {
  Measurement.find()
    .then(measurement => res.json(measurement))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const measurement = Number(req.body.measurement);
  const date = Date.parse(req.body.date);

  const newExercise = new Measurement({
    username,
    description,
    measurement,
    date,
  });

  newExercise.save()
  .then(() => res.json('Measurement added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Measurement.findById(req.params.id)
    .then(measurement => res.json(measurement))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Measurement.findByIdAndDelete(req.params.id)
    .then(() => res.json('Measurement deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Measurement.findById(req.params.id)
    .then(measurement => {
      measurement.username = req.body.username;
      measurement.description = req.body.description;
      measurement.measurement = Number(req.body.measurement);
      measurement.date = Date.parse(req.body.date);

      measurement.save()
        .then(() => res.json('Measurement updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
      })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
