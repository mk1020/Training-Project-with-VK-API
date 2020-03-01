const api_token =
  "2707fb58eb0bdd90cf02ce41fc41da0fce2e7a0f7286a32629155224049c4ff1d63430025088fbf4855db";

export const getFriends = (user_id, offset) =>
  new Promise((resolve, reject) =>
    window.VK.api(
      "friends.get", {
        v: 5.103,
        fields: "firsname",
        user_id: user_id,
        offset: offset,
        access_token: api_token
      },
      data =>
      data.error ? reject(data) : resolve(data.response)
    )
  );

export const friendsSearch = (search_line, user_id) =>
  new Promise((resolve, reject) =>
    window.VK.api(
      "friends.search", {
        user_id: user_id,
        q: search_line,
        v: 5.103,
        access_token: api_token
      },
      data =>
      data.error ? reject(data) : resolve(data.response)
    )
  );

export const photosGetAll = (user_id, offset) =>
  new Promise((resolve, reject) =>
    window.VK.api(
      //получаем id фоток
      "photos.getAll", {
        owner_id: user_id,
        count: 200,
        v: "5.103",
        offset: offset,
        access_token: api_token
      },
      data =>
      data.error ?
      reject(data) : resolve(data.response)
    )
  );

export const likesGetList = (user_id, el) =>
  new Promise((resolve, reject) =>
    window.VK.api(
      "likes.getList", {
        // получаем массив id пользователей, которые лайкнули
        type: "photo",
        owner_id: user_id,
        item_id: el,
        count: 1000,
        v: 5.103,
        access_token: api_token
      },
      data =>
      data.error ? reject(data) : resolve(data.response)
    )
  );

export const usersGet = IdLikedPeople =>
  new Promise((resolve, reject) =>
    window.VK.api(
      //массив объектов, имена и фамилии получившийся из списка id пользователей
      "users.get", {
        "user_ids": IdLikedPeople,
        "v": "5.103",
        "fields": "sex", 
        "access_token": api_token
      },
      data =>
      data.error ? reject(data) : resolve(data.response)
    )
  );

export const execute = (method_s) =>
  new Promise((resolve, reject) =>
    window.VK.api(
      "execute", {
        code: `return {${method_s}};`
      },
      data => {
        data.error ? reject(data) : resolve(data.response)
      }
    ))