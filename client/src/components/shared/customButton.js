import React from "react";
import Button from "@material-ui/core/Button";

const CustomButton = (props) => (
  <Button
    variant="contained"
    size="large"
    color="primary"
    type={props.type}
    onClick={props.handleClick}
  >
    {props.label}
  </Button>
);

export default CustomButton;
