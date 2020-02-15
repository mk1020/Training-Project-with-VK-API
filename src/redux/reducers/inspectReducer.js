import * as types from "../actions/actions";

export const inspectReducer = (state={}, action)=> {
   switch (action.type){
         case types.LIKED_PEOPLE: {
            let obj = {}
         //   console.log("action ", action.idPhoto)
             obj[action.idPhoto] = action.arrayLikedPeople; //объект: id: [массив obj]
           return {...state, likedPeople: {...state.likedPeople, ...obj}} 
       }  
       case types.ALL_PHOTOS: {
            return {...state, count: action.photos.count, items: action.photos.items }
       }
       case types.DEFAULT_STATE_INSPECT: {
          console.log("clear")
          return {}
       }
      

       default: return state;
   }

}