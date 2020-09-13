const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.content = !isEmpty(data.content) ? data.content : "";
  if (Validator.isEmpty(data.title)) {
    errors.title = "Story title is required";
  }
  if (!Validator.isLength(data.content, { min: 100, max: 5000 })) {
    errors.content =
      "Story must be alteast 100 characters and atmost 5000 chars";
  }
  if (Validator.isEmpty(data.content)) {
    errors.content = "Content is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
