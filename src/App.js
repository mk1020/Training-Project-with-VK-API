import React from "react";
import styles from "./App.module.css";
import { getFriendsThunk } from "./redux/thunks/thunks";
import { connect } from "react-redux";
import store from "./redux/Store";

const Friend = (props) => {
  return <button className={styles.button_friend}>Test </button>;
};
const App = props => {
  const {vkReducer, getFriends, getFriendsThunk} = props;
  const mass = [1,3,4,'d','as'];
  return (
    <div className={styles.App_wrapper}>
      <header className={styles.App_header}>VK API</header>
      <div className={styles.App}>
        <div className={styles.block_friends}>
          
          <button onClick={props.getFriendsThunk} >ss</button>
          <Friend />
        </div>
      </div>
    </div>
  );
};

export default connect(state => ({ vkReducer: state.vkReducer }), {
  getFriendsThunk
})(App);
