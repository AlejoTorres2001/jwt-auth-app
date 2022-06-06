const usersDB = {
  users: require("../models/users"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");
const handleLogin = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password)
    return res
      .status(400)
      .json({ message: "you must provide an user and password" });
  const foundUser = usersDB.users.find((u) => u.username === user);
  if (!foundUser) return res.status(401);
  try {
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      //send JWT
      return res.status(200).json({ message: "login successful" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  return res.status(401).json({ message: "login failed" });
};

module.exports = { handleLogin };