/* eslint-disable no-loop-func */
import * as types from "../actions/actions";
import { act } from "react-dom/test-utils";

export const inspectWhoLikedReducer = (state = {}, action) => {
  switch (action.type) {
    case types.LIKED_PEOPLE_UP: {
      
      let likedPeopleCopy = {};
      let IdImgCopy = {};
      Array.isArray(action.IdImg) ?
        action.IdImg.forEach(
          (el, ind) => (IdImgCopy[action.IdImg[ind].id] = true)
        ) :
        (IdImgCopy = action.IdImg);

      for (const key in state.likedPeople)
        if (Object.keys(IdImgCopy).indexOf(key) !== -1)
          likedPeopleCopy[key] = state.likedPeople[key];

      return {
        ...state,
        likedPeople: likedPeopleCopy
      };
    }
    case types.LIKED_PEOPLE: {
      let obj = {};
      let arrayLikedPeople=[];
    //  obj[action.idPhoto] = action.arrayLikedPeople; //объект: id: [массив obj]
     let countIdResponseExecute = 0;
      for (const idPhoto in action.idPhotosIdPeople) { //в item массив id тех, кто лайкнул
        for (const idPeopleWhoLiked of  action.idPhotosIdPeople[idPhoto].items)
       { 
        // debugger
        countIdResponseExecute++;
        if (countIdResponseExecute<=500)  {
         const people = action.likedPeopleInfo.find((peopleInfo)=> idPeopleWhoLiked == peopleInfo.id);
         if(!people) debugger
         arrayLikedPeople.push({id: idPeopleWhoLiked, first_name: people.first_name,
                last_name: people.last_name, sex: people.sex})
         }
       }
       obj[idPhoto] = arrayLikedPeople;
       arrayLikedPeople=[];

      }
      
     
      return {
        ...state,
        likedPeople: {
          ...state.likedPeople,
          ...obj
        }
      };
    }
    case types.IMGES_BY_PEOPLE: {
      let imgesByPeople = {};
      for (const photo in state.likedPeople)
        state.likedPeople[photo].forEach(
          people =>
          (imgesByPeople[people.id] = {
            ...imgesByPeople[people.id],
            first_name: people.first_name,
            last_name: people.last_name,
            sex: people.sex,
            [photo]: ""
          })
        );

      return {
        ...state,
        imgesByPeople: imgesByPeople
      };
    }
    case types.LOAD_PHOTOS_START: {
      return {
        ...state,
        load_photos_start: true,
        load_photos_end: false
      };
    }
    case types.LOAD_PHOTOS_END: {
      return {
        ...state,
        load_photos_end: true,
        load_photos_start: false
      };
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