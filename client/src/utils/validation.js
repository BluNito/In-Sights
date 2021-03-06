export const isEmpty = (value) => {
  if (typeof value === typeof "a") {
    if (value.trim() === "") return true;
    else return false;
  } else if (typeof value === typeof {}) {
    if (Object.keys(value).length === 0) {
      return true;
    } else {
      return false;
    }
  }
};

export const loginValidation = (credentials) => {
  let errors = {};
  if (isEmpty(credentials.username)) errors.username = "Please Enter Username";
  if (isEmpty(credentials.password)) errors.password = "Please Enter Password";
  if (!isEmpty(errors)) return errors;
};

export const registerValidation = (credentials) => {
  let errors = {};
  if (isEmpty(credentials.fname)) errors.fname = "Please Enter First Name";
  else if (credentials.fname.length < 2)
    errors.fname = "Name must be between 2 to 30 characters";
  if (isEmpty(credentials.lname)) errors.lname = "Please Enter Last Name";
  if (isEmpty(credentials.email)) errors.email = "Please Enter Valid Email";
  if (isEmpty(credentials.username)) errors.username = "Please Enter Username";
  if (isEmpty(credentials.password)) errors.password = "Please Enter Password";
  if (credentials.password !== credentials.password2)
    errors.password2 = "Passwords must match";
  if (!isEmpty(errors)) return errors;
};

export const updateValidation = (credentials) => {
  let errors = {};
  if (isEmpty(credentials.fname)) errors.fname = "Please Enter First Name";
  if (isEmpty(credentials.lname)) errors.lname = "Please Enter Last Name";
  if (isEmpty(credentials.email)) errors.email = "Please Enter Valid Email";
  if (isEmpty(credentials.username)) errors.username = "Please Enter Username";
  if (!isEmpty(errors)) return errors;
};

export const passwordValidation = (credentials) => {
  let errors = {};
  if (isEmpty(credentials.cpassword))
    errors.cpassword = "Please Enter Current Password";
  if (isEmpty(credentials.password))
    errors.password = "Please Enter New Password";
  if (isEmpty(credentials.password2))
    errors.password2 = "Please Enter New Password Again";
  if (credentials.password !== credentials.password2)
    errors.password2 = "Passwords must match";
  if (!isEmpty(errors)) return errors;
};

export const storyValdiation = (title, content) => {
  let errors = {};
  if (isEmpty(title)) errors.title = "Please add a title";
  if (isEmpty(content)) errors.content = "Please add some content";
  else if (content.length < 100)
    errors.content = "Please add more content(Atleast 100 characters)";
  if (!isEmpty(errors)) return errors;
};
