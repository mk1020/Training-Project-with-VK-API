import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import {vkReducer} from "./reducer";

const reducers = combineReducers({vkReducer});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
