/* global VK */
import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import {
  loadFriends,
  searchFriend,
  getPhotos,
  getLikes,
  defaultStateInspect,
  default_liked_people
} from "./redux/actions/actions";
import { uniqBy, isEqual } from "lodash";
import { connect } from "react-redux";
import img_man_women from "./img/man-women.png";
import img_man from "./img/man.png";
import img_women from "./img/women.png";
import img_smile from "./img/smile-3173976_640.png";
import img_loading from "./img/loading.svg";
import { compose } from "redux";

const Friend = props => {
  return (
    <button onClick={props.onClick} className={styles.button_friend}>
      {props.friend.first_name} {props.friend.last_name}
    </button>
  );
};
const App = props => {
  /* VK.init(
    () => {
      console.log("при успешной инициализации API");
    },
    () => {
      console.log("ошибка инициализации API");
    },
    "5.103"
  ); */

  VK.Auth.login((response) => { debugger }, 4);
  window.VK.Observer.subscribe("auth.login", () => console.log("autorize"))
  const {
    friends,
    loadFriends,
    searchFriend,
    likedPeople,
    getPhotos,
    getLikes,
    count_photos,
    photos,
    defaultStateInspect,
    friendsState,
    inspectState,
    default_liked_people,
    likedPeopleCopy,
    imgesByPeople
  } = props;

  const [valueTextInput, setValueTextInput] = useState("");
  const [selectedFriend, changeSelectedFriend] = useState(0);
  const [previousSelectedFriend, changePreviousSelectedFriend] = useState(0);
  const [selectedFilter, changeSelectedFilter] = useState(-1);
  const [count_likes, changeCount_likes] = useState(-1);
  const [selectedPhotos, changeSelectedPhotos] = useState({});
  const [clickAllFriends, changeClickAllFriends] = useState(false);
  const [
    selectedPhotosWithoutFalse,
    changeSelectedPhotosWithoutFalse
  ] = useState({});
  const [selectAllPhotos, changeSelectAllPhoto] = useState(false);
  const [clickListLikeP, changeClickListLikeP] = useState(false);
  const [listLikePeople, changeListLikePeople] = useState([]);
  const user_id = "43463557";


  useEffect(() => {
    selectedFriend && getPhotos(selectedFriend);
  }, [selectedFriend]);


  useEffect(() => {
    if (inspectState.load_photos_end) {
      let selectedPhotosCopy = {};
      photos.forEach(el => (selectedPhotosCopy[el.id] = true));
      changeSelectedPhotos(selectedPhotosCopy);

      changeSelectAllPhoto(true);

      //if (selectAllPhotos === false) changeSelectedPhotos({});
    }

  }, [inspectState.load_photos_end]);


  useEffect(() => {
    const IdImgWithoutFalse = {};
    for (const key in selectedPhotos)
      if (selectedPhotos[key]) IdImgWithoutFalse[key] = selectedPhotos[key];
    changeSelectedPhotosWithoutFalse(IdImgWithoutFalse);
    if (
      Object.keys(IdImgWithoutFalse).length === 0 &&
      Object.keys(selectedPhotos).length !== 0
    ) {
      changeSelectedPhotos({})
    }
  }, [selectedPhotos]);

  useEffect(() => {
    if (selectAllPhotos) { getLikes(selectedFriend, "all", previousSelectedFriend); }
  }, [selectAllPhotos])


  useEffect(() => {
    loadFriends(43463557);
  }, []);

  useEffect(() => {
    if (likedPeople) {
      let count = 0;
      let list_liked_people_copy = [];

      if (
        selectedFilter === "man-women" ||
        selectedFilter === "man-women-change"
      ) {

        for (const key in likedPeople) count += likedPeople[key].length;
        list_liked_people_copy.push(
          ...Object.keys(imgesByPeople).map((people, index) => (
            <li key={people}>
              {imgesByPeople[people].first_name}{" "}
              {imgesByPeople[people].last_name}
            </li>
          ))
        );
      } else
        switch (selectedFilter) {
          case "man" || "man-change": {
            for (const key in likedPeople)
              likedPeople[key].forEach(people => {
                if (people.sex === 2) count++;
              });
            Object.keys(imgesByPeople).forEach((people, index) => {
              if (imgesByPeople[people].sex === 2)
                list_liked_people_copy.push(
                  <li key={people}>
                    {imgesByPeople[people].first_name}{" "}
                    {imgesByPeople[people].last_name}
                  </li>
                );
            });
            break;
          }
          case "women" || "women-change": {
            for (const key in likedPeople)
              likedPeople[key].forEach(people => {
                if (people.sex === 1) count++;
              });

            Object.keys(imgesByPeople).forEach((people, index) => {
              if (imgesByPeople[people].sex === 1)
                list_liked_people_copy.push(
                  <li key={people}>
                    {imgesByPeople[people].first_name}
                    {imgesByPeople[people].last_name}
                  </li>
                );
            });

            break;
          }
          default:
            break;
        }

      changeListLikePeople(list_liked_people_copy);
      changeCount_likes(count);
    }
  }, [selectedFilter]);


  return (
    <div className={styles.App_wrapper}>
      <header className={styles.App_header}>VK API</header>
      <div className={styles.app_block_action_wrapper}>
        {friendsState.friends_loading ? (
          <img className={styles.img_loading_friends} src={img_loading} />
        ) : null}

        {inspectState.load_photos_start ? (
          <img className={styles.img_loading_photos} src={img_loading} />
        ) : null}

        {inspectState.load_info_likes_start ? (
          <img className={styles.img_loading_info_likes} src={img_loading} />
        ) : null}
        <div className={styles.App}>
          <input
            value={valueTextInput}
            onChange={e => setValueTextInput(e.target.value)}
            type="text"
          />
          <button
            onClick={() => {
              searchFriend(valueTextInput, user_id);
              setValueTextInput("");
            }}
            className={styles.button_search}
          >
            Search
          </button>
          <div className={styles.block_friends}>
            <button onClick={() => loadFriends()}>All Friends</button>
            {friends
              ? friends.map((el, index) => (
                <Friend
                  onClick={() => {
                    defaultStateInspect();
                    changeSelectedPhotos({});
                    changeSelectedFilter(-1);
                    changeCount_likes(-1);
                    if (!previousSelectedFriend) changePreviousSelectedFriend(friends[index].id);
                    if (previousSelectedFriend && previousSelectedFriend !== friends[index].id)
                      changePreviousSelectedFriend(selectedFriend);
                    changeSelectedFriend(friends[index].id);
                    changeSelectAllPhoto(false);
                  }}
                  key={`fln_${index}`}
                  friend={friends[index]}
                />
              ))
              : null}
          </div>
        </div>
        {selectedFriend !== 0 ? (
          <div className={styles.wrapper_wrapper_rightArea}>
            <div className={styles.wrapper_rightArea}>
              <div className={styles.rightArea}>
                <button className={styles.button_count_photos}>
                  Photos: {count_photos}
                </button>
                <h5 className={styles.h5}>who put a like?</h5>
                <div className={styles.filter}>Filter:</div>
                <div
                  onClick={() => {
                    if (inspectState.load_info_likes_end)
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
                  {(selectedFilter === "man-women" ||
                    selectedFilter === "man-women-change") &&
                    inspectState.load_info_likes_end ? (
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
                      inspectState.load_info_likes_end &&
                        selectedFilter === "man"
                        ? changeSelectedFilter("man-change")
                        : changeSelectedFilter("man")
                    }
                    className={styles.img_man}
                    src={img_man}
                    alt="img-man"
                  />
                  {(selectedFilter === "man" ||
                    selectedFilter === "man-change") &&
                    inspectState.load_info_likes_end ? (
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
                      inspectState.load_info_likes_end &&
                        selectedFilter === "women"
                        ? changeSelectedFilter("women-change")
                        : changeSelectedFilter("women")
                    }
                    className={styles.img_women}
                    src={img_women}
                    alt="img-women"
                  />
                  {(selectedFilter === "women" ||
                    selectedFilter === "women-change") &&
                    inspectState.load_info_likes_end ? (
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
                    <div className={styles.count_likes}>
                      {" "}
                      Count: {count_likes}
                    </div>
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
              <div className={styles.button_all_photos_and_enter}>
                <button
                  onClick={() => {
                    changeSelectedPhotos({});
                    changeSelectedFilter(-1);
                    changeCount_likes(-1);
                    changeSelectAllPhoto(false)
                  }

                  }
                  className={styles.button_all_photos}
                >
                  Unselect All Photos
                </button>
                {Object.keys(selectedPhotos).length !== 0 ? (
                  <button
                    className={styles.button_enter}
                    onClick={() => {
                      if (selectAllPhotos === false && Object.keys(selectedPhotosWithoutFalse).length !== 0)
                        getLikes(selectedFriend, selectedPhotosWithoutFalse);
                    }}
                  >
                    Enter
                  </button>
                ) : null}
                {inspectState.load_info_likes_end && (
                  <button
                    onClick={() => changeClickListLikeP(!clickListLikeP)}
                    className={styles.button_list_liked_people}
                  >
                    List liked people<br />(Without Repeat)
                  </button>
                )}
              </div>
            </div>
            {clickListLikeP && inspectState.load_info_likes_end && (
              <div className={styles.list_liked_people}>
                <ul>{listLikePeople}</ul>
              </div>
            )}
          </div>
        ) : null}
        {/* --- */}

        {/* --- */}
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
    inspectState: state.inspectReducer,
    likedPeopleCopy: state.inspectReducer.likedPeopleCopy,
    imgesByPeople: state.inspectReducer.imgesByPeople
  }),
  {
    loadFriends,
    searchFriend,
    getPhotos,
    getLikes,
    defaultStateInspect,
    default_liked_people
  }
)(App);

// кого он лайкает и кто его лайкает
