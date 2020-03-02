/* eslint-disable no-loop-func */
import * as types from "../actions/actions";
import { mergeWith } from "lodash";

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
      let count = 0;

      function customizer(objValue, srcValue) {
          if (Array.isArray(objValue)) {
            return objValue.concat(srcValue);
          }
        }

    //  obj[action.idPhoto] = action.arrayLikedPeople; //объект: id: [массив obj]
      let arrayLikedPeople1;
         arrayLikedPeople1=[];
         let idPhoto; 
         for (const key in action.peopleWhoLiked){
           
          action.peopleWhoLiked[key].items.forEach((idPeople2)=> {
            action.arrayIdLikedPeople.forEach((idPeople)=> {
              const people = action.likedPeopleInfo.find((peopleInfo)=> idPeople == peopleInfo.id);
              if (idPeople2==idPeople) idPhoto = key;
              if (people)
              arrayLikedPeople1.push({id: idPeople, first_name: people.first_name,
                last_name: people.last_name, sex: people.sex})
          })         
         })

            if (obj[idPhoto]) {
          obj[idPhoto] = [...obj[idPhoto], ...arrayLikedPeople1];}
          else { obj[idPhoto] = arrayLikedPeople1}
        } 
      
      
debugger
      return {
        ...state,
        likedPeople: mergeWith(state.likedPeople, obj, customizer)
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