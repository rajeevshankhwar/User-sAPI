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


exports.User = User;
// exports.validate = validateCustomer;