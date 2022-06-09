const jwt = require("jsonwebtoken");
const User = require("../models/User");
const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  const foundUser = await User.findOne({ refreshToken }).exec();

  //Detected refresh token reuse
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.sendStatus(403);
        console.log('attempted refresh token reuse');
        const hackedUser = await User.findOne({
          username: decoded.username,
        }).exec();
        hackedUser.refreshToken = [];
        const result = await hackedUser.save();
        console.log(result);
      }
    );
    return res.sendStatus(403);
  }
  //valid refresh token ready to use and grant accessToken
  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        console.log('expired refresh token')
        foundUser.refreshToken = [...newRefreshTokenArray];
        const result = await foundUser.save();
      }
      if (err || decoded.username !== foundUser.username) {
        console.log(err);
        return res.sendStatus(403);
      }
      // refresh token is still valid
      const roles = Object.values(foundUser.roles);
      const accessToken = jwt.sign(
        {
          userInfo: {
            username: decoded.username,
            roles: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "10s",
        }
      );

      const newRefreshToken = jwt.sign(
        {
          username: foundUser.username,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "15s",
        }
      );
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      const result = await foundUser.save();
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true, //! comment if testing via thunderclient
        maxAge: 60 * 60 * 1000,
      });
      res.json({ roles, accessToken });
    }
  );
};

module.exports = handleRefreshToken;
