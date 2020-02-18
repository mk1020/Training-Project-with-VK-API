import * as types from "../actions/actions";

export const friendsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.LOAD_FREINDS_REQEST: {
      return { ...state, friends_reqest: true };
    }
    case types.LOAD_FREINDS_RESPONSE: {
      return { ...state, friends_response: true };
    }
    case types.LOAD_FREINDS_ERROR: {
      return { ...state, friends_response_error: true };
    }
    case types.AREA_FRIENDS:
      return {
        ...state,
        friends: action.arrayFriends.map(el => ({
          first_name: el.first_name,
          last_name: el.last_name,
          id: el.id
        }))
      };

    default:
      return state;
  }
};
