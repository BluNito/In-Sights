import React from "react";

export const FloaterContainer = (props) => (
  <div className="floater-container">{props.children}</div>
);

export const Floater = (props) => (
  <div className="floater">
    <div className="floater-label">{props.label}</div>
    <div className="floater-value">{props.value}</div>
  </div>
);
