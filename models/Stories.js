const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const StorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  totalView: {
    type: [String],
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
});

module.exports = Story = mongoose.model("stories", StorySchema);
