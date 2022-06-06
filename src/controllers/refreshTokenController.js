const jwt = require("jsonwebtoken");
require("dotenv").config();
const usersDB = {
  users: require("../models/users"),
  setUsers: function (data) {
    this.users = data;
  },
};
const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const foundUser = usersDB.users.find((u) => u.refreshToken === refreshToken);
  if (!foundUser) return res.sendStatus(403);
  try {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || decoded.username !== foundUser.username) {
          console.log(err);
          return res.sendStatus(403);
        }
        const accessToken = jwt.sign(
          {
            username: decoded.username,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30s",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = handleRefreshToken;
