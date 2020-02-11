import * as axios from "axios";
import { areaFriend, nameSurnameLikedPeople } from "../actions/actions";
// move to .env
const api_token =
  "714fbc730cfda583ff83e2ac47a5faf07ad1998cce1fcbe6cd01b44cdfbb09e3f338563a220af04ba19a4";
const baseURL = "https://api.vk.com/method/";
const user_id = 48437298;

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
  axios
    .get(
      //получаем id фоток
      `${baseURL}photos.getAll?owner_id=${user_id}&count=200&v=5.103&access_token=${api_token}`
    )
    .then(response => {
      response.data.response.items.forEach(el =>
        setTimeout(() => {
          axios
            .get(
              //берем каждую id фотки и получаем массив id людей, которые лайкнули
              `${baseURL}likes.getList?type=photo&owner_id=${user_id}&item_id=${el.id}&count=1000&v=5.103&access_token=${api_token}`
            )
            .then(response => {
              let IdLikedPeople = "";
              response.data.response.items.forEach(el => {
                // в ответе объект, в котором массив id людей, которые лайкнули
                IdLikedPeople === "" //для ускорения, а может и не только, берём все id из массива
                  ? (IdLikedPeople = IdLikedPeople + el) //и кидаем их в строку через запятую, а потом делаем запрос
                  : (IdLikedPeople = IdLikedPeople + "," + el); //в который кинем эту строку idшников и он мнесто них вернет массив имен и фамилий
              });
              axios
                .get(
                  `${baseURL}users.get?user_ids=${IdLikedPeople}&v=5.103&access_token=${api_token}`
                )
                .then(
                  //массив имён и фамилий тех кто лайкнул каждую фотку
                  response => {
                    dispatch(nameSurnameLikedPeople(response.data.response));
                  }
                );
            });
        }, 30000)
      );
    });
