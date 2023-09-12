const express = require("express")

app = express()

app.get('/status', (req, res) => {
  return res.json({message: "server running."})
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
