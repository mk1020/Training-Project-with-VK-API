import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { friendsReducer } from "./reducers/friendsReducer";
import { inspectWhoLikedReducer } from "./reducers/inspectWhoLikedReducer";
import { inspectWhomLikedReducer } from "./reducers/inspectWhomLikedReducer";

const reducers = combineReducers({ friendsReducer, inspectWhoLikedReducer, inspectWhomLikedReducer });

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
