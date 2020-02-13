import * as types from "../actions/actions";

export const inspectReducer = (state={}, action)=> {
   switch (action.type){
      /*   case types.NAME_SURNAME_LIKED_PEOPLE: {
           return action.arrayNameSurname
       }  */
       case types.ALL_PHOTOS: {
            return {...state, count: action.photos.count, items: action.photos.items }
       }

       default: return state;
   }

}