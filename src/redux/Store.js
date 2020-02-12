import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import {friendsReducer} from "./reducers/friendsReducer";
import {inspectReducer} from "./reducers/inspectReducer";


const reducers = combineReducers({friendsReducer, inspectReducer});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
