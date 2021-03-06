import { SET_MAIN_LOAD, SET_DIMENSIONS } from "../actions/types";

const initialState = {
  mainLoad: true,
  dimensions: {},
  colors: {
    main: "rgb(41, 37, 87)",
    accent: "rgb(48, 43, 99)",
  },
  sizes: {
    logoSize: "1.6rem",
    allCapSize: "0.9rem",
    titleSize: "1.7rem",
    subTitleSize: "1.5rem",
    miniTitleSize: "1.2rem",
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_DIMENSIONS:
      return {
        ...state,
        dimensions: action.payload,
      };
    case SET_MAIN_LOAD:
      return {
        ...state,
        mainLoad: action.payload,
      };
    default:
      return state;
  }
}
