import * as axios from "axios";
import {
  areaFriend,
  nameSurnameLikedPeople,
  allPhotos
} from "../actions/actions";
// move to .env
const api_token =
  "7b0cb4e7a555154329829579c4f2098c17641ade88bf6ce391f0c4236db9f05efddf0713a8bb64124a003";
const baseURL = "https://api.vk.com/method/";
const user_id = 43463557;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getFriendsThunk = () => dispatch =>
  window.VK.api(
    "friends.get",
    { v: 5.103, fields: "firsname", access_token: api_token },
    data => {
      data.response && dispatch(areaFriend(data.response.items));
    }
  );

export const searchFriendThunk = search_line => dispatch =>
  window.VK.api(
    "friends.search",
    {
      user_id: user_id,
      q: search_line,
      v: 5.103,
      access_token: api_token
    },
    data => data.response && dispatch(areaFriend(data.response.items))
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

export const getPhotosThunk = (user_id, arrayIdImg = true) => dispatch =>
  window.VK.api(
    //получаем id фоток
    "photos.getAll",
    {
      owner_id: user_id,
      count: 200,
      v: "5.103",
      access_token: api_token
    },
    data => {
      data.response && dispatch(allPhotos(data.response));
      if (arrayIdImg && data.response) {
        arrayIdImg = data.response.items;
      }
      if (data.response && arrayIdImg!==false) {
        const forWithSleep = async () => {
          for (const el of arrayIdImg) {
            window.VK.api(
              // получаем массив id пользователей, которые лайкнули
              "likes.getList",
              {
                type: "photo",
                owner_id: user_id,
                item_id: el.id,
                count: 1000,
                v: 5.103,
                access_token: api_token
              },
              data => {
                let IdLikedPeople = "";
                data.response &&
                  data.response.items.forEach(el => {
                    // в ответе объект, в котором массив id людей, которые лайкнули
                    IdLikedPeople === "" //для ускорения, а может и не только, берём все id из массива
                      ? (IdLikedPeople = IdLikedPeople + el) //и кидаем их в строку через запятую, а потом делаем запрос
                      : (IdLikedPeople = IdLikedPeople + "," + el); //в который кинем эту строку idшников и он мнесто них вернет массив имен и фамилий
                  });
                window.VK.api(
                  //массив имён и фамилий получившийся из списка id пользователей
                  "users.get",
                  {
                    user_ids: IdLikedPeople,
                    v: "5.103",
                    access_token: api_token
                  },
                  data => {
                    data.response &&
                      dispatch(nameSurnameLikedPeople(data.response));
                  }
                );
              }
            );
            await sleep(1500);
          }
        };
        forWithSleep();
      }
    }
  );

//   выбираю человека -->  появляется кнопка позволяющая показать(скрыть) все его фотографии-->
//   выбираю фотографию и выбираю кнопку (показать всех кто лайкнул,только мужчин,
//   только женщин) --> показывается список тех, кто лайкнул
//   и кнопка "показать всех кто лайкал(или мужчин, женщин")
//   потом список тех кого лайкал какой-то человек

// кому понравилось?
