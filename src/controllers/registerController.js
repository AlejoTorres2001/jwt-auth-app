const User = require('../models/User')
const bcrypt = require('bcrypt')
const handleNewUser = async (req, res) => {
  const { user, password } = req.body
  if (!user || !password) {
    return res
      .status(400)
      .json({ message: 'you must provide an user and password' })
  }
  const duplicate = await User.findOne({ username: user }).exec()
  if (duplicate) return res.status(409).json({ message: 'user already exists' })
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await User.create({
      username: user,
      password: hashedPassword
    })
    res.status(201).json({ message: `user ${user} created` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
module.exports = { handleNewUser }
