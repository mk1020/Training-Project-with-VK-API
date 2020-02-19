import * as types from "../actions/actions";

export const inspectReducer = (state={}, action)=> {
   switch (action.type){
      case types.LIKED_PEOPLE_UP: {
         let likedPeopleCopy={};
         console.log('IdImg->>', action.IdImg)
            for(const key in state.likedPeople)  if (Object.keys(action.IdImg).indexOf(key)!==-1 )
         likedPeopleCopy[key]=state.likedPeople[key]
            
            console.log("liked people--->", likedPeopleCopy)

         return {...state, likedPeople: likedPeopleCopy}
      }
         case types.LIKED_PEOPLE: {
            let obj = {}
            console.log("333333333 ")
         
             obj[action.idPhoto] = action.arrayLikedPeople; //объект: id: [массив obj]
           return {...state, likedPeople: {...state.likedPeople, ...obj}} 
       }  
         case types.PHOTOS_LOADING: {
          return {...state, photos_loading: !state.photos_loading}
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