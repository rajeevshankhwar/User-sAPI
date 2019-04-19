const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const url = require('url');
const Joi = require('joi');

router.get('/', (req, res) => {
  let q = url.parse(req.url, true).query;
  const pageNo = parseInt(q.page);
  let limit = parseInt(q.limit);
  if (!limit) limit = 5
  const name = q.name;
  const regularExp = new RegExp(`.*${name}.*`, "i");

  const sor = q.sort.toString();
  const sortParameter = q.sort.substr(1);
  // const pageSize = 5;
  const query = { $or: [{ first_name: regularExp }, { last_name: regularExp }] };
  if (pageNo < 0 || pageNo === 0) {
    response = { "error": true, "message": "invalid page number, should start with 1" };
    return res.status(400).json(response)
  }
  let mysort
  if (q.sort != null) {
    if (q.sort.slice(0, 1) == '-') { mysort = { [sortParameter]: -1 }; }
    else {
      mysort = { [sor]: 1 }
    }
  }
  User.find(query, { _id: 0, __v: 0 })
    .limit(limit)
    .skip(limit * (pageNo - 1))
    .sort(mysort)
    .exec(function (err, result) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting User.',
          error: err
        });
      }
      return res.json(result);
    });


});


router.post('/', (req, res) => {
  const { error } = validateCustomer(req.body);
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
  user.save((err, user) => {
    if (err) {
      return res.status(500).json({
        message: 'Error when Creating User.',
        error: err
      });
    }
    return res.status(201).send(user);

  });

});

router.put('/:id', (req, res) => {
  const id = req.params.id;

  User.findOne({ id: id }, (err, User) => {
    if (err) {
      return res.status(500).json({
        message: 'Error when getting User',
        error: err
      });
    }
    if (!User) {
      return res.status(404).json({ message: 'User not found' });
    }

    User.first_name = req.body.first_name ? req.body.first_name : User.first_name;
    User.last_name = req.body.last_name ? req.body.last_name : User.last_name;
    User.age = req.body.age ? req.body.age : User.age;

    User.save((err, User) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when updating User.',
          error: err
        });
      }
      return res.status(200).json({});
    });
  });
});
router.delete('/:id', (req, res) => {
  var myquery = { id: req.params.id };
  // var id = req.params.id;

  User.deleteOne(myquery, (err, obj) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting TG.', error: err });
    }
    if (!obj) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: `user Deleted with given id ${req.params.id}` });
  });

});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ id: id }, { _id: 0, __v: 0 });

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(user);
});

module.exports = router;


//validation 
function validateCustomer(user) {
  const schema = {
    id: Joi.number().min(1).max(255).required(),
    first_name: Joi.string().min(5).max(50).required(),
    last_name: Joi.string().min(5).max(50).required(),
    company_name: Joi.string().min(5).max(100).required(),
    age: Joi.number().min(18).max(100).required(),
    city: Joi.string().min(0).max(50).required(),
    state: Joi.string().min(0).max(50).required(),
    Zip: Joi.number().min(0).max(999999).required(),
    email: Joi.string().min(0).max(100).required(),
    web: Joi.string().min(0).max(100).required(),

  };

  return Joi.validate(user, schema);
}
