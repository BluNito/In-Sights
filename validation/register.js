const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.fname = !isEmpty(data.fname) ? data.fname : "";
  data.lname = !isEmpty(data.lname) ? data.lname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.fname, { min: 3, max: 30 })) {
    errors.fname = "Name must be between 3 and 30 characters";
  }
  if (Validator.isEmpty(data.fname)) {
    errors.fname = "First name is required";
  }
  if (Validator.isEmpty(data.lname)) {
    errors.lname = "Last name is required";
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be alteast 6 characters";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
