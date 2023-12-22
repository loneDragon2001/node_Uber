const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/Mak';

const connection = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  customerId: {
    type: Number,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = connection.model('User', userSchema,'user_registration');

module.exports = User;
