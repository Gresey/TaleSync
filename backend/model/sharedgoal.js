const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  roomId: { type: String, required: true }, // goals are linked to a specific room
  users: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: String
    }
  ],
});

module.exports = mongoose.model('Goal', GoalSchema);
