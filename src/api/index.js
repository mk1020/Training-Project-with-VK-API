const api_token =
  "7b0cb4e7a555154329829579c4f2098c17641ade88bf6ce391f0c4236db9f05efddf0713a8bb64124a003";

export const getFriends = () =>
  new Promise((resolve, reject) =>
    window.VK.api(
      "friends.get",
      { v: 5.103, fields: "firsname", access_token: api_token },
      data =>
        data.response.error ? reject(data.response) : resolve(data.response)
    )
  );

export const friendsSearch = (search_line, user_id) =>
  new Promise((resolve, reject) =>
    window.VK.api(
      "friends.search",
      {
        user_id: user_id,
        q: search_line,
        v: 5.103,
        access_token: api_token
      },
      data =>
        data.response.error ? reject(data.response) : resolve(data.response)
    )
  );

export const photosGetAll = user_id =>
  new Promise((resolve, reject) =>
    window.VK.api(
      //получаем id фоток
      "photos.getAll",
      {
        owner_id: user_id,
        count: 200,
        v: "5.103",
        access_token: api_token
      },
      data =>
        data.response.error ? reject(data.response) : resolve(data.response)
    )
  );

export const likesGetList = (user_id, el) =>
  new Promise((resolve, reject) =>
    window.VK.api(
      "likes.getList",
      {
        // получаем массив id пользователей, которые лайкнули
        type: "photo",
        owner_id: user_id,
        item_id: typeof el == "string" ? el : el.id,
        count: 1000,
        v: 5.103,
        access_token: api_token
      },
      data =>
        data.response.error ? reject(data.response) : resolve(data.response)
    )
  );

export const usersGet = IdLikedPeople =>
  new Promise((resolve, reject) =>
    window.VK.api(
      //массив объектов, имена и фамилии получившийся из списка id пользователей
      "users.get",
      {
        user_ids: IdLikedPeople,
        v: "5.103",
        fields: "sex",
        access_token: api_token
      },
      data =>
        data.response.error ? reject(data.response) : resolve(data.response)
    )
  );
