const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    min: [4, "Title should be 4 or more character long"]
  },
  body: {
    type: String,
    trim: true
  },
  tags: [{ type: String, trim: true }],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer',
  }],
  acceptedAnswer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer',
  },
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
