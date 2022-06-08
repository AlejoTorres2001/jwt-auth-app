const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const handleLogin = async (req, res) => {
  const cookies = req.cookies;
  console.log(`cookie available at login ${JSON.stringify(cookies)}`);
  const { user, password } = req.body;
  if (!user || !password)
    return res
      .status(400)
      .json({ message: "you must provide an user and password" });
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401);
  try {
    const match = await bcrypt.compare(password, foundUser.password);
    const roles = Object.values(foundUser.roles).filter(Boolean);
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
      const newRefreshToken = jwt.sign(
        {
          username: foundUser.username,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );
      let newRefreshTokenArray = !cookies.jwt
        ? foundUser.refreshToken
        : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

      if (cookies?.jwt) {
        const refreshToken = cookies.jwt;
        const foundToken = await User.findOne({ refreshToken }).exec();

        //detected refreshToken reuse
        if (!foundToken) {
          newRefreshTokenArray = [];
        }
        res.clearCookie("jwt", {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
      }
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      const result = await foundUser.save();
      console.log(result);
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true, //! comment if testing via thunderclient
        maxAge: 60 * 60 * 1000,
      });
      return res.status(200).json({ accessToken, roles });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  return res.status(401).json({ message: "login failed" });
};

module.exports = { handleLogin };
