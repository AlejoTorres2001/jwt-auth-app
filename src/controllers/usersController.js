const Users= require('../models/User');
const getAllUsers = async (req, res) => {
  const users = await Users.find();
  if (!users) return res.status(204).json({ 'message': 'No employees found.' });
  res.json(users);
}

module.exports = getAllUsers;