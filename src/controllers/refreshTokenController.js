const jwt = require("jsonwebtoken");
const User = require ("../models/User");
const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
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
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
          {
            userInfo:{
              username: decoded.username,
              roles: roles,

            }
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
