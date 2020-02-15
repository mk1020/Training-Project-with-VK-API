 // todo: rename

export const AREA_FRIENDS = "AREA_FRIENDS"; 
export const LIKED_PEOPLE = "LIKED_PEOPLE";
export const ALL_PHOTOS = "ALL_PHOTOS";
export const DEFAULT_STATE_INSPECT = "DEFAULT_STATE_INSPECT";

export const areaFriend = (arrayFriends) => ({
 type: AREA_FRIENDS,
 arrayFriends: arrayFriends
})

export const likedPeople = (idPhoto, arrayLikedPeople)=> ({
    type: LIKED_PEOPLE,
    arrayLikedPeople: arrayLikedPeople,
    idPhoto: idPhoto
})

export const allPhotos = (photos) => ({
    type: ALL_PHOTOS,
    photos: photos
})

export const defaultStateInspect = ()=> ({
    type: DEFAULT_STATE_INSPECT
})

