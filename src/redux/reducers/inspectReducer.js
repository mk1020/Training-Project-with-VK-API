import * as types from "../actions/actions";

export const inspectReducer = (state={}, action)=> {
   switch (action.type){
      /*   case types.NAME_SURNAME_LIKED_PEOPLE: {
           return action.arrayNameSurname
       }  */
       case types.ALL_PHOTOS: {
            return {...state, count: action.count, items: action.items }
       }

       default: return state;
   }

}