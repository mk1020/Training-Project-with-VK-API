/* eslint-disable no-loop-func */
// todo: rename
//s
import * as api from "../../api";
export const AREA_FRIENDS = "AREA_FRIENDS";
export const LIKED_PEOPLE = "LIKED_PEOPLE";
export const ALL_PHOTOS = "ALL_PHOTOS";
export const DEFAULT_STATE_INSPECT = "DEFAULT_STATE_INSPECT";
export const LOADING_FREINDS = "LOADING_FREINDS";
export const LOAD_FREINDS_ERROR = "LOAD_FREINDS_ERROR";
export const LOAD_PHOTOS_START = "LOAD_PHOTOS_START";
export const LOAD_PHOTOS_END = "LOAD_PHOTOS_END";
export const DEFAULT_LIKED_PEOPLE = "DEFAULT_LIKED_PEOPLE";
export const LIKED_PEOPLE_UP = "LIKED_PEOPLE_UP";
export const LOAD_INFO_LIKES_START = "LOAD_INFO_LIKES_START";
export const LOAD_INFO_LIKES_END = "LOAD_INFO_LIKES_END";
export const IMGES_BY_PEOPLE = "IMGES_BY_PEOPLE";
export const LOAD_WHOM_PUT_LIKE_START = "LOAD_WHOM_PUT_LIKE_START";
export const LOAD_WHOM_PUT_LIKE_END = "LOAD_WHOM_PUT_LIKE_END";
export const FRIENDS_OF_FRIEND = "FRIENDS_OF_FRIEND";
export const QUANTITY_LOAD = "QUANTITY_LOAD";

const api_token =
  "7b0cb4e7a555154329829579c4f2098c17641ade88bf6ce391f0c4236db9f05efddf0713a8bb64124a003";


export const areaFriend = arrayFriends => ({
  type: AREA_FRIENDS,
  arrayFriends: arrayFriends
});

export const likedPeople = (idPhoto, arrayLikedPeople) => ({
  type: LIKED_PEOPLE,
  arrayLikedPeople: arrayLikedPeople,
  idPhoto: idPhoto
});

export const allPhotos = photos => ({
  type: ALL_PHOTOS,
  photos: photos
});

export const defaultStateInspect = () => ({
  type: DEFAULT_STATE_INSPECT
});

export const default_liked_people = () => ({
  type: DEFAULT_LIKED_PEOPLE
});
//------------------------------------------------------------------\\
// move to .env

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const loadFriends = (user_id) => async dispatch => {
  dispatch({
    type: LOADING_FREINDS
  });
  await api.getFriends().then(
    data => {
      dispatch({
        type: LOADING_FREINDS
      });
      dispatch(areaFriend(data.items));
    },
    error => {
      dispatch({
        type: LOAD_FREINDS_ERROR
      });

      console.log(error.error);
      alert("Произошла ошибка! Подробности в консоле.");
    }
  );
};

export const searchFriend = (search_line, user_id) => dispatch =>
  api.friendsSearch(search_line, user_id).then(
    data => data && dispatch(areaFriend(data.items)),
    error => {
      console.log(error.error);
      alert("Произошла ошибка! Подробности в консоле.");
    }
  );

export const getPhotos = user_id => dispatch => {
  //получаем id фоток
  dispatch({
    type: LOAD_PHOTOS_START
  });
  api.photosGetAll(user_id).then(async dataPhotos => {
    await dispatch(allPhotos(dataPhotos));
    dispatch({
      type: LOAD_PHOTOS_END
    });
  });
};

