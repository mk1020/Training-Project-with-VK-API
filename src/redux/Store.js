import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import {friendsReducer} from "./reducers/friendsReducer";
import {photosReducer} from "./reducers/photosReducer";


const reducers = combineReducers({friendsReducer, photosReducer});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
