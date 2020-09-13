import React from "react";

const Logo = (props) => {
  return (
    <div className={`${props.light ? "header-logo" : "main-logo"}`}>
      InSights
    </div>
  );
};

export default Logo;
