import * as types from "../actions/actions";

export const friendsReducer = (state = [], action) => {
  switch (action.type) {
    case types.AREA_FRIENDS: {
      return action.arrayFriends.map(el => ({
        first_name: el.first_name,
        last_name: el.last_name,
        id: el.id
      }));
    }

    default:
      return state;
  }
};
