const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  recents: {
    type: [
      {
        sid: String,
        date: Date,
      },
    ],
    required: true,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
