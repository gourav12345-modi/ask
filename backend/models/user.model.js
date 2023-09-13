const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    require: [true, "Please enter Username."],
    minLength: [4, "Username should be 4 or more character long."]
  },
  password: {
    type: String,
    trim: true,
    require: [true, "Please enter Password."],
    minLength: [4, "Password should be 4 or more character long."]
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User;