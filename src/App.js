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
    <button onClick={()=>props.onClick(props.friend.id)} className={styles.button_friend}>
      {props.friend.first_name} {props.friend.last_name}
    </button>
  );
};
const App = props => {
  const {
    friend,
    getFriendsThunk,
    searchFriendThunk,
    name_surname_liked,
    getPhotosThunk,
    count_photos
  } = props;
  let [valueTextInput, setValueTextInput] = useState("");

  window.VK.init(
    () => {
      console.log("при успешной инициализации API");
    },
    () => {
      console.log("ошибка инициализации API");
    },
    "5.103"
  );

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
              <Friend  onClick={getPhotosThunk}  key={`fln_${index}`} friend={friend[index]} />
            ))}
          </div>
        </div>
        <div className={styles.rightArea}>
          <button className={styles.button_count_photos}>
            Фотографий:{/*  {count_photos} */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    friend: state.friendsReducer,
    name_surname_liked: state.inspectReducer,
    count_photos: state.inspectReducer.count
  }),
  {
    getFriendsThunk,
    searchFriendThunk,
    getPhotosThunk
  }
)(App);

// кого он лайкает и кто его лайкает
