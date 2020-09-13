import React, { useState } from "react";
import Header from "./shared/header";
import CustomCrumbs from "./shared/breadcrumbs";
import TextField from "@material-ui/core/TextField";
import Divider from "./shared/divider";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Footer from "./shared/footer";
import { submitStory } from "../store/actions/storyActions";
import { connect } from "react-redux";
import { CustomAlert } from "./shared/customAlert";

const Writer = (props) => {
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [dialogState, setDialogState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState({});

  const handleTitle = (event) => {
    setTitle(event.currentTarget.value);
  };

  const handleStory = (event) => {
    setStory(event.currentTarget.value);
  };

  const handleOpen = () => {
    setDialogState(true);
  };
  const handleClose = () => {
    setDialogState(false);
  };

  const handleSubmit = async () => {
    handleClose();
    setLoading(true);
    const result = await props.submitStory(title, story);
    setLoading(false);
    setRes(result);
    if (result.success) {
      setTitle("");
      setStory("");
    }
  };

  const crumbs = [
    {
      name: "Stories",
      link: "/",
    },
    {
      name: "Write your story",
      link: "/story/write",
    },
  ];
  return (
    <div>
      <Header />
      <div className="main-content">
        <CustomCrumbs links={crumbs} />
        <div className="writer-title">
          {title === "" ? "Your Awesome Title" : title}
        </div>
        <TextField
          variant="outlined"
          fullWidth={true}
          onChange={handleTitle}
          placeholder="Your Awesome Title"
          value={title}
          error={!!res.title}
          helperText={res.title}
        />
        <Divider />
        <TextField
          variant="outlined"
          fullWidth={true}
          multiline={true}
          placeholder="Once upon a time ..."
          rows={10}
          rowsMax={30}
          maxLength={10000}
          value={story}
          onChange={handleStory}
          error={!!res.content}
          helperText={res.content}
        />
        <div className="writer-submit-container">
          {loading ? (
            <CircularProgress />
          ) : (
            <div className="writer-submit">
              {res.success ? (
                <CustomAlert
                  severity="success"
                  content={res.success}
                  addPadding={true}
                />
              ) : res.error ? (
                <CustomAlert
                  severity="error"
                  content={res.error}
                  addPadding={true}
                />
              ) : (
                <div />
              )}
              <Button color="primary" variant="contained" onClick={handleOpen}>
                Share Your Story
              </Button>
            </div>
          )}
        </div>
      </div>
      <Dialog open={dialogState} onClose={handleClose}>
        <DialogTitle>You're About To Share Your Story!</DialogTitle>
        <DialogContent>
          Once you submit your story, everyone will be able to read it. Are you
          sure you want to enlighten everyone with it?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No way!</Button>
          <Button onClick={handleSubmit}>Sure, why not?</Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </div>
  );
};

export default connect(null, { submitStory })(Writer);
