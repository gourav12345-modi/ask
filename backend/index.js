const express = require("express")
const dotenv = require("dotenv")
const path = require("path")
const userRoutes = require("./routes/user.routes")
const questionRoutes = require("./routes/question.routes")
const answerRoutes = require("./routes/answer.routes")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const errorMiddleware = require("./middleware/error.middleware")

dotenv.config()
const app = express()
app.use(bodyParser.json())

const mongodbURI = process.env.MONGODB_URI
mongoose.connect(mongodbURI).then(() => {
  console.log('db connected')
});

app.get('/status', (req, res) => {
  return res.json({message: "server running."})
})
app.use('/api/user', userRoutes)
app.use('/api/question', questionRoutes)
app.use('/api/answer', answerRoutes)
app.use(errorMiddleware);
app.use(express.static('client/'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/', 'index.html'));
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
