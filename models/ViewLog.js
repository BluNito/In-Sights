const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ViewLogSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  sid: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
});

module.exports = ViewLog = mongoose.model("viewlog", ViewLogSchema);
