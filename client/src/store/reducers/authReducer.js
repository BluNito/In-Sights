import { SET_USER, CLEAR_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case CLEAR_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
    default:
      return state;
  }
}
