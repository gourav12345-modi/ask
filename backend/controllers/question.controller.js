const Question = require("../models/question.model")

exports.createQuestion = async (req, res, next) => {
  try {
    const { title, body, tags } = req.body;
    const userId = req.user.id;
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
    const userId = req.user.id
    
    const updatedQuestion = await Question.findOneAndUpdate(
      {_id: questionId, creator: userId},
      {
        title, body, tags
      },
      { new: true },
    )

    if (!updatedQuestion) 
      return res.status(404).json({message: "Question not found."})

    return res.json(updatedQuestion);
  } catch (error) {
    next(error)
  }
};

exports.getQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find();
    return res.json(questions)
  } catch(error) {
    next(error)
  }
}

exports.getQuestionById = async (req, res, next) => {
  try {
    const questionId = req.params.id 
    const question = await Question.findById(questionId)
    if(!question) 
      return res.status(404).json({message: "Question not found."})
    
    return res.json(question)
  } catch(error) {
    next(error)
  }
}
