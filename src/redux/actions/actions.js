 // todo: rename

export const AREA_FRIENDS = "AREA_FRIENDS"; 
export const NAME_SURNAME_LIKED_PEOPLE = "NAME_SURNAME_LIKED_PEOPLE";
export const ALL_PHOTOS = "ALL_PHOTOS";

export const areaFriend = (arrayFriends) => ({
 type: AREA_FRIENDS,
 arrayFriends: arrayFriends
})

export const nameSurnameLikedPeople = (arrayNameSurname)=> ({
    type: NAME_SURNAME_LIKED_PEOPLE,
    arrayNameSurname: arrayNameSurname
})

export const allPhotos = (photos) => ({
    type: ALL_PHOTOS,
    photos: photos
})