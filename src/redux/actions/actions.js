// todo: rename
import * as api from "../../api";
export const AREA_FRIENDS = "AREA_FRIENDS";
export const LIKED_PEOPLE = "LIKED_PEOPLE";
export const ALL_PHOTOS = "ALL_PHOTOS";
export const DEFAULT_STATE_INSPECT = "DEFAULT_STATE_INSPECT";
export const LOAD_FREINDS_REQEST = "LOAD_FREINDS_REQEST";
export const LOAD_FREINDS_RESPONSE = "LOAD_FREINDS_RESPONSE";
export const LOAD_FREINDS_ERROR = "LOAD_FREINDS_ERROR";

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

//------------------------------------------------------------------\\
// move to .env

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const loadFriends = () => async dispatch => {
  dispatch({ type: LOAD_FREINDS_REQEST });
  await api.getFriends().then(
    data => {
      dispatch({ type: LOAD_FREINDS_RESPONSE });
      data && dispatch(areaFriend(data.items));
    },
    error => {
      dispatch({ type: LOAD_FREINDS_ERROR });

      console.log(error.error);
      alert("Произошла ошибка! Подробности в консоле.");
    }
  );
};

export const searchFriendThunk = (search_line, user_id) => dispatch =>
  api.friendsSearch(search_line, user_id).then(
    data => data && dispatch(areaFriend(data.items)),
    error => {
      console.log(error.error);
      alert("Произошла ошибка! Подробности в консоле.");
    }
  );

/* window.VK.api(
  "execute",
  {
    code:
      "return {user: API.users.get({user_ids: 48437298,  v: 5.73}), friends: API.friends.get()};"
  },
  data => {
    console.log(data);
  }
); */

export const getPhotosThunk = (user_id, arrayIdImg = false) => dispatch =>
  //получаем id фоток
  api.photosGetAll(user_id).then(
    dataPhotos => {
      dataPhotos && dispatch(allPhotos(dataPhotos));

      if (arrayIdImg === true && dataPhotos) {
        arrayIdImg = dataPhotos.items;
        debugger;
      }
      if (dataPhotos && arrayIdImg) {
        const forWithSleep = async () => {
          arrayIdImg = Object.keys(arrayIdImg); // массив id фоток [123,125, 543 и тд]
          console.log("arrayIdImg thunk", arrayIdImg);
          for (const el of arrayIdImg) {
            // получаем массив id пользователей, которые лайкнули
            api.likesGetList(user_id, el).then(
              data => {
                let IdLikedPeople = "";
                data &&
                  data.items.forEach(el => {
                    // в ответе объект, в котором массив id людей, которые лайкнули
                    IdLikedPeople === "" //для ускорения, а может и не только, берём все id из массива
                      ? (IdLikedPeople = IdLikedPeople + el) //и кидаем их в строку через запятую, а потом делаем запрос
                      : (IdLikedPeople = IdLikedPeople + "," + el); //в который кинем эту строку idшников и он мнесто них вернет массив имен и фамилий
                  });

                api.usersGet(IdLikedPeople).then(
                  //массив объектов, имена и фамилии получившийся из списка id пользователей

                  data => {
                    //console.log("el = ", typeof el)
                    data &&
                      dispatch(
                        likedPeople(typeof el == "string" ? el : el.id, data)
                      );
                  },
                  error => {
                    console.log(error.error);
                    alert("Произошла ошибка! Подробности в консоле.");
                  }
                );
              },
              error => {
                console.log(error.error);
                alert("Произошла ошибка! Подробности в консоле.");
              }
            );
            await sleep(1500);
          }
        };
        forWithSleep();
      }
    },
    error => {
      console.log(error.error);
      alert("Произошла ошибка! Подробности в консоле.");
    }
  );

//   выбираю человека -->  появляется кнопка позволяющая показать(скрыть) все его фотографии-->
//   выбираю фотографию и выбираю кнопку (показать всех кто лайкнул,только мужчин,
//   только женщин) --> показывается список тех, кто лайкнул
//   и кнопка "показать всех кто лайкал(или мужчин, женщин")
//   потом список тех кого лайкал какой-то человек

// кому понравилось?
//кто поставил лайк?
//Фильтр:
//все м ж
