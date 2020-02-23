import * as types from "../actions/actions";

export const inspectReducer = (state = {}, action) => {
  switch (action.type) {
    case types.LIKED_PEOPLE_UP: {
      let likedPeopleCopy = {};
      let IdImgCopy = {};
      let likedPeopleNoRepeat={};
      Array.isArray(action.IdImg)
        ? action.IdImg.forEach(
            (el, ind) => (IdImgCopy[action.IdImg[ind].id] = true)
          )
        : (IdImgCopy = action.IdImg);

      for (const key in state.likedPeople)
        if (Object.keys(IdImgCopy).indexOf(key) !== -1)
          likedPeopleCopy[key] = state.likedPeople[key];
      
      return { ...state, likedPeople: likedPeopleCopy };
    }
    case types.LIKED_PEOPLE: {
      let obj = {};
      obj[action.idPhoto] = action.arrayLikedPeople; //объект: id: [массив obj]
         for (const key in state.likedPeople) 
              likedPeople[key]
      return { ...state, likedPeople: { ...state.likedPeople, ...obj } };
    }
    case types.LOAD_PHOTOS_START: {
      return { ...state, load_photos_start: true, load_photos_end: false };
    }
    case types.LOAD_PHOTOS_END: {
      return { ...state, load_photos_end: true, load_photos_start: false };
    }
    case types.LOAD_INFO_LIKES_START: {
      return {
        ...state,
        load_info_likes_start: true,
        load_info_likes_end: false
      };
    }
    case types.LOAD_INFO_LIKES_END: {
      return {
        ...state,
        load_info_likes_end: true,
        load_info_likes_start: false
      };
    }
    case types.ALL_PHOTOS: {
      return {
        ...state,
        count: action.photos.count,
        items: action.photos.items
      };
    }
    case types.DEFAULT_STATE_INSPECT: {
      return {};
    }

    default:
      return state;
  }
};
