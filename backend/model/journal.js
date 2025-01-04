const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  username: { type: String, required: true },
  roomId: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: Date, required: true },
});

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;
