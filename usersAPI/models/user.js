const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  id: {
    type: Number,
    min: 1,
    max: 255,
    required: true
  },
  first_name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  last_name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  company_name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  age: {
    type: Number,
    min: 18,
    max: 100,
    required: true
  },
  city: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 50
  },
  state: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 50
  },
  Zip: {
    type: Number,
    min: 0,
    max: 999999,
    required: true
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  web: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100
  }
}));

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

exports.User = User;
exports.validate = validateCustomer;