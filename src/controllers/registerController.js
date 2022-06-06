const usersDB = {
  users: require("../models/users"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password) {
    return res
      .status(400)
      .json({ message: "you must provide an user and password" });
  }
  const duplicate = usersDB.users.find((u) => u.username === user);
  if (duplicate)
    return res.status(409).json({ message: "user already exists" });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username: user, password: hashedPassword };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(usersDB.users)
    );
    res.status(201).json({ message: `user ${user} created` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { handleNewUser };
