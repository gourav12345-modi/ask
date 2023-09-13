const Question = require("../models/question.model")
const Answer = require("../models/answer.model")

exports.createQuestion = async (req, res, next) => {
  try {
    const { title, body, tags } = req.body;
    const userId = req.user.userId;
    const question = new Question({ title, body, tags, creator: userId });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    next(error)
  }
};

exports.editQuestion = async (req, res, next) => {
  try {
    const { title, body, tags } = req.body;
    const questionId = req.params.id;
    const userId = req.user.userId

    const updatedQuestion = await Question.findOneAndUpdate(
      { _id: questionId, creator: userId },
      {
        title, body, tags
      },
      { new: true },
    )

    if (!updatedQuestion)
      return res.status(404).json({ message: "Question not found." })

    return res.json(updatedQuestion);
  } catch (error) {
    next(error)
  }
};

exports.getQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    return res.json(questions)
  } catch (error) {
    next(error)
  }
}

exports.getQuestionById = async (req, res, next) => {
  try {
    const questionId = req.params.id
    const question = await Question.findById(questionId).populate([
      {
        path: 'answers',
        select: "body createdAt",
        populate: [{ path: 'answeredBy', select: "username" }],
        options: { sort: { 'createdAt': -1 } }
      }
    ]);
    if (!question)
      return res.status(404).json({ message: "Question not found." })

    return res.json(question)
  } catch (error) {
    next(error)
  }
}

exports.acceptAnswer = async (req, res, next) => {
  try {
    const questionId = req.params.questionId;
    const answerId = req.params.answerId;
    const userId = req.user.userId

    const question = await Question.findById(questionId);
    const answer = await Answer.findById(answerId);

    if (!question || !answer) {
      return res.status(404).json({ message: 'Question or answer not found' });
    }

    // Check if the user making the request is the owner of the question
    if (userId !== question.creator.toString()) {
      return res.status(403).json({ message: 'You are not allowed to accept answers for this question' });
    }

    // Mark the answer as accepted
    question.acceptedAnswer = answerId;
    await question.save();

    res.status(200).json({ message: 'Answer accepted successfully' });
  } catch (error) {
    next(error)
  }
};

exports.getQuestionsByQuery = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    // Split the tags query by commas to get an array of tags
    const tagArray = query.split(',').map(tag => tag.trim().toUpperCase());

    // Find questions that have at least one of the specified tags
    const questions = await Question.find({ tags: { $in: tagArray } });

    return res.json(questions);
  } catch (error) {
    next(error)
  }


}
