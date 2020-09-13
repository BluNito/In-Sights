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
} from "../actions/types";

const initialState = {
  collection: [],
  collectionPage: 1,
  collectionRecords: 0,
  collectionLimit: 0,
  collectionNext: false,
  collectionPrev: false,
  trending: [],
  recents: [],
  story: {},
  currentViews: 0,
  totalViews: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_COLLECTION:
      return {
        ...state,
        collection: action.payload.stories,
        collectionRecords: action.payload.records,
        collectionLimit: action.payload.limit,
        collectionPage: action.payload.page,
        collectionPrev: action.payload.page > 1,
        collectionNext:
          action.payload.page * action.payload.limit < action.payload.records,
      };
    case SET_COLLECTION_PAGE:
      return {
        ...state,
        collectionPage: action.payload,
        collectionNext:
          action.payload * state.collectionLimit < state.collectionRecords,
        collectionPrev: action.payload > 1,
      };
    case CLEAR_COLLECTION:
      return {
        ...state,
        collection: [],
        collectionNext: false,
        collectionPrev: false,
      };
    case SET_TRENDING:
      return {
        ...state,
        trending: action.payload,
      };
    case CLEAR_TRENDING:
      return {
        ...state,
        trending: [],
      };
    case SET_RECENTS:
      return {
        ...state,
        recents: action.payload,
      };
    case CLEAR_RECENTS:
      return {
        ...state,
        recents: [],
      };
    case SET_STORY:
      return {
        ...state,
        story: {
          ...action.payload,
          content: JSON.parse(action.payload.content),
        },
      };
    case CLEAR_STORY:
      return {
        ...state,
        story: {},
      };
    case SET_VIEW_COUNT:
      return {
        ...state,
        currentViews: action.payload?.currentViews,
        totalViews: action.payload?.totalViews,
      };
    default:
      return state;
  }
}
