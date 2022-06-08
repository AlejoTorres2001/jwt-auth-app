const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    const result = rolesArray
      .map((role) => req.roles.includes(role))
      .every((val) => val === true);
    if (!result) return res.sendStatus(401);
    next();
  };
};
module.exports = verifyRoles;
