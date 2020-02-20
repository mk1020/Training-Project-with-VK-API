// todo: rename
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

export const loadFriends = () => async dispatch => {
  dispatch({ type: LOADING_FREINDS });
  await api.getFriends().then(
    data => {
      dispatch({ type: LOADING_FREINDS });
      data && dispatch(areaFriend(data.items));
    },
    error => {
      dispatch({ type: LOAD_FREINDS_ERROR });

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

export const getPhotos = (user_id) => dispatch => {
  //получаем id фоток
  dispatch({ type: LOAD_PHOTOS_START });
  api.photosGetAll(user_id).then(async dataPhotos => {
    await dispatch(allPhotos(dataPhotos));
    dispatch({ type: LOAD_PHOTOS_END });
  });
};

export const getLikes = (user_id, IdImg = false) => dispatch => {
  //получаем id фоток
  api.photosGetAll(user_id).then(
    async dataPhotos => {
      await dispatch(allPhotos(dataPhotos));
      if (IdImg === true) {
        debugger;
        IdImg = dataPhotos.items;
      }
      dispatch({ type: LOAD_INFO_LIKES_START });
      const forWithSleep = async () => {
        // массив id фоток [123,125, 543 и тд]
        for (const el in IdImg) {
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

                async data => {
                  await dispatch(
                    likedPeople(typeof el == "string" ? el : el.id, data)
                  );

                  await dispatch({
                    type: LIKED_PEOPLE_UP,
                    IdImg
                  });
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
      await forWithSleep();
      dispatch({ type: LOAD_INFO_LIKES_END });
    },
    error => {
      console.log(error.error);
      alert("Произошла ошибка! Подробности в консоле.");
    }
  );
};

//   выбираю человека -->  появляется кнопка позволяющая показать(скрыть) все его фотографии-->
//   выбираю фотографию и выбираю кнопку (показать всех кто лайкнул,только мужчин,
//   только женщин) --> показывается список тех, кто лайкнул
//   и кнопка "показать всех кто лайкал(или мужчин, женщин")
//   потом список тех кого лайкал какой-то человек

// кому понравилось?
//кто поставил лайк?
//Фильтр:
//все м ж
