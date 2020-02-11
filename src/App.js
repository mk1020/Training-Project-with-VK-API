import React, { useState } from "react";
import styles from "./App.module.css";
import { getFriendsThunk, searchFriendThunk,getPhotosThunk } from "./redux/thunks/thunks";
import { connect } from "react-redux";

const Friend = props => {
  return (
    <button className={styles.button_friend}>
      {props.name_surname.first_name} {props.name_surname.last_name}
    </button>
  );
};
const App = props => {
  const { name_surname, getFriendsThunk, searchFriendThunk, name_surname_liked, getPhotosThunk } = props;
  let [valueTextInput, setValueTextInput] = useState("");
  window.VK.Auth.login(null)
  return (
    <div className={styles.App_wrapper}>
      <header className={styles.App_header}>VK API</header>
      <div className={styles.App}>
        <input
          value={valueTextInput}
          onChange={e => setValueTextInput(e.target.value)}
          type="text"
        />
        <button
          onClick={() => {
            searchFriendThunk(valueTextInput);
            getPhotosThunk();
            setValueTextInput("");
          }}
          className={styles.button_search}
        >
          Search
        </button>
        <div className={styles.block_friends}>
          <button onClick={getFriendsThunk}>All Friends</button>
          {name_surname.map((el, index) => (
            <Friend key={`fln_${index}`} name_surname={name_surname[index]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    name_surname: state.friendsReducer,
    name_surname_liked: state.photosReducer
  }),
  {
    getFriendsThunk,
    searchFriendThunk,
    getPhotosThunk
  }
)(App);

// кого он лайкает и кто его лайкает
