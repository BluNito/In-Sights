const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  let isEmail = false;

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  } else if (Validator.isEmail(data.username)) {
    isEmail = true;
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be alteast 6 characters";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
    isEmail,
  };
};
