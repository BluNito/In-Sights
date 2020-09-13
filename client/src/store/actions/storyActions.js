import axios from "axios";
import {
  SET_COLLECTION,
  CLEAR_COLLECTION,
  SET_STORY,
  CLEAR_STORY,
  SET_VIEW_COUNT,
  SET_TRENDING,
  CLEAR_TRENDING,
  SET_RECENTS,
  CLEAR_RECENTS,
  SET_COLLECTION_PAGE,
} from "./types";
import { logout } from "./authActions";
import { storyValdiation } from "../../utils/validation";

export const getStories = (page) => async (dispatch) => {
  try {
    const res = await axios.get("/api/stories/collection", {
      params: {
        page: page,
      },
    });
    if (res.status === 203) dispatch(logout());
    dispatch({
      type: SET_COLLECTION,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

export const setCollectionPage = (page) => {
  return {
    type: SET_COLLECTION_PAGE,
    payload: page,
  };
};

export const clearStories = () => {
  return {
    type: CLEAR_COLLECTION,
  };
};

export const getTrending = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/stories/trending");
    if (res.status === 203) dispatch(logout());
    dispatch({
      type: SET_TRENDING,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

export const clearTrending = () => {
  return {
    type: CLEAR_TRENDING,
  };
};

export const getRecents = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/stories/recents");
    if (res.status === 203) dispatch(logout());
    dispatch({
      type: SET_RECENTS,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

export const clearRecents = () => {
  return {
    type: CLEAR_RECENTS,
  };
};

export const getStory = (storyId) => async (dispatch) => {
  try {
    const res = await axios.get("/api/stories/story", {
      params: {
        storyId: storyId,
      },
    });
    if (res.status === 203) dispatch(logout());
    dispatch({
      type: SET_STORY,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

export const clearStory = () => {
  return {
    type: CLEAR_STORY,
  };
};

export const getViewCount = (storyId) => async (dispatch) => {
  try {
    const res = await axios.get("/api/stories/viewlog", {
      params: {
        storyId: storyId,
      },
    });
    if (res.status === 203) dispatch(logout());
    dispatch({
      type: SET_VIEW_COUNT,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: SET_VIEW_COUNT,
      payload: {
        currentViews: 0,
        totalViews: 0,
      },
    });
  }
};

export const submitStory = (title, content) => async (dispatch) => {
  const errors = storyValdiation(title, content);
  if (errors) return errors;
  else {
    try {
      const jsonContent = JSON.stringify(content);
      const res = await axios.post("/api/stories/create", {
        title: title,
        content: jsonContent,
      });
      if (res.status === 203) dispatch(logout());
      return res.data;
    } catch (e) {
      return e.response.data;
    }
  }
};