export const getLikes = (user_id, IdImg, previousSelectedFriend) => (dispatch) => {
  //получаем id фоток
  api.photosGetAll(user_id).then(
    async dataPhotos => {

        let IdImages = null;
        await dispatch(allPhotos(dataPhotos));
        if (IdImg === "all") {
          IdImages = dataPhotos.items;
        } else IdImages = IdImg;
        dispatch({
          type: LOAD_INFO_LIKES_START
        });
        const forWithSleep = async () => {
          let requestLikesGetList='';
          // массив id фоток [123,125, 543 и тд]

          let index = 1;
          let offsetLikesGetList = 0;
          for (const el in IdImages) {
            if ((Number(el)+1) % 1000 ===0) offsetLikesGetList+= 1000;
            if (index % 25 !== 0 && IdImages.length - index !== 0) {
            requestLikesGetList += `"${IdImages[el].id}": API.likes.getList({type: "photo", offset: ${offsetLikesGetList},
             owner_id: ${user_id}, item_id: ${IdImg === "all" ? IdImages[el].id : el},count: 1000, v: 5.103}),`; 
            }
             else {
              requestLikesGetList += `"${IdImages[el].id}": API.likes.getList({type: "photo",offset: ${offsetLikesGetList},
               owner_id: ${user_id}, item_id: ${IdImg === "all" ? IdImages[el].id : el},count: 1000, v: 5.103}),`; 
              requestLikesGetList = requestLikesGetList.slice(0, requestLikesGetList.length - 1);
              //await sleep(200);
               // получаем 25 массивов id пользователей, которые лайкнули
               
              await api.execute(requestLikesGetList).then(async(peopleWhoLiked) => {
                let IdLikedPeople = '';
                for (const idPhoto in peopleWhoLiked){
                  for (const idPeople of peopleWhoLiked[idPhoto].items)
                   {
                    IdLikedPeople === '' 
                      ?
                      (IdLikedPeople += idPeople) 
                      :
                      (IdLikedPeople = IdLikedPeople + "," + idPeople); 
                      await sleep(100)

                      
                  }
                  api.usersGet(IdLikedPeople).then(
                    //массив объектов, имена и фамилии получившийся из списка id пользователей
                    data => {
                      debugger
                     // debugger
                      dispatch(
                        likedPeople(
                          IdImg === "all" ? IdImages[el].id.toString() : el,
                          data
                        )
                      );
                      dispatch({
                        type: LIKED_PEOPLE_UP,
                        IdImg: IdImages
                      });
                      dispatch({
                        type: IMGES_BY_PEOPLE
                      });
                    },
                    error => {debugger
                      console.log(error.error);
                      alert("Произошла ошибка! Подробности в консоле.");
                    })
                    await sleep(350)
                    IdLikedPeople='';
                }
                
                
              }, error => {debugger
                console.log(error.error);
                alert("Произошла ошибка! Подробности в консоле.");
              });
              }
              index++;
            }
          
        };
        await forWithSleep();
        dispatch({
          type: LOAD_INFO_LIKES_END
        });
      },
      error => {
        console.log(error.error);
        alert("Произошла ошибка! Подробности в консоле.");
      }
  );
};

export const loadWhomPutLike = (user_id, quantityLoad, store) => async (dispatch, getState) => {
  dispatch({
    type: QUANTITY_LOAD,
    quantityLoad: quantityLoad
  });
  dispatch({
    type: LOAD_WHOM_PUT_LIKE_START
  });

  let countFriends;
  let offsetFriends = 0;
  do {
    await api.getFriends(user_id, offsetFriends).then(
      async data => { // тут друзья моего выбранного друга
        countFriends = data.count;
        let wereLiked = {};
        for (const friend of data.items) {
          await sleep(200);
          let countPhotos;
          let offsetPhotos = 0;
          do {
            await api.photosGetAll(friend.id, offsetPhotos).then(async (photos) => {
              countPhotos = photos.count;
              await sleep(70);
              let requestsIsLiked = '';
              let index = 1;
              let countLikes = 0;
              for (const photo of photos.items) {
                if (index % 25 !== 0 && photos.items.length - index !== 0)
                  requestsIsLiked += `photo${index}: API.likes.isLiked({user_id: ${user_id},
                 type: "photo", owner_id: ${friend.id}, item_id: ${photo.id},  v: 5.103}),`;
                else {
                  requestsIsLiked = requestsIsLiked.slice(0, requestsIsLiked.length - 1);
                  await sleep(200);
                  await api.execute(requestsIsLiked).then((photosIsLiked) => {
                    for (const isLikedPhoto in photosIsLiked)
                      if (photosIsLiked[isLikedPhoto].liked === 1) {
                        countLikes++;
                        wereLiked[friend.id] = {
                          countLikes: countLikes,
                          first_name: friend.first_name,
                          last_name: friend.last_name
                        };
                        //debugger
                      }
                  }, (error) => {
                    debugger
                    console.log(`method name: ${api.execute.name} `, error.error);
                    //alert("Произошла ошибка! Подробности в консоле.");
                  })
                  // debugger
                  requestsIsLiked = '';
                }
                index++;
              }
            }, (error) => {
              console.log(`method name: ${api.photosGetAll.name}`, error.error);
              //  alert("Произошла ошибка! Подробности в консоле.");
            })
            offsetPhotos += 200;

          } while (offsetPhotos < countPhotos)
        }
        
        dispatch({
          type: LOAD_WHOM_PUT_LIKE_END,
          wereLiked: wereLiked
        });
      }, (error) => {
        debugger
        console.log(`method name: ${api.getFriends.name}`, error.error);
        alert("Произошла ошибка! Подробности в консоле.");
      }
    )
    offsetFriends += 5000;
  } while (offsetFriends < countFriends)
}


//   выбираю человека -->  появляется кнопка позволяющая показать(скрыть) все его фотографии-->
//   выбираю фотографию и выбираю кнопку (показать всех кто лайкнул,только мужчин,
//   только женщин) --> показывается список тех, кто лайкнул
//   и кнопка "показать всех кто лайкал(или мужчин, женщин")
//   потом список тех кого лайкал какой-то человек
//
// кому понравилось?
//кто поставил лайк?
//Фильтр:
//все м ж

// выбираем моего друга что-бы узнать кого он лайкал.
// алгоритм:
// 1) выбрать моего друга,
// 2) получить всех его друзей 
// 3) у каждого из этих друзей получить все фотки
// 4) проверить каждую фотку, является ли она объектом, который лайкнул мой друг