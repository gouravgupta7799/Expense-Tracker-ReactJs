const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userShema = new Schema({
  displayName: {
    type: String,
  },
  photoUrl: {
    type: String,
  },
  userEmail: {
    type: String,
    require: true
  },
  userPassword: {
    type: String,
    require: true
  },
  isPrime: {
    type: Boolean,
    require: true
  },
})

module.exports = mongoose.model('User', userShema);