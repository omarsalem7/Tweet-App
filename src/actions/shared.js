import { getInitialData } from "../utils/api";
import { receiveUsers } from "./users";
import { receiveTweets } from "./tweets";
import { setAuthUser } from "./authUser";

import { showLoading, hideLoading } from "react-redux-loading";
const AUTH_ID = "tylermcginnis";
export function handleIntialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, tweets }) => {
      dispatch(receiveTweets(tweets));
      dispatch(receiveUsers(users));
      dispatch(setAuthUser(AUTH_ID));
      dispatch(hideLoading());
    });
  };
}
