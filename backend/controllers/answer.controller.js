const Question = require("../models/question.model")
const Answer = require("../models/answer.model")

exports.createAnswer = async (req, res, next) => {
  try {
    const { body } = req.body;
    const userId = req.user.userId;
    const questionId = req.params.questionId;
    const question = await Question.findById(questionId);
    
    if (!question) {
      return res.status(404).json({ error: "Question not found." });
    }

    const answer = new Answer({ body, answeredBy: userId, question: questionId });
    await answer.save();
    
    question.answers.push(answer._id);
    await question.save();
    
    res.status(201).json(answer);
  } catch (error) {
    next(error)
  }
};

