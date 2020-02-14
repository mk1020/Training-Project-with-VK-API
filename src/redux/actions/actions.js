 // todo: rename

export const AREA_FRIENDS = "AREA_FRIENDS"; 
export const ARRAY_LIKED_PEOPLE = "ARRAY_LIKED_PEOPLE";
export const ALL_PHOTOS = "ALL_PHOTOS";

export const areaFriend = (arrayFriends) => ({
 type: AREA_FRIENDS,
 arrayFriends: arrayFriends
})

export const Id_LikedPeople = (idPhoto, arrayLikedPeople)=> ({
    type: ARRAY_LIKED_PEOPLE,
    arrayLikedPeople: arrayLikedPeople,
    idPhoto: idPhoto
})

export const allPhotos = (photos) => ({
    type: ALL_PHOTOS,
    photos: photos
})