import * as types from "../actions/actions";

export const photosReducer = (state=[], action)=> {
   switch (action.type){
       case types.NAME_SURNAME_LIKED_PEOPLE: {
           return action.arrayNameSurname
       }

       default: return state;
   }

}