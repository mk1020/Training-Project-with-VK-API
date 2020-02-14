import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import {
  getFriendsThunk,
  searchFriendThunk,
  getPhotosThunk
} from "./redux/thunks/thunks";
import { connect } from "react-redux";
import img_man_women from "./img/man-women.png";
import img_man from "./img/man.png";
import img_women from "./img/women.png";

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
    Id_LikedPeople,
    getPhotosThunk,
    count_photos,
    photos
  } = props;
  const [valueTextInput, setValueTextInput] = useState("");
  const [onClickShow, setOnClickShow] = useState(false);
  const [selectedPhotos, changeSelectedPhotos] = useState({});
  const [selectedFriend, changeSelectedFriend] = useState(0);
  const [selectedFilter, changeSelectedFilter] = useState(false);
  const [count_likes, changeCount_likes] = useState(0);
  useEffect(() => {
    getPhotosThunk(selectedFriend, false);
  }, [selectedFriend]);

  useEffect(() => {
    getPhotosThunk(selectedFriend, selectedPhotos);
  }, [selectedPhotos]);

  useEffect(() => {
    if (Id_LikedPeople) {
      let count = 0;
      for (let key in Id_LikedPeople) count += Id_LikedPeople[key].length;
      changeCount_likes(count);
    }
  }, [Id_LikedPeople]);
  console.log("Id_LikedPeople", Id_LikedPeople);
  console.log("count_likes ", count_likes);
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
                  setOnClickShow(false);
                  changeSelectedFriend(friend[index].id);
                }}
                key={`fln_${index}`}
                friend={friend[index]}
              />
            ))}
          </div>
        </div>
        {selectedFriend !== 0 ? (
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
              <h5 className={styles.h5}>who put a like?</h5>
              <div className={styles.filter}>Filter:</div>
              <div
                onClick={() => {
                  changeSelectedFilter("man-women");
                }}
                className={styles.img_man_women}
              >
                <img
                  onClick={() => changeSelectedFilter("man")}
                  className={styles.img_man}
                  src={img_man}
                  alt="img-man"
                />
                <img
                  onClick={() => changeSelectedFilter("women")}
                  className={styles.img_women}
                  src={img_women}
                  alt="img-women"
                />
              </div>
              <img className={styles.img_man} src={img_man} alt="img-man" />
              <img
                className={styles.img_women}
                src={img_women}
                alt="img-women"
              />
              {selectedFilter === "man-women" ? (
                <div className={styles.count_likes}> Count: {count_likes}</div>
              ) : null}
            </div>
            {onClickShow ? (
              <div className={styles.block_photos}>
                {photos &&
                  photos.map((el, index) => (
                    <img
                      src={el.sizes[2].url}
                      alt="img"
                      key={`img_${index}`}
                      className={
                        selectedPhotos[el.id]
                          ? styles.imgFriendWithOpacity
                          : styles.imgFriendNoOpacity
                      }
                      onClick={() => {
                        let item = {};
                        item[el.id] = !selectedPhotos[el.id];
                        changeSelectedPhotos({
                          ...selectedPhotos,
                          ...item
                        });
                      }}
                    />
                  ))}
              </div>
            ) : null}{" "}
            .
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default connect(
  state => ({
    friend: state.friendsReducer,
    Id_LikedPeople: state.inspectReducer.Id_LikedPeople,
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
