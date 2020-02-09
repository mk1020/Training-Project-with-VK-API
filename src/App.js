import React from "react";
import styles from "./App.module.css";
import { getFriendsThunk } from "./redux/thunks/thunks";
import { connect } from "react-redux";
import store from "./redux/Store";

const Friend = (props) => {
  return <button className={styles.button_friend}>Test </button>;
};
const App = props => {
  const {first_last_name, getFriends, getFriendsThunk} = props;
  console.log(first_last_name)
  return (
    <div className={styles.App_wrapper}>
      <header className={styles.App_header}>VK API</header>
      <div className={styles.App}>
        <div className={styles.block_friends}>
          
          <button onClick={getFriendsThunk} >ss</button>
          <Friend />
        </div>
      </div>
    </div>
  );
};

export default connect(state => ({ first_last_name: state.vkReducer }), {
  getFriendsThunk
})(App);
