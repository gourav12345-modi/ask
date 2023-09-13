const express = require("express")
const answerController = require("../controllers/answer.controller")
const authMiddleware = require("../middleware/auth.middleware")

const router = express.Router()
router.post('/:questionId', authMiddleware, answerController.createAnswer)

module.exports = router
