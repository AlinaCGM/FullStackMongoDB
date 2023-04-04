import axios from "axios";

import { userActions } from "../slice/user";
import { AppDispatch } from "../store";

function fetchUser(userId: string | null) {
  return async (dispatch: AppDispatch) => {
    if (!userId) {
      return { message: "no such user" };
    }
    const url = `https://mobilic-back-end.onrender.com/users/${userId}`;

    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token} ` },
      });
      dispatch(userActions.getUserById(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}
export default fetchUser;
