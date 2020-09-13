import React from "react";
import Paper from "@material-ui/core/Paper";

const StoryPaper = (props) => (
  <Paper variant="outlined" elevation={0}>
    <div className="story-paper">{props.children}</div>
    <div className="story-author">- {props.author}</div>
  </Paper>
);

export default StoryPaper;
