import * as axios from "axios";
import { listFriends } from "../actions/actions";
// move to .env
const api_token =
  "23f93be84e7cc11a50a4fcbcca57936c929c07ce2d4d60494d57c543ff9b1416367f7cfd5957aec58a903";

export const getFriendsThunk = () => dispatch => 
  axios
    .get(
      `https://api.vk.com/method/friends.get?v=5.8&fields=
       firsname&access_token=${api_token}`
    )
    .then(response => dispatch(listFriends(response.data.response.items)));

