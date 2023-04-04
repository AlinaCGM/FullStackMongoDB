import { AppDispatch } from "../store";
import axios from "axios";

import { userActions } from "./../slice/user";
import { InitialValues } from "../../components/userInformation/UserUpdate";

export function userUpdate(id: string, values: InitialValues) {
  const token = localStorage.getItem("token");
  return async (dispatch: AppDispatch) => {
    axios
      .put(`https://mobilic-back-end.onrender.com/users/${id}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => dispatch(userActions.getUserById(res.data)))
      .catch((error) => dispatch(userActions.errorHandler(error)));
  };
}
