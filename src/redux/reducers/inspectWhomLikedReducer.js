import * as types from "../actions/actions";

export const inspectWhomLikedReducer = (state = {}, action) => {
    switch (action.type) {
        case types.LOAD_WHOM_PUT_LIKE_START: {
            return { ...state, whomPutLikeStart: true, whomPutLikeEnd: false }
        }
        case types.LOAD_WHOM_PUT_LIKE_END: {
            return {
                ...state, whomPutLikeEnd: true,
                whomPutLikeStart: false,
                wereLiked: action.wereLiked
            }
        }
        default: return state;
    }
}
