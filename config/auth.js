const jwt = require("jsonwebtoken");
const keys = require("./keys");

const isUser = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(203).json({
      message: "unauthorized",
    });
  } else {
    token = token.slice(7, token.length);
    jwt.verify(token, keys.mainKey, (err, payload) => {
      if (err) {
        return res.status(203).json({
          message: "unauthorised",
        });
      } else {
        if (payload.clearance >= 1) {
          req.user = {
            id: payload.id,
          };
          next();
        } else {
          return res.status(203).json({
            message: "unauthorized",
          });
        }
      }
    });
  }
};

module.exports = {
  isUser,
};
