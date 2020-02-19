import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import {
  loadFriends,
  searchFriendThunk,
  getPhotos,
  defaultStateInspect,
  default_liked_people
} from "./redux/actions/actions";
import { connect } from "react-redux";
import img_man_women from "./img/man-women.png";
import img_man from "./img/man.png";
import img_women from "./img/women.png";
import img_smile from "./img/smile-3173976_640.png";
import img_loading from "./img/loading.svg";

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
    friends,
    loadFriends,
    searchFriendThunk,
    likedPeople,
    getPhotos,
    count_photos,
    photos,
    defaultStateInspect,
    friendsState,
    inspectState,
    default_liked_people
  } = props;

  const [valueTextInput, setValueTextInput] = useState("");
  const [selectedFriend, changeSelectedFriend] = useState(0);
  const [selectedFilter, changeSelectedFilter] = useState(-1);
  const [count_likes, changeCount_likes] = useState(-1);
  const [selectedPhotos, changeSelectedPhotos] = useState({});
  const [
    selectedPhotosWithoutFalse,
    changeSelectedPhotosWithoutFalse
  ] = useState({});
  const user_id = "43463557";
  useEffect(() => {
    getPhotos(selectedFriend, false);
  }, [selectedFriend]);

  /*  useEffect(() => {
    getPhotos(selectedFriend, selectedPhotos);
  }, [selectedFilter]); */

  useEffect(() => {
    if (likedPeople) {
      let count = 0;
      for (let key in likedPeople) {
        //   debugger;
        selectedFilter === "man-women" || selectedFilter === "man-women-change"
          ? (count += likedPeople[key].length)
          : likedPeople[key].forEach(el => {
              switch (selectedFilter) {
                case "man" || "man-change":
                  if (el.sex === 2) count++;
                  break;
                case "women" || "women-change":
                  if (el.sex === 1) count++;
                  break;
              }
            });
      }
      changeCount_likes(count);
    }
  }, [selectedFilter]);

  useEffect(() => {
    loadFriends();
  }, []);

  useEffect(() => {
    const IdImgWithoutFalse = {};
    for (const key in selectedPhotos)
      if (selectedPhotos[key]) IdImgWithoutFalse[key] = selectedPhotos[key];
    changeSelectedPhotosWithoutFalse(IdImgWithoutFalse);
    //  console.log("---->>>>>", IdImgWithoutFalse)
  }, [selectedPhotos]);

  console.log(
    "likedPeople",
    likedPeople,
    "selectedPhotosWithoutFalse",
    selectedPhotosWithoutFalse
  );

  return (
    <div className={styles.App_wrapper}>
      <header className={styles.App_header}>VK API</header>
      <div className={styles.app_block_action_wrapper}>
        {friendsState.friends_loading ? (
          <img className={styles.img_loading_friends} src={img_loading} />
        ) : null}

        {inspectState.photos_loading ? (
          <img className={styles.img_loading_photos} src={img_loading} />
        ) : null}
        <div className={styles.App}>
          <input
            value={valueTextInput}
            onChange={e => setValueTextInput(e.target.value)}
            type="text"
          />
          <button
            onClick={() => {
              searchFriendThunk(valueTextInput, user_id);
              setValueTextInput("");
            }}
            className={styles.button_search}
          >
            Search
          </button>
          <div className={styles.block_friends}>
            <button>All Friends</button>
            {friends &&
              friends.map((el, index) => (
                <Friend
                  onClick={() => {
                    defaultStateInspect();
                    changeSelectedPhotos({});
                    changeSelectedFilter(-1); // почему, когда меняю SelectedFilter, не срабатывает useEffect
                    changeCount_likes(-1);
                    changeSelectedFriend(friends[index].id);
                  }}
                  key={`fln_${index}`}
                  friend={friends[index]}
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
              <h5 className={styles.h5}>who put a like?</h5>
              <div className={styles.filter}>Filter:</div>
              <div
                onClick={() => {
                  selectedFilter === "man-women"
                    ? changeSelectedFilter("man-women-change")
                    : changeSelectedFilter("man-women");
                }}
                className={styles.wrapper_img_man_women}
              >
                <img className={styles.img_man} src={img_man} alt="img-man" />
                <img
                  className={styles.img_women}
                  src={img_women}
                  alt="img-women"
                />
                {selectedFilter === "man-women" ||
                selectedFilter === "man-women-change" ? (
                  <img
                    src={img_smile}
                    className={styles.img_smile}
                    alt="img-smile"
                  />
                ) : null}
              </div>
              <div className={styles.wrapper_img_man}>
                <img
                  onClick={() =>
                    selectedFilter === "man"
                      ? changeSelectedFilter("man-change")
                      : changeSelectedFilter("man")
                  }
                  className={styles.img_man}
                  src={img_man}
                  alt="img-man"
                />
                {selectedFilter === "man" || selectedFilter === "man=change" ? (
                  <img
                    src={img_smile}
                    className={styles.img_smile}
                    alt="img-smile"
                  />
                ) : null}
              </div>
              <div className={styles.wrapper_img_women}>
                <img
                  onClick={() =>
                    selectedFilter === "women"
                      ? changeSelectedFilter("women-change")
                      : changeSelectedFilter("women")
                  }
                  className={styles.img_women}
                  src={img_women}
                  alt="img-women"
                />
                {selectedFilter === "women" ||
                selectedFilter === "women-change" ? (
                  <img
                    src={img_smile}
                    className={styles.img_smile}
                    alt="img-smile"
                  />
                ) : null}
              </div>
              {(selectedFilter === "man-women" ||
                selectedFilter === "man" ||
                selectedFilter === "women") &&
              count_likes !== -1 ? (
                <div className={styles.count_likes}> Count: {count_likes}</div>
              ) : null}
            </div>

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
                      changeSelectedFilter(-1);
                      changeCount_likes(-1);
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

            {Object.keys(selectedPhotos).length !== 0 ? (
              <button
                className={styles.button_enter}
                onClick={() =>
                  getPhotos(selectedFriend, selectedPhotosWithoutFalse)
                }
              >
                Enter
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default connect(
  state => ({
    friends: state.friendsReducer.friends,
    friendsState: state.friendsReducer,
    likedPeople: state.inspectReducer.likedPeople,
    count_photos: state.inspectReducer.count,
    photos: state.inspectReducer.items,
    inspectState: state.inspectReducer
  }),
  {
    loadFriends,
    searchFriendThunk,
    getPhotos,
    defaultStateInspect,
    default_liked_people
  }
)(App);

// кого он лайкает и кто его лайкает
