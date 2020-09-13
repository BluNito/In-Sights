import axios from "axios";
import { loginValidation, registerValidation } from "../../utils/validation";
import Cookies from "js-cookie";
import setAuthToken from "../../utils/setAuthToken";
import {
  clearRecents,
  clearStories,
  clearStory,
  clearTrending,
} from "./storyActions";
import { SET_USER, CLEAR_USER, SET_MAIN_LOAD } from "./types";

export const cookieSetter = (data, noSet) => async (dispatch) => {
  if (!noSet) Cookies.set("is_creds", data);
  setAuthToken(data.token);
  dispatch({
    type: SET_USER,
    payload: {
      id: data.id,
      fname: data.fname,
      lname: data.lname,
    },
  });
};

export const register = (credentials) => async (dispatch) => {
  const errors = registerValidation(credentials);
  if (errors) {
    return errors;
  } else {
    try {
      const res = await axios.post("/api/user/register", credentials);
      dispatch(cookieSetter(res.data));
    } catch (e) {
      return e.response.data;
    }
  }
};

export const login = (credentials) => async (dispatch) => {
  const errors = loginValidation(credentials);
  if (errors) {
    return errors;
  } else {
    try {
      const res = await axios.post("/api/user/login", credentials);
      dispatch(cookieSetter(res.data));
    } catch (e) {
      return e.response.data;
    }
  }
};

export const autologin = (creds) => async (dispatch) => {
  const credsObject = JSON.parse(creds, true);
  dispatch(cookieSetter(credsObject));
  dispatch({
    type: SET_MAIN_LOAD,
    payload: false,
  });
};

export const logout = () => (dispatch) => {
  Cookies.remove("is_creds");
  setAuthToken(false);
  dispatch(clearStories());
  dispatch(clearStory());
  dispatch(clearTrending());
  dispatch(clearRecents());
  dispatch({
    type: CLEAR_USER,
  });
};
