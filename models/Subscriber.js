// models/Subscriber.js
const mongoose = require('mongoose');

const SubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Subscriber', SubscriberSchema);