const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find()
    .sort('-age')
    .limit(10)
    .skip(10 * (1 - 1));
  res.send(users);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = new User({
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    company_name: req.body.company_name,
    age: req.body.age,
    city: req.body.city,
    state: req.body.state,
    Zip: req.body.Zip,
    email: req.body.email,
    web: req.body.web

  });
  user = await user.save();

  res.status(201).send(user);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(req.params.id,
    {
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      company_name: req.body.company_name,
      age: req.body.age,
      city: req.body.city,
      state: req.body.state,
      Zip: req.body.Zip,
      email: req.body.email,
      web: req.body.web
    }, { new: true });

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(user);
});

router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(user);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(user);
});

module.exports = router; 