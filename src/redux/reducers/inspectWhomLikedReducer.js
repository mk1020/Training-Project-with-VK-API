import * as types from "../actions/actions";

export const inspectWhomLikedReducer = (state = {}, action) => {
    switch (action.type) {
        case types.WHO_WERE_LIKED_START: {
            return { ...state, who_were_liked_start: true, who_were_liked_end: false }
        }
        case types.WHO_WERE_LIKED_END: {
            debugger
            return {
                ...state, who_were_liked_end: true,
                who_were_liked_start: false,
                wereLiked: action.wereLiked
            }
        }
        default: return state;
    }
}
