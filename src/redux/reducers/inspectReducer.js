import * as types from "../actions/actions";

export const inspectReducer = (state={}, action)=> {
   switch (action.type){
         case types.ARRAY_LIKED_PEOPLE: {
            let obj = {}
         //   console.log("action ", action.idPhoto)
             obj[action.idPhoto] = action.arrayLikedPeople; //объект: id: [массив obj]
           return {...state, Id_LikedPeople: {...state.Id_LikedPeople, ...obj}} 
       }  
       case types.ALL_PHOTOS: {
            return {...state, count: action.photos.count, items: action.photos.items }
       }

       default: return state;
   }

}