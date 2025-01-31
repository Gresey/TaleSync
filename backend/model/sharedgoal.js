const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  roomId: { type: String, required: true, index: true }, 
  users: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: String
    }
  ]
}, { timestamps: true }); // Automatically adds createdAt & updatedAt fields

module.exports = mongoose.model('Goal', GoalSchema);
