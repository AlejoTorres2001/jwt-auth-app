const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");
const usersDB = {
  users: require("../models/users"),
  setUsers: function (data) {
    this.users = data;
  },
};
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
    const roles = Object.values(foundUser.roles);
    if (match) {
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            roles: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "30s",
        }
      );
      const refreshToken = jwt.sign(
        {
          username: foundUser.username,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );
      const otherUsers = usersDB.users.filter(
        (u) => u.username !== foundUser.username
      );
      const currentUser = { ...foundUser, refreshToken };
      usersDB.setUsers([...otherUsers, currentUser]);
      await fsPromises.writeFile(
        path.join(__dirname, "..", "models", "users.json"),
        JSON.stringify(usersDB.users)
      );
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 60 * 60 * 1000,
      });
      return res.status(200).json({ accessToken });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  return res.status(401).json({ message: "login failed" });
};

module.exports = { handleLogin };
