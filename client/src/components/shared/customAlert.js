import React from "react";
import Alert from "@material-ui/lab/Alert";

export const CustomAlert = (props) => (
  <div className="alert-width-controller">
    <Alert severity={props.severity}>{props.content}</Alert>
  </div>
);

export const CenteredAlert = (props) => (
  <div className="centered-alert">
    <Alert severity={props.severity}>{props.content}</Alert>
  </div>
);
