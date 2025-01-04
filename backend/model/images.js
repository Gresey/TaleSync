const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Image', imageSchema);
