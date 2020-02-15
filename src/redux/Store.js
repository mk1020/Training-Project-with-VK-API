import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { friendsReducer } from "./reducers/friendsReducer";
import { inspectReducer } from "./reducers/inspectReducer";

const reducers = combineReducers({ friendsReducer, inspectReducer });

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
