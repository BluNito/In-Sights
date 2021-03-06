import React from "react";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useHistory } from "react-router-dom";
import moment from "moment";

const StoryTables = (props) => {
  const history = useHistory();
  return (
    <div className="story-tables">
      <Paper variant="outlined">
        <div className="table-header">
          <div className="table-title">{props.title}</div>
          {props.action ? props.action : <div />}
        </div>
        {props.content ? (
          <List>
            {props.content.map((item) => (
              <ListItem
                key={item.storyId}
                button={true}
                divider={true}
                onClick={() => history.push(`/story/read/${item.storyId}`)}
              >
                <ListItemText primary={item.title} />
                <ListItemSecondaryAction>
                  {props.show ? (
                    <div className="other-info">
                      {moment(item.date).fromNow()}
                    </div>
                  ) : (
                    <div className="view-count">
                      <VisibilityIcon color="primary" />
                      <div className="view-count-value">{item.totalView}</div>
                    </div>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
            {props.footer ? <ListItem>{props.footer}</ListItem> : <div />}
          </List>
        ) : (
          <div />
        )}
      </Paper>
    </div>
  );
};

export default StoryTables;
