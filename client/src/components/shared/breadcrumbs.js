import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";

const CustomCrumbs = (props) => {
  return (
    <div className="bread-crumbs">
      <Breadcrumbs aria-label="breadcrumb">
        {props.links.map((e, index) => (
          <Link to={e.link} key={index}>
            {e.name}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default CustomCrumbs;
