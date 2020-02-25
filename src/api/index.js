const api_token = "7b0cb4e7a555154329829579c4f2098c17641ade88bf6ce391f0c4236db9f05efddf0713a8bb64124a003";

export const getFriends = async ()=> new Promise(reslove=>window.VK.api( "friends.get",
{ v: 5.103, fields: "firsname", access_token: api_token },
data=>reslove(data)))
  
