import * as types from "./actions/actions";
import { connect } from "react-redux";

export const vkReducer = (state = [], action) => {
  switch (action.type) {
    case types.RENDER_LIST_FRIENDS: {
       return action.massFriends.map((el)=> el.first_name)
    }
    default:  
      return state;
  }
};
