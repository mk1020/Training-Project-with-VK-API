import * as axios from "axios";
import { areaFriend, nameSurnameLikedPeople } from "../actions/actions";
// move to .env
const api_token =
  "7b0cb4e7a555154329829579c4f2098c17641ade88bf6ce391f0c4236db9f05efddf0713a8bb64124a003";
const baseURL = "https://api.vk.com/method/";
const user_id = 43463557;

export const getFriendsThunk = () => dispatch =>
  axios
    .get(
      `${baseURL}friends.get?v=5.103&fields=
       firsname&access_token=${api_token}`
    )
    .then(response => dispatch(areaFriend(response.data.response.items)));

export const searchFriendThunk = search_line => dispatch =>
  axios
    .get(
      `${baseURL}friends.search?user_id=${user_id}&q=${search_line}&v=5.103&access_token=${api_token}`
    )
    .then(response => dispatch(areaFriend(response.data.response.items)));



export const getPhotosThunk = () => dispatch =>
  //получаем id фоток
  window.VK.api(
    "photos.getAll",
    {
      owner_id: user_id,
      count: 200,
      v: "5.103",
      access_token: api_token
    },
    data => {  

      data.response.items.forEach(el => {
        window.VK.api(
          "likes.getList", //берем каждую id фотки и получаем массив id людей, которые лайкнули
          {
            type: "photo",
            owner_id: user_id,
            item_id: el.id,
            count: 1000,
            v: 5.103,
            access_token: api_token
          },
          data => { debugger;
            let IdLikedPeople = "";
            data.data.response.items.forEach(el => {
              // в ответе объект, в котором массив id людей, которые лайкнули
              IdLikedPeople === "" //для ускорения, а может и не только, берём все id из массива
                ? (IdLikedPeople = IdLikedPeople + el) //и кидаем их в строку через запятую, а потом делаем запрос
                : (IdLikedPeople = IdLikedPeople + "," + el); //в который кинем эту строку idшников и он мнесто них вернет массив имен и фамилий
            });
            window.VK.api(
              "users.get",
              { user_ids: IdLikedPeople, v: "5.103", access_token: api_token },
              response =>
                dispatch(nameSurnameLikedPeople(response.data.response))
            );
          }
        );
      });
    }
  );
