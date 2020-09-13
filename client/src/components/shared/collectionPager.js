import React from "react";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const CollectionPager = (props) => {
  return (
    <div className="page-footer">
      <IconButton
        onClick={() => props.onClick(0)}
        color="primary"
        disabled={!props.prev}
      >
        <NavigateBeforeIcon />
      </IconButton>
      <div className="page-footer-value">{props.page}</div>
      <IconButton
        onClick={() => props.onClick(1)}
        color="primary"
        disabled={!props.next}
      >
        <NavigateNextIcon />
      </IconButton>
    </div>
  );
};

export default CollectionPager;
