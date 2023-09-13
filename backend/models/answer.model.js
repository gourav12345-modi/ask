const mongoose = require("mongoose")

const answerSchema = new mongoose.Schema({
  body: {
    type: String,
    trim: true,
    required: true,
    min: [4, "body should be 4 or more character long"]
  },
  answeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  },
}, { timestamps: true });

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
