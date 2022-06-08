const User = require ("../models/User");

const handleLogOut = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return res.sendStatus(204);
  }

  const currentUser = await User.findByIdAndUpdate(foundUser._id, { refreshToken: '' }).exec();
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.sendStatus(204);
};

module.exports = handleLogOut;
