const usersDB = {
  users: require("../models/users"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const handleLogOut = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;
  const foundUser = usersDB.users.find((u) => u.refreshToken === refreshToken);
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 60 * 60 * 1000 });
    return res.sendStatus(204);
  }
  const otherUsers = usersDB.users.filter(
    (u) => u.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  usersDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "models", "users.json"),
    JSON.stringify(usersDB.users)
  );
  res.clearCookie("jwt", { httpOnly: true, maxAge: 60 * 60 * 1000 });
  res.sendStatus(204);
};

module.exports = handleLogOut;
