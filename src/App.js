import React, { useState } from "react";
import styles from "./App.module.css";
import {
  getFriendsThunk,
  searchFriendThunk,
  getPhotosThunk
} from "./redux/thunks/thunks";
import { connect } from "react-redux";

const Friend = props => {
  return (
    <button onClick={props.onClick} className={styles.button_friend}>
      {props.friend.first_name} {props.friend.last_name}
    </button>
  );
};
const App = props => {
  window.VK.init(
    () => {
      console.log("при успешной инициализации API");
    },
    () => {
      console.log("ошибка инициализации API");
    },
    "5.103"
  );

  const {
    friend,
    getFriendsThunk,
    searchFriendThunk,
    name_surname_liked,
    getPhotosThunk,
    count_photos,
    photos
  } = props;

  let [valueTextInput, setValueTextInput] = useState("");
  let [onClickFriend, setOnClickFriend] = useState(false);
  let [onClickShow, setOnClickShow] = useState(false);
  let [arraySelectedImg, changeArraySelectedImg] = useState([]);

  console.log("11", photos);
  return (
    <div className={styles.App_wrapper}>
      <header className={styles.App_header}>VK API</header>
      <div className={styles.app_block_action_wrapper}>
        <div className={styles.App}>
          <input
            value={valueTextInput}
            onChange={e => setValueTextInput(e.target.value)}
            type="text"
          />
          <button
            onClick={() => {
              searchFriendThunk(valueTextInput);
              setValueTextInput("");
            }}
            className={styles.button_search}
          >
            Search
          </button>
          <div className={styles.block_friends}>
            <button onClick={getFriendsThunk}>All Friends</button>
            {friend.map((el, index) => (
              <Friend
                onClick={() => {
                  setOnClickFriend(true);
                  setOnClickShow(false);
                  getPhotosThunk(friend[index].id, false);
                }}
                key={`fln_${index}`}
                friend={friend[index]}
              />
            ))}
          </div>
        </div>
        {onClickFriend ? (
          <div className={styles.wrapper_rightArea}>
            <div className={styles.rightArea}>
              <button className={styles.button_count_photos}>
                Photos: {count_photos}
              </button>
              <button
                onClick={() => setOnClickShow(!onClickShow)}
                className={styles.button_show_photos}
              >
                Show
              </button>
            </div>
            {onClickShow ? (
              <div className={styles.block_photos}>
                {photos &&
                  photos.map((el, index) =>
                    arraySelectedImg.find(item => item.id === el.id) ? (
                      <img
                        src={el.sizes[2].url}
                        alt="img"
                        key={`img_${index}`}
                        className={styles.imgFriendWithOpacity}
                        onClick={() => {
                          changeArraySelectedImg([
                            ...arraySelectedImg,
                            { id: el.id }
                          ]);
                        }}
                      />
                    ) : (
                      <img
                        src={el.sizes[2].url}
                        alt="img"
                        key={`img_${index}`}
                        className={styles.imgFriendNoOpacity}
                        onClick={() =>
                          changeArraySelectedImg([
                            ...arraySelectedImg,
                            { id: el.id }
                          ])
                        }
                      />
                    )
                  )}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default connect(
  state => ({
    friend: state.friendsReducer,
    name_surname_liked: state.inspectReducer,
    count_photos: state.inspectReducer.count,
    photos: state.inspectReducer.items
  }),
  {
    getFriendsThunk,
    searchFriendThunk,
    getPhotosThunk
  }
)(App);

// кого он лайкает и кто его лайкает
