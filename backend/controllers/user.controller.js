const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

// controller to register a new user.
exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const userExists = await User.findOne({username})
    if(userExists)
      return res.status(409).json({username: "Username is already taken."})

    // validate input data
    const user = new User({
      username,
      password
    })

    await user.validate()

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10)
    user.password = hashedPassword

    await user.save()

    return res.status(201).json({ user })
  } catch (error) {
    next(error)
  }
}

// controller to login a user and generate JWT token
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username })
    if (!user)
      return res.status(401).json({ message: "Invalid credentials." })

    const passwordMatched = await bcrypt.compare(password, user.password)
    if (!passwordMatched)
      return res.status(401).json({ message: "Invalid credentials" })

    // generate a jwt token
    const token = jwt.sign({ userId: user._id, username }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    })

    return res.json({ token })
  } catch (error) {
    next(error)
  }
}
