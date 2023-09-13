const express = require("express")
const questionController = require("../controllers/question.controller")
const authMiddleware = require("../middleware/auth.middleware")

const router = express.Router()
router.post('/', authMiddleware, questionController.createQuestion)
router.patch('/:id', authMiddleware, questionController.editQuestion)
router.get('/', questionController.getQuestions)

module.exports = router
