import * as types from "./actions/actions";
import { connect } from "react-redux";

export const vkReducer = (state = [], action) => {
  switch (action.type) {
    case types.LIST_FRIENDS: {
      return action.arrayFriends.map(el => ({
        first_name: el.first_name,
        last_name: el.last_name
      }));
    }

    default:
      return state;
  }
};
